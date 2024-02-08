"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.get("/:id", (req, res) => {
    const id = req.params.id;
    // Now 'id' contains the value of the 'id' parameter from the URL
    res.send(`Received ID: ${id}`);
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
