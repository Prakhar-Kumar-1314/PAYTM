const { Router } = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../auth");
const accountRoute = Router();

accountRoute.get("/balance", authMiddleware, async (req, res) => {

    const { balance } = await Account.findOne({
        userId: req.userId,
    })
    res.status(200).json({
        balance: balance
    })
})

accountRoute.post("/transfer", authMiddleware, async (req, res) => {

    const {to, amount} = req.body;

    const fromUser = await Account.findOne({
        userId: req.userId
    })

    const toUser = await Account.findOne({
        userId: to
    })

    if (!fromUser) {
        return res.status(400).json({
            msg: "User does not exist"
        })
    }

    if (!toUser) {
        return res.status(400).json({
            msg: "User does not exist"
        })
    }

    if (!(amount >= fromUser.balance)) {
        return res.status(400).json({
            msg: "Insufficient Balance"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: toUser
    }, {
        $inc: {
            balance: amount
        }
    })
    
    res.status(200).json({
        msg: "Transaction Successful"
    })

})

module.exports = {
    accountRoute,
}