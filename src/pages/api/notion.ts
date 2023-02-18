// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from '@notionhq/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const notionSecret = process.env.NOTION_SECRET
const notionDatabaseID = process.env.NOTION_DB

const notion = new Client({auth: notionSecret})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(!notionSecret || !notionDatabaseID) throw new Error("Missing notion secret or DB-ID")

  const query = await notion.databases.query({
    database_id: notionDatabaseID,
    filter: {
      property: "Status",
      status: {
        equals: "Done",
      },
    },
  })
  res.status(200).json( JSON.stringify(query))
}
