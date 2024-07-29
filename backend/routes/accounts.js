const { Router } = require("express");
const mongoose = require("mongoose");
const { Account } = require("../db");
const { authMiddleware } = require("../auth");
const accountRoute = Router();

accountRoute.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ msg: "Account not found" });
        }

        res.status(200).json({ balance: account.amount });
    } catch (err) {
        res.status(500).json({ msg: "Error retrieving balance", error: err.message });
    }
});

accountRoute.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    });

    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            amount: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            amount: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })
});
module.exports = {
    accountRoute
};
