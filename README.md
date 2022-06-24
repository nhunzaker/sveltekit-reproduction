# Header Forwarding Problem

This project demonstrates a weird behavior where initial request headers are forwarded through to external fetch calls when using the svelte-kit node adapter.

You can see this by logging request headers in the `externalFetch` hook.

## Steps to reproduce this issue:

First, run this server locally with `yarn run dev`.

Then cURL the request with the Accept header:

```
curl --header "Accept: text/html" http://localhost:3000
```

In the development console, you'll see that the Request object for the API URL also includes this header (and any other header that you provide):

```
External Fetch:
https://www.gov.uk/bank-holidays.json
Accept Header: text/htm

External Fetch:
https://www.gov.uk/bank-holidays.json
Accept Header: image/png
```

This header matches whatever is sent to the request for HTML when connecting to `http://localhost:3000`, even though this is a request for JSON data.

## Why does this matter?

This is unexpected and causes problems for our API interactions. We've hit this in two places:

- A client passes through `Accept: image/png` to our API endpoint, which results in our API responding with a 406 Not Acceptable error. This is fine :shrug:, but pretty weird.
- **More frustrating:** a client passes through a `If-Modified-Since` header, our API returns a `304 Not Modified` response, which raises an error when generating a server response. 

We'd expect these headers to not get automatically passed through. Those headers are for the SvelteKit request, not our API.
