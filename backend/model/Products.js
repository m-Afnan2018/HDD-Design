const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// schema design
const validator = require("validator");

const productsSchema = mongoose.Schema({
  sku: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [200, "Name is too large"],
  },
  slug: {
    type: String,
    trim: true,
    required: false,
  },
  unit: {
    type: String,
    required: true,
  },
  imageURLs: {
    type: [{
      color:{
        name:{
          type: String,
          required: false,
          trim: true,
        },
        clrCode:{
          type: String,
          required: false,
          trim: true,
        }
      },
      img:{
        type: String,
        required: [true, "Each product image must have a URL"],
        trim: true,
        validate: {
          validator: function(v) {
            return typeof v === 'string' && v.trim() !== '' && validator.isURL(v);
          },
          message: "Please provide valid image url(s)"
        }
      },
      sizes:[String],
      isDefault: {
        type: Boolean,
        default: false
      }
    }],
    validate: {
      validator: function(v){
        return Array.isArray(v) && v.length > 0 && v.every(item => item.img && item.img.trim() !== "");
      },
      message: "At least one product image is required"
    }
  },
  parent:{
    type:String,
    required:true,
    trim:true,
   },
  children:{
    type:String,
    required:true,
    trim:true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },
  discount: {
    type: Number,
    min: [0, "Product price can't be negative"]
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Product quantity can't be negative"]
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE} "
    },
    default: "in-stock",
  },
  productType:{
    type:String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: false
  },
  additionalInformation: [{}],
  tags: [String],
  offerDate:{
    startDate:{
      type:Date
    },
    endDate:{
      type:Date
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  sellCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
})


const Products = mongoose.model('Products', productsSchema)

module.exports = Products;