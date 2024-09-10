const express = require ( " express");
const router = express.Router();
const signinrouter = require("./singnin");
const singuprouter = require("./signup");
const bulkrouter = require("./bulk");
const { authMiddleware} = require("../middlieware");

const zod = require ("zod");
const {User } = require("../db");
const jwt = require("jsonwebtoken");
const { secretekey }=require ("../config");
const singnin = require("./singnin");





router.use("/signup",singuprouter);
router.use("/signin",signinrouter);
router.use("/bulk",bulkrouter);

const signupBody = zod.object ({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req,res)=> {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            msg:"Email already taken "
        }) 
    }    
    const existingUser =await  User.findOne ({
        usename : req.body.username
    })
    if (existingUser) {
        return res.status(411).json ({
            msg:"email already taken"
        })
    }
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token,
    })
    
})

const signinBody  =zod.object({
    username: zod.string().email(),
    password : zod.string()
})

router.post("/signin", async (req,res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            msg:"Incorrect inputs"
        })
    }
    const user =await User.findOne({
        username : req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message : "Error while logging in "
    })

     

})

const uppdaterBody = zod.object({
    password : zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})
router.put("/update", authMiddleware , async (req,res) =>{
    const { succsess } = uppdaterBody.safeParse(req.body);
    if (!succsess) {
        return res.stsatus(411).json({
            message : " Error while updating information"
        })
    } 

    await User.updateOne({_id: req.userId}, req.body );

    res.json({
        message: "update successfully"
    })
} );
router.get("/bulk",authMiddleware, async (req,res)=> {
    const filter = req.query.filter || "";
    const user = await User.find({
        $or: [{
                firstname:{
                    "$regex":filter
                }
            }, {
                lastname:{
                    "$regex": filter
                }
            }
        ]
    })
    res.json({
        user: user.map(user=> ({
            username: user.username,
            firstname: user.firstname,
            lastname : user.lastname,
            _idL: user._id
        }))
    })
})
module.exports = router();