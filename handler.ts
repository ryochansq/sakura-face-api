import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { FaceClient } from "@azure/cognitiveservices-face";
import students from "./students";

interface IFindSimilarRequestBody {
  faceId: string;
}

interface IError {
  statusCode: number;
  body: {
    error: {
      code: string;
      message: string;
    };
  };
}

const key = process.env.AZURE_API_KEY;
const endpoint = "https://sakura-face-api.cognitiveservices.azure.com/";
const headers = { "Access-Control-Allow-Origin": "*" };

const credentials = new ApiKeyCredentials({
  inHeader: { "Ocp-Apim-Subscription-Key": key },
});
const client = new FaceClient(credentials, endpoint);

export const detect: APIGatewayProxyHandler = async (event) => {
  const image = Buffer.from(event.body, "base64");
  return client.face
    .detectWithStream(image, { recognitionModel: "recognition_04" })
    .then((res) => ({
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
    }))
    .catch((e) => {
      const error = e as IError;
      return {
        statusCode: error.statusCode,
        headers,
        body: JSON.stringify(error.body),
      };
    });
};

export const findSimilar: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body) as IFindSimilarRequestBody;
  return client.face
    .findSimilar(body.faceId, {
      faceListId: "sakura-gakuin",
      maxNumOfCandidatesReturned: 3,
      mode: "matchFace",
    })
    .then((res) => ({
      statusCode: 200,
      headers,
      body: JSON.stringify(
        res.map((face) => ({
          name: students[face.persistedFaceId] as string,
          confidence: face.confidence,
        }))
      ),
    }))
    .catch((e) => {
      const error = e as IError;
      return {
        statusCode: error.statusCode,
        headers,
        body: JSON.stringify(error.body),
      };
    });
};
