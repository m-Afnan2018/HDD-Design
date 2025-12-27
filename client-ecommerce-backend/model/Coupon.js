const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: false
    },
    endTime: {
      type: Date,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    minimumAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
  },
  {
    timestamps: true,
  }
);

// Force model recompilation to ensure schema changes take effect
if (mongoose.models.Coupon) {
  delete mongoose.models.Coupon;
}
if (mongoose.modelSchemas && mongoose.modelSchemas.Coupon) {
  delete mongoose.modelSchemas.Coupon;
}
const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
