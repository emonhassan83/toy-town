import express from "express";
import { UserControllers } from "./user.controller.js";
import zodValidationRequest from "../../middleware/validateRequest.js";
import { UserValidation } from "./user.validation.js";

const router = express.Router();

router.post(
  "/register",
  zodValidationRequest(UserValidation.userRegistrationValidationSchema),
  UserControllers.registerUser
);

router.put("/:email", UserControllers.upsertUser);
router.get("/:email", UserControllers.getUserByEmail);
router.get("/", UserControllers.getAllUsers);

router.patch("/user/:id", UserControllers.makeUser);
router.patch("/seller/:id", UserControllers.makeSeller);
router.patch("/admin/:id", UserControllers.makeAdmin);
router.delete("/user/:id", UserControllers.deleteUser);

export const UserRoutes = router;
