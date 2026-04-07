import express from "express";
import movieRouter from "./routes/movieRoutes.js";

const app = express();

//api routes
app.use("/movies", movieRouter);

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
