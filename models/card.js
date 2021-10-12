const mongoose = require("mongoose");

// sending data to DB
const cardSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: String,

    },
    subscribed: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        default: 0
    },
    subscription: {
        type: String,
        default: "Monthly"
    },

})

// use to convert _id field to id 
cardSchema.virtual("id").get(function () {
    return this._id.toHexString();
})

cardSchema.set("toJSON", {
    virtuals: true
})

exports.Card = mongoose.model("Card", cardSchema);