import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import ErrorHandler from "./utils/ErrorHandler";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const myLogger = function (req: Request, res: Response, next: any) {
  console.log("LOGGED");
  // res.send("I am middleware");
  next();
};
app.use(myLogger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
    data: "this is data",
  });
});

app.get("/my-name", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hi: boolean = true;
    if (hi) {
      return next(new ErrorHandler("My error message here", 404));
    }
    res.send("Welcome to Express & TypeScript Server");
  } catch (error) {
    next(error);
  }
});

app.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // Now 'id' contains the value of the 'id' parameter from the URL
  res.send(`Received ID: ${id}`);
});

// doesnt work here
// app.use(myLogger);

// without this middleware if any error occurs, the app crashes
// with this the app does not crash but throws error in json file
app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal server error";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    });
  }
);

export default app;
