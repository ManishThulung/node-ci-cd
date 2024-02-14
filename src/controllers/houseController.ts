import { NextFunction, Request, Response } from "express";
import House from "../models/houseModel";
import Room from "../models/roomModel";
import ErrorHandler from "../utils/ErrorHandler";

// create
export const createHouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const house = new House(req.body);

  // if (!house) {
  //   return next(new ErrorHandler(404, "Cannot create a house"));
  // }

  try {
    const room1 = await Room.create({ floor: 1, number: 101 });
    const room2 = await Room.create({ floor: 2, number: 201 });

    const house = await House.create({
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
  } catch (error) {
    next(error);
  }
};

export const getHouses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const house = await House.find().populate("rooms");
    if (!house) {
      next(new ErrorHandler(404, "No data available"));
    }
    res
      .status(200)
      .json({ success: true, message: "data successful", data: house });
  } catch (error) {
    next(error);
  }
};
