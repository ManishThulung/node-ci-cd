var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
export const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield mongoose.connect((_a = process.env.DB_URI) !== null && _a !== void 0 ? _a : "");
        console.log("connected to mongodb");
    }
    catch (error) {
        throw error;
    }
});
