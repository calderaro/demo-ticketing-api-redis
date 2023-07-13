import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "redis";

async function main() {
  const client = createClient({ url: process.env.REDIS_URL });
  const app = express();

  await client.connect();

  app
    .use(cors())
    .use(express.json())
    .post("/set", async (req, res) => {
      try {
        const start = Date.now();

        await client.hSet("user-session:123", {
          name: "John",
          surname: "Smith",
          company: "Redis",
          age: 29,
        });

        res.status(200).json({ took: Date.now() - start });
      } catch (error) {
        res.send("Error:" + (error as Error).message);
      }
    })
    .get("/get", async (req, res) => {
      try {
        const start = Date.now();

        let userSession = await client.hGetAll("user-session:123");

        res.status(200).json({ took: Date.now() - start, value: userSession });
      } catch (error) {
        res.send("Error:" + (error as Error).message);
      }
    });

  app.listen(8080);
}

main();
