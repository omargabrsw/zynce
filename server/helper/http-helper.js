/**
 * Sends a 500 Internal Server Error JSON response.
 * @param {import('http').ServerResponse} response
 * @param {Error} [err]
 */

export function sendServerError(response, err) {
  if (err) console.error(err);
  response.statusCode = 500;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "Something went wrong" }));
}

/**
 * Sets standard CORS headers on the response.
 * @param {import('http').ServerResponse} response
 */

export function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  );
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
