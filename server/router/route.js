import express from "express";
import * as controller from "../controller/controller.js";
import Auth from "../middleware/auth.js";
import multer from "multer";

const { Router } = express;

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/getUsers", controller.getUsers);
router.get("/getAdmin", Auth, controller.getAdmin);
router.post("/createPlan", upload.single("icon"), Auth, controller.createPlan);
router.get("/getPlan", Auth, controller.getPlan);
router.delete("/deletePlan/:id", Auth, controller.deletePlan);
router.post("/submitDetails/:userId", Auth, controller.submitDetails);
router.get("/getUser/:userId", controller.getUser);

export default router;
