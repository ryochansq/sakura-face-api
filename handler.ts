import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const detect: APIGatewayProxyHandler = async (event, _context) => {
  await new Promise((resolve)=>resolve('hoge'));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'detect',
      event,
      _context,
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
