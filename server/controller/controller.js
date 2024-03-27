import adminModel from "../model/adminModel.js";
import userModel from "../model/userModel.js";
import adminSubscription from "../model/adminSubscription.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { uploadFileToS3 } from "../utils/s3multer.js";

dotenv.config();

export async function register(req, res) {
  try {
    const specialchar = /[!@#$%^&*(),.?":{}|<>]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Please enter email" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "Please enter a valid email" });
    } else if (!firstName) {
      return res.status(400).send({ error: "Please enter first name" });
    } else if (!lastName) {
      return res.status(400).send({ error: "Please enter last name" });
    }
    const existEmail = await adminModel.findOne({ email });
    if (existEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      if (!specialchar.test(password)) {
        return res.status(400).send({
          error: "Password should contain atleaset one special charector",
        });
      } else if (password.length < 6) {
        return res
          .status(400)
          .send({ error: "Password should be atleast 6 charectors" });
      }
      if (password === confirmPassword) {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new adminModel({
          email,
          password: hashPassword,
          firstName,
          lastName,
        });

        await user.save();

        return res
          .status(201)
          .send({ error: false, msg: "User registered successfully" });
      } else {
        return res
          .status(400)
          .send({ error: "Password and confirm password are not same" });
      }
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: "email should not be empty" });
    }
    if (!password) {
      return res.status(400).send({ error: "password should not be empty" });
    }
    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ error: "Password does not match" });
    }

    // JWT token
    const token = Jwt.sign(
      {
        userid: user._id,
        email: user.email,
      },
      process.env.JWTS,
      { expiresIn: "30d" }
    );

    return res.status(200).send({
      msg: "Logged in successfully...",
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function getUser(req, res) {
  try {
    const userId = req.params.userId;
    console.log(userId)
    
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }

}

export async function getUsers(req, res) {
  try {
    const users = await userModel.find({
      firstName: { $ne: null },
      lastName: { $ne: null },
    });
    const pending = await userModel.find({ firstName: null, lastName: null });

    res.status(200).json({
      error: false,
      message: "User details retrieved successfully",
      users,
      pending,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}
export async function getAdmin(req, res) {
  try {
    const userId = req.user.userid;

    const user = await adminModel.findById(userId);

    const response = {
      userId: user._id,
      ...user._doc,
    };
    if (user) {
      res.status(200).json({
        error: false,
        message: "User details retrieved successfully",
        data: response,
      });
    } else {
      res.status(404).json({
        error: true,
        message: "User not found",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}
export async function createPlan(req, res) {
  try {
    const userId = req.user.userid;

    const { Type, NoOfBoost, Price, Period, Features } = req.body;

    if (Type === "Normal") {
      if (!NoOfBoost || !Price || !Period) {
        return res.status(400).send({ error: "Invalid request parameters" });
      }

      const existPlan = await adminSubscription.findOne({
        NoOfBoost,
        Price,
        Period,
      });

      if (existPlan) {
        return res.status(400).send({ error: "Plan already exists" });
      }

      const plan = new adminSubscription({
        userId,
        Type,
        NoOfBoost,
        Price,
        Period,
      });

      await plan.save();
      return res
        .status(201)
        .send({ error: false, msg: "Plan created successfully" });
    } else if (Type === "Premium") {
      if (!Features || !Price || !Period) {
        return res.status(400).send({ error: "Invalid request parameters" });
      }

      let uploadedImageUrl = null;

      if (req.file) {
        try {
          uploadedImageUrl = await uploadFileToS3(
            req.file,
            "uploads",
            `${Date.now()}_${req.file.originalname}`
          );
          console.log("Uploaded image URL:", uploadedImageUrl);
          Features[0].icon = uploadedImageUrl;
        } catch (upladError) {
          console.error("Error uploading image:", uploadError);
          return res.status(500).send({ error: "Error uploading image" });
        }
      }

      const plan = new adminSubscription({
        userId,
        Features,
        Price,
        Period,
        Type,
      });

      await plan.save();
      return res
        .status(201)
        .send({ error: false, msg: "Plan created successfully" });
    } else {
      return res.status(400).send({ error: "Invalid plan type" });
    }
  } catch (error) {
    console.error("Error creating plan:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function getPlan(req, res) {
  try {
    const userId = req.user.userid;
    if (userId) {
      const Normal = await adminSubscription.find({ Type: "Normal" });
      const Premium = await adminSubscription.find({ Type: "Premium" });
      res.status(200).json({
        error: false,
        message: "Plans retrieved successfully",
        Normal,
        Premium,
      });
    }
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}

export async function deletePlan(req, res) {
  try {
    const userId = req.user.userid;

    if (userId) {
      const id = req.params.id;
      await adminSubscription.findByIdAndDelete(id);

      res.status(200).json({
        error: false,
        message: "Plan deleted successfully",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
}
export async function submitDetails(req, res) {
  try {
    const userId = req.params.userId;
    const existingUser = await userModel.findOne({ _id: userId });

    if (!existingUser) {
      console.log("user not found");
      res
        .status(404)
        .json({ message: "User not found", data: null, error: true });
    } else {
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true }
      );

      res.status(200).json({
        message: "Record updated",
        data: updatedUser,
        error: false,
      });
      console.log(existingUser.blocked, existingUser._id);
    }
  } catch (error) {
    console.error("Error during user update:", error);
    res
      .status(500)
      .send({ message: `Internal Server Error ${error}`, error: true });
  }
}
