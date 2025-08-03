const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const addSubscriberToNotion = async ({ name, email, interests, source }) => {
  await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name || email,
            },
          },
        ],
      },
      Email: {
        email: email,
      },
      Interests: {
        multi_select: (interests || []).map((interest) => ({ name: interest })),
      },
      Source: {
        select: {
          name: source || 'website',
        },
      },
      Active: {
        checkbox: true,
      },
    },
  });
};

module.exports = { addSubscriberToNotion };
