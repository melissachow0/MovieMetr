import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import authetication from "./routes/authenticationRoutes";
import queryRoutes from "./routes/apiQueryRoutes";
import movieRoutes from "./routes/movieRoutes";
import listRoutes from "./routes/listRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import personRoutes from "./routes/personRoutes";
import TVshowRoutes from "./routes/TVshowRoutes";
dotenv.config();

//start express
const app = express();
const port = process.env.PORT || 3001;

//database connection
const mongoose = require("mongoose");
//connect to the database later

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});
app.use("/authentication", authetication);
app.use("/apiQueryRoutes", queryRoutes);
app.use("/movieRoutes", movieRoutes);
app.use("/listRoutes", listRoutes);
app.use("/reviews", reviewRoutes);
app.use("/person", personRoutes);
app.use("/TVshow", TVshowRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
