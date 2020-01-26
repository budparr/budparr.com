import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
let securityHeaders = {
    "Content-Security-Policy": "upgrade-insecure-requests",
    "Strict-Transport-Security": "max-age=2592000",
    "X-Xss-Protection": "1; mode=block",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Feature-Policy": "camera 'none'; geolocation 'none'; microphone 'none'"
};

let sanitiseHeaders = {
    Server: "My New Server Header!!!"
};

let removeHeaders = ["Public-Key-Pins", "X-Powered-By", "X-AspNet-Version"];
// let cacheHeaders = {
//     "Cache-Control": "public, max-age=1, must-revalidate",
// };
let cacheControl = {
    //Cloudflare Cache Settings
    browserTTL: null, // do not set cache control ttl on responses
    edgeTTL: 2 * 60 * 60 * 24, // 2 days
    bypassCache: false // do not bypass Cloudflare's cache
};
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
        event.respondWith(handleEvent(event).then(SetHeaders));
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

    // let cache  = {
    //     etag: '0928409987487333'
    // }

    options.cacheControl = cacheControl;
    try {
        if (DEBUG) {
            // customize caching
            options.cacheControl = {
                bypassCache: true
            };
        }
        return await getAssetFromKV(event, options);
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

const SetHeaders = function(response) {
        response = new Response(response.body, response);

        let newHdrs = new Headers(response.headers);

        //let cache = caches.default;
        var ETag = response.headers.get('ETag');

        if (
            newHdrs.has("Content-Type") &&
            !newHdrs.get("Content-Type").includes("text/html")
        ) {
            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHdrs
            });
        }

        let setHeaders = Object.assign(
            {},
            securityHeaders,
            sanitiseHeaders,
            ETag
            // ,
            // cacheHeaders
        );

        Object.keys(setHeaders).forEach(name => {
            // https://scotthelme.co.uk/security-headers-cloudflare-worker/
            // use append instead of set to respect previously set headers
            newHdrs.append(name, setHeaders[name]);
        });

        removeHeaders.forEach(name => {
            newHdrs.delete(name);
        });

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHdrs
        });
    };
