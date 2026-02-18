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
