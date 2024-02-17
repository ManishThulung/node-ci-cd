import express from "express";
import HouseRouter from "./routes/houseRoutes";
const app = express();
const myLogger = function (req, res, next) {
    console.log("LOGGED");
    // res.send("I am middleware");
    next();
};
app.use(myLogger);
//parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/api/house", HouseRouter);
// doesnt work here
// app.use(myLogger);
// without this middleware if any error occurs, the app crashes
// with this the app does not crash but throws error in json file
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal server error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    });
});
export default app;
