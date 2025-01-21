import { Express } from "express";
import { Router } from "express";
import { z } from "zod";
import { contentModel, userModel } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddlewire } from "./middlwire";
const userRouter = Router();

userRouter.post("/signUp", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(4).max(20),
  });
  const parsed = requiredBody.safeParse(req.body);// you can add extra fields
  //we use safeParse() over parse() bcoz it returns a object which contains data , error but doesn't return error like parse() which crashes the server if there's incorrect input
  //parse() returns data or error  safeParse returns a object which has two keys { success: true; data: "tuna" } or { success: false; error: ZodError }
  if (!parsed.success) {
    res.status(411).json({
      message: "Error in inputs",
    });
    return;
  }

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    await userModel.create({
      username,
      password: hashedPassword,
    });
  } catch (error) {
    res.status(403).json({
      message: "user with this username already exists",
      error,
    });
    return;
  }
  res.status(200).json({
    message: "signed up",
  });
});

userRouter.post("/signIn", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(4).max(20),
  });
  const parsed = requiredBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(411).json({
      message: "Error in inputs",
    });
    return;
  }
  const { username, password } = req.body;
  const response = await userModel.findOne({
    username,
  });
  if (!response) {
    res.status(403).json({
      message: "username doesnot exist",
    });
  }

  const passwordMatch = await bcrypt.compare(password, `${response?.password}`);
  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: response?._id,
      },
      `${process.env.JWT_USER_SECRET}`
    );
    res.status(200).json({
      message: "you are signed in",
      token,
    });
  } else {
    res.status(403).json({
      message: "incorrect password",
    });
  }
});

userRouter.post("/content", authMiddlewire, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  console.log(userId);

  const { link, type, title } = req.body;
  try {
    await contentModel.create({
      link,
      type,
      title,
      tags: [],
      userId,
    });
    res.json({
      messsage: "content created",
    });
  } catch (e) {
    res.json({
      message: "content entry error",
      error: e,
    });
  }
});
userRouter.get("/content", authMiddlewire, async (req, res) => {
    try {
      //@ts-ignore
    const userId = req.userId;
    console.log(userId);
    const contents = await contentModel.find({
      userId,
    }).populate("userId", "username");//the ref given in the schema of the model allows this functionalty
    res.status(200).json({
      contents,
    });
  } catch (e) {
    res.status(404).json({
      message: "content preview error",
      error: e,
    });
  }
});
userRouter.delete("/content", authMiddlewire,async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId
        const {contentId} = req.body
        await contentModel.deleteMany({
            _id:contentId,
            userId
        })// doen't give error if the document is already deleted
        res.status(200).json({
            message: "successfully deleted"
        })
    } catch (error) {
        res.status(411).json({
            message: "content deletion error",
            error
        })
    }
});
userRouter.post("/brain/share", (req, res) => {});
userRouter.post("/brain/:shareLink", (req, res) => {});

export default userRouter;
