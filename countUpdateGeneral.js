const { Client, APIErrorCode } = require("@notionhq/client")


async function update(area, num) {

console.log(area, " result", num);
  const notion = new Client({
    auth: 'secret_3NgSmF38Njrw0nBYJSg49p2CvXCkjT00aEal1Ikzr3j',
  });

let idDb = '8b654d77db954a8f8c1f012b9463af8b';

const MyFilterResult = await notion.databases.query({
  database_id: idDb,
  filter: {
    "and": [
        {
          property: "Area",
          text: {
          equals: area,
          },
        },
    ]
  } 
});
console.log("MyFilterResult ", MyFilterResult.results.length);
if(MyFilterResult.results.length != 0){

  try {
    const updatePage = await notion.pages.update({
      page_id: MyFilterResult.results[0].id,
      properties: {
        Count: {
          number: num,
        },
      },
    });
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {

    } else {
      console.error(error)
    }
  }
}else{

  const createPage = await notion.pages.create({
    parent: {
      database_id: idDb
    },
    properties: {
      Area: {
        title: [
          {
            text: {
              content: area,
            },
          },
        ],
      },
      Count: {
        number: num,
      },
    }
  });

}  
 
}

module.exports = { update };