"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const myLogger = function (req, res, next) {
    console.log("LOGGED");
    // res.send("I am middleware");
    next();
};
app.use(myLogger);
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.get("/my-name", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hi = true;
        if (hi) {
            return next(new ErrorHandler_1.default("My error message here", 404));
        }
        res.send("Welcome to Express & TypeScript Server");
    }
    catch (error) {
        next(error);
    }
}));
app.get("/:id", (req, res) => {
    const id = req.params.id;
    // Now 'id' contains the value of the 'id' parameter from the URL
    res.send(`Received ID: ${id}`);
});
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
