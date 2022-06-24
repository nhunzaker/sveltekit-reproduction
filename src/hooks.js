export function externalFetch(request) {
  console.log("External Fetch:")
  console.log(request.url)

  // Here's my question - why is this value the same as 
  // the HTTP request for my route?
  console.log("Accept Header:", request.headers.get("accept"));
  console.log("\n")

  return fetch(request)
}