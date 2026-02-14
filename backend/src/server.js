import express from "express";
import { ENV } from "./config/env.js";

const app = express();

app.listen(5001, () =>
  console.log("Server is up and running on port:", ENV.PORT),
);
