const { Client } = require("@notionhq/client");
const { defaultFilter, _3D, content, design, assembly } = require("./filters.js");
const { update } = require("./countUpdateGeneral.js");
const { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } = require('aws-lambda');
require('lodash');

async function countGeneral(filters) {

  const notion = new Client({
    auth: "secret_3NgSmF38Njrw0nBYJSg49p2CvXCkjT00aEal1Ikzr3j",
  });

  const response = await notion.databases.query({
    database_id: "9621ec2b8bb4414fb4b0ac3ba8f7f16a",
    filter: {
      and: [
        ...filters,
        ...defaultFilter
      ],
    },
  });

  return Object.keys(response.results).length;
}

exports.handler = async function(event, context) {

  context.callbackWaitsForEmptyEventLoop = false;

  try {
    
    const result = await Promise.all([
      countGeneral(_3D),
      countGeneral(content),
      countGeneral(design),
      countGeneral(assembly),
    ]);

    await update("3D", result[0]);
    await update("Content", result[1]);
    await update("Design", result[2]);
    await update("Assembly", result[3]);
    await update("General", result.reduce((a, b) => a + b), 0);

    const response = {
      statusCode: 200,
      body: JSON.stringify("Process sucessfully in Lambda!"),
    };

    return response;

  }
  catch (e) {
    console.error(e);
    const response = {
      statusCode: 400,
      body: JSON.stringify('Process fail in Lambda!'),
    };

    return response;
  }
}
