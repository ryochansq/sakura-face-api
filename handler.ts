import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { FaceClient } from '@azure/cognitiveservices-face';

const key = process.env.AZURE_API_KEY;
const endpoint = 'https://sakura-face-api.cognitiveservices.azure.com/';

const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new FaceClient(credentials, endpoint);

export const detect: APIGatewayProxyHandler = async (event) => {
  // const image = Buffer.from(event, 'base64');

  console.info('event', event);
  // console.info('image', image);
  // const res = await client.face.detectWithStream(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: event.isBase64Encoded,
    }, null, 2),
  };
}

export const findSimilar: APIGatewayProxyHandler = async (event) => {
  await new Promise((resolve)=>resolve('hoge'));
  return {
    statusCode: 200,
    body: event.body,
  };
}
