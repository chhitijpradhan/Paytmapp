const express =require("express");
const router =express.Router();
const balacnerouter = require("./balance");
const { authMiddleware } = require("../middlieware");
const {Account }=require("../db");

router.get("/balance",authMiddleware, async (req,res) =>{
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware ,async (req,res )=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount,to } = req.body;

    const account = await Account.findOne({userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
        message : "insufficient balance"});
    }

    const toAccount = await AccountfindOne({userId: to} ).session(session);

    if( !toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne ({ userId: req.userId }, { $inc:{ balance: - amount}}).session(session);
    await Acoount.updateOne({ userId : to }, { $inc: {balance: amount }}).session(session);

    await session.commitTransaction();
    req.json({
        message : 'Transfer succsessful'
    });
})
module.exports =router;