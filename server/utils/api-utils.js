/**
 * Reads and parses the JSON body from a Node.js HTTP request.
 *
 * @param {import('http')} request - The incoming HTTP request object.
 * @returns {Promise<any>} A promise that resolves with the parsed JSON object from the request body.
 * @throws Will reject if the request emits an error or if the body is not valid JSON.
 */

export async function proccessBody(request) {
  try {
    const task = await new Promise((resolve, reject) => {
      let data = "";

      request.on("data", (chunk) => {
        data += chunk.toString();
      });

      request.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });

      request.on("error", (err) => reject(err));
    });
    return task;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Executes a SQL query on the given connection.
 *
 * @param {import('mysql').Pool | import('mysql').Connection} connection - The MySQL connection or pool to use.
 * @param {string} query - The SQL query string, may include placeholders (`?`) for parameters.
 * @param {Array<any>} [params] - Optional array of values to replace placeholders in the query.
 * @returns {Promise<any>} Resolves with the query results, or rejects if an error occurs.
 *
 */

export async function queryDatabase(connection, query, params) {
  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(
        params && params.length ? query : query,
        params && params.length ? params : null,
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        },
      );
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Sends a 500 Internal Server Error JSON response.
 *
 * @param {import('http').ServerResponse} response - The HTTP response object.
 * @param {Error} [err] - Optional error to log.
 */

export function sendServerError(response, error) {
  console.error(error);
  response.statusCode = 500;
  response.end(
    JSON.stringify({
      message: "Something went wrong",
    }),
  );
}
