/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
import { getImage } from "./generator";

module.exports.generate = async (event) => {
  const buffer = await getImage(
    event?.pathParameters?.mintId,
    event?.queryStringParameters?.uri,
    event?.queryStringParameters?.text,
    event?.queryStringParameters?.cluster
  );

  console.log("Returning image buffer", buffer);
  const response = {
    statusCode: 200,
    headers: {
      "content-type": "image/png",
      "content-disposition": `inline;filename="${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        (event.pathParameters && event.pathParameters.mintId) || "untitled"
      }.png"`,
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true,
  };
  return response;
};
