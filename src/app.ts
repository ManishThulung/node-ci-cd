import express, { Request, Response, Application, NextFunction } from "express";
import ErrorHandler from "./utils/ErrorHandler";
import HouseRouter from "./routes/houseRoutes";

const app: Application = express();

const myLogger = function (req: Request, res: Response, next: any) {
  console.log("LOGGED");
  // res.send("I am middleware");
  next();
};
app.use(myLogger);

app.use("/api/house", HouseRouter);

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
