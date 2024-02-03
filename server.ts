import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // Now 'id' contains the value of the 'id' parameter from the URL
  res.send(`Received ID: ${id}`);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
