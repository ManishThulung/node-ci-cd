"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const houseRoutes_1 = __importDefault(require("./routes/houseRoutes"));
const app = (0, express_1.default)();
const myLogger = function (req, res, next) {
    console.log("LOGGED");
    // res.send("I am middleware");
    next();
};
app.use(myLogger);
//parse requests of content-type - application/json
app.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/house", houseRoutes_1.default);
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
exports.default = app;
