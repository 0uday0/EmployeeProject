import neo4j from 'neo4j-driver'
import * as dotenv from "dotenv"
import {Driver} from 'neo4j-driver'
dotenv.config()

export let driver:Driver
if (typeof process.env.NEO_URI != 'undefined' && typeof process.env.NEO_USERNAME != "undefined" && typeof process.env.NEO_PASSWORD!="undefined") {
     driver = neo4j.driver(
        process.env.NEO_URI,
        neo4j.auth.basic(process.env.NEO_USERNAME,process.env.NEO_PASSWORD)
    )
    console.log("neo 4j started")
} else {
    throw new Error("Bad credentials")
}


 