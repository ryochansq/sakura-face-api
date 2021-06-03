import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { FaceClient } from '@azure/cognitiveservices-face';

interface IError {
  statusCode: number;
  body: {
    error: {
      code: string;
      message: string;
    }
  }
}

const key = process.env.AZURE_API_KEY;
const endpoint = 'https://sakura-face-api.cognitiveservices.azure.com/';

const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new FaceClient(credentials, endpoint);

export const detect: APIGatewayProxyHandler = async (event) => {
  const image = Buffer.from(event.body, 'base64');
  try {
    const res = await client.face.detectWithStream(image);
    return {
      statusCode: 200,
      body: JSON.stringify({
        res,
      }, null, 2),
    };
  } catch (e) {
    const error = e as IError
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error.body, null, 2),
    };
  }
}

export const findSimilar: APIGatewayProxyHandler = async (event) => {
  await new Promise((resolve)=>resolve('hoge'));
  return {
    statusCode: 200,
    body: event.body,
  };
}
