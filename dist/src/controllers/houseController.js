var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import House from "../models/houseModel";
import Room from "../models/roomModel";
import ErrorHandler from "../utils/ErrorHandler";
// create
export const createHouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const house = new House(req.body);
    console.log(req.body);
    if (!req.body.street) {
        return next(new ErrorHandler(404, "req.body is empty"));
    }
    try {
        const room1 = yield Room.create({ floor: 1, number: 101 });
        const room2 = yield Room.create({ floor: 2, number: 201 });
        const house = yield House.create({
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
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
export const getHouses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const house = yield House.find().populate("rooms");
        if (!house) {
            next(new ErrorHandler(404, "No data available"));
        }
        res.status(200).json({
            success: true,
            message: "data successfully coming",
            data: house,
        });
    }
    catch (error) {
        next(error);
    }
});
