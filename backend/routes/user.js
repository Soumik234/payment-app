const express = require("express");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const {User,Account}=require("../db")
const router = express.Router();
const jwt = require("jsonwebtoken");
const {authMiddleware}=require("../middleware")

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema=zod.object({
  username:zod.string(),
  password:zod.string()
})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
})
const userId = user._id;
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
  })
  const token = jwt.sign(
    {
      userId
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token
  });
});
router.post("/signin",(req,res)=>{
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.json({
      message: "Error while logging in",
    });
  }
  const token = jwt.sign(
    {
      userId: User._id,
    },
    JWT_SECRET
  );
  res.json({
    token: token
  });
});

router.put("/",authMiddleware,async(req,res)=>{
  const {success} =updateBody.safeParse(req.body)
  if(!success){
    res.status(411).json({
      message:"Error while updating information"
    })
  }
  await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
})
module.exports = router;
