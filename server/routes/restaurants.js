import express from "express";
import {
  getRestaurants,
  getRestaurant,
  postRestaurant,
  postReview,
  putRestaurant,
  deleteRestaurant,
} from "../controllers/restaurants.js";

const router = express.Router();

router.get("/", getRestaurants);

router.get("/:id", getRestaurant);

router.post("/", postRestaurant);

router.post("/:id/addReview", postReview);

router.put("/:id", putRestaurant);

router.delete("/:id", deleteRestaurant);

export default router;
