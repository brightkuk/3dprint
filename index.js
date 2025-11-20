import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Router from "./views/router.js"; // <-- ADD THIS LINE
import cors from "cors"; // <-- Added line

const port = 3001;
const app = express();

app.use(cors()); // <-- Added line
app.use(express.json());
app.use(Router); // <-- ADD THIS LINE

async function startServer() {
  try {
    app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`));
  } catch (err) {
    console.log("🤖 Oh no something went wrong", err);
  }
}

startServer();