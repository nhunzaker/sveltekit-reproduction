# Header Forwarding Problem

This project demonstrates a weird behavior where initial request headers are forwarded through to external fetch calls.

You can see this by logging requets headers in the `externalFetch` hook.

## Steps to reproduce this issue:

First, run this server locally with `yarn run dev`.

Then cURL the request with the Accept header:

```
curl --header "Accept: text/html" http://localhost:3000
```

In the development console, you'll see that the Request object for the API URL also includes this header (and any other header that you provide).

## Why does this matter?

This is unexpected and causes problems for our API interactions. We've hit this in two places:

- A client passes through `Accept: image/png` to our API endpoint, which results in a 406 Not Acceptable error. This is fine, but pretty weird.
- A client passes through a `If-Modified-Since` header, our API returns a `304 Not Modified` response, which raises an error when generating a server response. 

We'd expect these headers to not get automatically passed through. Those headers are for the SvelteKit request, not our API.