// import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
import { getAssetFromKV } from "./kv-asset-handler";
import { appendHeaders } from "./security-headers";

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener("fetch", event => {
    try {
        event.respondWith(handleEvent(event).then(appendHeaders));
    } catch (e) {
        if (DEBUG) {
            return event.respondWith(
                new Response(e.message || e.toString(), {
                    status: 500
                })
            );
        }
        event.respondWith(new Response("Internal Error", { status: 500 }));
    }
});

async function handleEvent(event) {
    const url = new URL(event.request.url);
    let options = {};

    /**
     * You can add custom logic to how we fetch your assets
     * by configuring the function `mapRequestToAsset`
     */
    // options.mapRequestToAsset = handlePrefix(/^\/docs/)
    // Change the cacheControl based on Asset Type
    try {
        if (DEBUG) {
            // customize caching
            options.cacheControl = {
                bypassCache: true
            };
        }
        // HTML NO BROWSER TTL
        if (
            url.pathname.endsWith("page-data.json") ||
            url.pathname.endsWith("app-data.json") ||
            url.pathname.endsWith(".html") ||
            !url.pathname.includes(".")
        ) {
            options.cacheControl = {
                edgeTTL: 8640000,
                browserTTL: 0,
                mustRevalidate: true,
                public: true
            };
        } else {
            options.cacheControl = {
                edgeTTL: 8640000,
                browserTTL: 8640000,
                public: true
            };
        }
        const extension = url.pathname.split(".").pop();
        let immutableFiles = ["js", "css", "webp", "png", "jpg", "gif"];
        if (immutableFiles.includes(extension)) {
            options.cacheControl = {
                edgeTTL: 31536000,
                browserTTL: 31536000,
                public: true,
                immutable: true
            };
        }
        let response = await getAssetFromKV(event, options);
        return response;
    } catch (e) {
        // if an error is thrown try to serve the asset at 404.html
        if (!DEBUG) {
            try {
                let notFoundResponse = await getAssetFromKV(event, {
                    mapRequestToAsset: req =>
                        new Request(`${new URL(req.url).origin}/404.html`, req)
                });

                return new Response(notFoundResponse.body, {
                    ...notFoundResponse,
                    status: 404
                });
            } catch (e) {}
        }

        return new Response(e.message || e.toString(), { status: 500 });
    }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
    return request => {
        // compute the default (e.g. / -> index.html)
        let defaultAssetKey = mapRequestToAsset(request);
        let url = new URL(defaultAssetKey.url);

        // strip the prefix from the path for lookup
        url.pathname = url.pathname.replace(prefix, "/");

        // inherit all other props from the default request
        return new Request(url.toString(), defaultAssetKey);
    };
}
