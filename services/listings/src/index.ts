type AnyDict = { [key: string]: any }
import Application from "koa"
import cors from "@koa/cors"
import dotenv from "dotenv"
import { transformUnits } from "./lib/unit_transformations"
import { amiCharts } from "./lib/ami_charts"

dotenv.config({ path: ".env" })

const config = {
  port: parseInt(process.env.PORT || "3001", 10)
}

import archer from "../listings/archer.json"
import gish from "../listings/gish.json"
import triton from "../listings/triton.json"

const listings = [triton as AnyDict, gish as AnyDict, archer as AnyDict]

// Transform all the listings
listings.forEach(listing => {
  listing.unitsSummarized = transformUnits(listing.units, amiCharts)
})

const data = {
  status: "ok",
  listings: listings,
  amiCharts: amiCharts
}

const app = new Application()

// TODO: app.use(logger(winston));
app.use(cors())

app.use(ctx => {
  ctx.body = data
})

export default app.listen(config.port)
console.log(`Server running on port ${config.port}`)
