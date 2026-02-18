/**
 * Reads and parses the JSON body from a Node.js HTTP request.
 *
 * @param {import('http')} request - The incoming HTTP request object.
 * @returns {Promise<any>} A promise that resolves with the parsed JSON object from the request body.
 * @throws Will reject if the request emits an error or if the body is not valid JSON.
 */

export function proccessBody(request) {
  return new Promise((resolve, reject) => {
    let data = "";

    request.on("data", (chunk) => {
      data += chunk.toString();
    });

    request.on("end", () => {
      try {
        if (data === "") return resolve({});
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });

    request.on("error", (err) => reject(err));
  });
}
