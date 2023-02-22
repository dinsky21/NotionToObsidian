const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const dotenv = require("dotenv");
// or
// import {NotionToMarkdown} from "notion-to-md";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

// passing notion client to the option

// (async () => {
//   const pageId = "b75e46f1-7c33-4e04-93b2-3d8831ad3a8c";
//   const response = await notion.pages.retrieve({ page_id: pageId });
//   console.log(response);
// })();

const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
  const mdblocks = await n2m.pageToMarkdown(
    "0975e913-6121-43c0-8fc6-e58ffbd0bb29"
  );
  const mdString = n2m.toMarkdownString(mdblocks);

  //writing to file
  fs.writeFile("test.md", mdString, (err) => {
    console.log(err);
  });
})();
