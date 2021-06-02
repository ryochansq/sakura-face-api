import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `test_secret: ${process.env.TEST_SECRET}`,
      input: event,
    }, null, 2),
  };
}
