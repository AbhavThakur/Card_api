const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { Card } = require('../models/card');

router.get('/', async (req, res) => {
    const cardList = await Card.find();

    if (!cardList)
        res.status(500).json({ success: false })

    res.status(200).send(cardList);
})

router.get('/:cardNumber', async (req, res) => {
    const cardList = await Card.find({ cardNumber: req.params.cardNumber });

    if (!cardList) {
        console.log(cardList)
        res.send("Card with given number not found")
    }
    console.log("card", cardList)

    res.status(200).send(cardList);
})

router.post("/", async (req, res) => {
    let card = new Card({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        cardNumber: req.body.cardNumber,
        image: req.body.image,
        expiryDate: req.body.expiryDate,
        dateCreated: req.body.dateCreated,
        subscribed: req.body.subscribed,
        amount: req.body.amount,
        subscription: req.body.subscription
    })

    card = await card.save();

    if (!card) {
        return res.status(400).send("The card cant be created")
    }

    res.send(card);
})

module.exports = router;