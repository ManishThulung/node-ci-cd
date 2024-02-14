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
exports.getHouses = exports.createHouse = void 0;
const houseModel_1 = __importDefault(require("../models/houseModel"));
const roomModel_1 = __importDefault(require("../models/roomModel"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
// create
const createHouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const house = new House(req.body);
    // if (!house) {
    //   return next(new ErrorHandler(404, "Cannot create a house"));
    // }
    try {
        const room1 = yield roomModel_1.default.create({ floor: 1, number: 101 });
        const room2 = yield roomModel_1.default.create({ floor: 2, number: 201 });
        const house = yield houseModel_1.default.create({
            street: "100 Maple Street",
            city: "Fort Townville",
            state: "New West Virgota",
            zip: "77777",
            garden: { name: "Alex Merced" },
            rooms: [room1, room2],
        });
        res
            .status(200)
            .json({ success: true, message: "create successful", data: house });
    }
    catch (error) {
        next(error);
    }
});
exports.createHouse = createHouse;
const getHouses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const house = yield houseModel_1.default.find().populate("rooms");
        if (!house) {
            next(new errorHandler_1.default(404, "No data available"));
        }
        res
            .status(200)
            .json({ success: true, message: "data successful", data: house });
    }
    catch (error) {
        next(error);
    }
});
exports.getHouses = getHouses;
