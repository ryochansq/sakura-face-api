import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { FaceClient } from '@azure/cognitiveservices-face';

const key = process.env.AZURE_API_KEY;
const endpoint = 'https://sakura-face-api.cognitiveservices.azure.com/';

const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new FaceClient(credentials, endpoint);

export const detect: APIGatewayProxyHandler = async (event, _context) => {
  await new Promise((resolve)=>resolve([event, _context]));
  const image = Buffer.from(event.body,'base64');
  const res = await client.face.detectWithStream(image);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'detect',
      res,
    }, null, 2),
  };
}

export const findSimilar: APIGatewayProxyHandler = async (event, _context) => {
  await new Promise((resolve)=>resolve('hoge'));
  return {
    statusCode: 200,
    body: event.body,
  };
}
