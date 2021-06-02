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
  const res = await client.face.detectWithStream(event.body)
  .catch((err)=> ({
    statusCode: 500,
    body: JSON.stringify({
      message: 'detect',
      err,
    }, null, 2),

  }));
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
    body: JSON.stringify({
      message: 'find similar',
      event,
      _context,
    }, null, 2),
  };
}
