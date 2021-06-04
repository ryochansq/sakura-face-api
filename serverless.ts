import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "sakura-face-api",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    apigwBinary: {
      types: ["application/octet-stream"],
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-apigw-binary"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "ap-northeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      AZURE_API_KEY: process.env.AZURE_API_KEY,
    },
  },
  functions: {
    detect: {
      handler: "handler.detect",
      events: [
        {
          http: {
            method: "post",
            path: "detect",
            cors: {
              origins: "*",
            },
          },
        },
      ],
    },
    findSimilar: {
      handler: "handler.findSimilar",
      events: [
        {
          http: {
            method: "post",
            path: "findSimilar",
            cors: {
              origins: "*",
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
