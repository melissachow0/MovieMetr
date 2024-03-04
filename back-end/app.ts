import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import authetication from "./routes/authenticationRoutes";
import movieRoutes from "./routes/apiQueryRoutes"
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the router
//app.use("/", routes);
app.use("/authentication", authetication);
app.use("/movieRoutes", movieRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});