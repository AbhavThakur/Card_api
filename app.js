const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const bodyParser = require("body-parser")
const morgan = require("morgan"); // morgan used for logging api requests
// morgan shows status ,req url,time taken,method
const mongoose = require("mongoose");
const { Card } = require('./models/card');
const cardsRouter = require("./routers/cards")

// another way use bodyparser
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json())
// app.use(express.json()) : used to let the backend know the frontend is sending json data
app.use(morgan("tiny"))

// app.use(`api/v1/cardDetails`, cardsRouter)
app.get('/api/v1/cardDetails', async (req, res) => {
    const cardList = await Card.find();

    if (!cardList)
        res.status(500).json({ success: false })

    res.status(200).send(cardList);
})

app.get('/api/v1/cardDetails/:cardNumber', async (req, res) => {
    const cardList = await Card.find({ cardNumber: req.params.cardNumber });

    if (!cardList || cardList.length === 0) {
        console.log(cardList);
        return res.status(500).json({ success: false, msg: "Card with given number not found" })
    }
    console.log(cardList);
    res.status(200).send(cardList);
})

app.put('/api/v1/cardDetails/:id', async (req, res) => {
    const card = await Card.findByIdAndUpdate(
        req.params.id,
        {
            cardNumber: req.body.cardNumber,
            amount: req.body.amount,
            subscription: req.body.subscription,
            expiryDate: req.body.expiryDate,
            dateCreated: req.body.dateCreated,
        },
        { new: true }
        // new : true used to see the updated value after put request as we see old data,but got updated in db
    )
    if (!card) {
        return res.status(400).send("The card cant be created")
    }

    res.send(card);
})

app.post("/api/v1/cardDetails", async (req, res) => {

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

    const existCard = await Card.exists({ cardNumber: req.body.cardNumber });
    if (existCard) {
        return res.status(400).send("User exists")
        console.log(existCard);
    }

    else {
        card = await card.save();

        if (!card) {
            return res.status(400).send("The card cant be created")
        }

        res.send(card);
    }
})

mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: "DiscountAdda"
})
    .then(() => {
        console.log("DB connection is ready...")
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(5000, () => {

    console.log("server is listening at port 5000")
})