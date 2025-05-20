const express = require('express');
const { authMiddleware } = require("../middleware");
const {Account }=require('../db')
const {default: mongoose } = require("mongoose");

const router  = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        useId:req.useId
    });
    res.json({
        balance: account.balance
    })
}) ;

router.post("/transfer", authMiddleware, async(req, res) =>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    
    const account = await Account.findOne({ useId: req.useId}).session(session);

    if (!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });

    }
    const toAccount = await Account.findOne({useId : to }).session(session);

    if (!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        });

    }
    await Account.updateOne({ useId : req.useId }, {$inc: {balance:-amount}}).session(session);
    await Account.updateOne({ userId : to} ,{ $inc : {balance :amount}} ).session(session);

    await session.commitTransaction();
    res.json({
        message: " Transaction successfull"

    })

})
module.exports = router;
