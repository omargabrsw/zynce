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
