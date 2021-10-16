const mongoose = require("mongoose");

// sending data to DB
const merchantDiscountSchema = mongoose.Schema({
    merchantId: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    dateCreated: {
        type: String,
    }
})

// use to convert _id field to id 
merchantDiscountSchema.virtual("id").get(function () {
    return this._id.toHexString();
})

merchantDiscountSchema.set("toJSON", {
    virtuals: true
})

exports.Discount = mongoose.model("Discount", merchantDiscountSchema);