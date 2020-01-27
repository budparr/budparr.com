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

const SetHeaders = function(response) {
    response = new Response(response.body, response);

    let newHdrs = new Headers(response.headers);

    //let cache = caches.default; NOPE
    // var ETag = response.headers.get('ETag');

    // IF not HTML, response is just existing headers.
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

    // Set new headers
    let setHeaders = Object.assign(
        {},
        securityHeaders,
        sanitiseHeaders

        // ,
        // cacheHeaders
    );

    Object.keys(setHeaders).forEach(name => {
        // https://scotthelme.co.uk/security-headers-cloudflare-worker/
        // use append instead of set to respect previously set headers
        newHdrs.append(name, setHeaders[name]);
    });

    // Remove headers that can cause vulnerabilities
    removeHeaders.forEach(name => {
        newHdrs.delete(name);
    });

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHdrs
    });
};

export {SetHeaders}