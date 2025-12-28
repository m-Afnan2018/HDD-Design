const Product = require("../model/Products");
const { cloudinaryServices } = require("./cloudinary.service");


// create product service
exports.createProductService = async (data) => {
  try {
    console.log('Creating product with data:', JSON.stringify(data, null, 2));
    // lock product type to fashion
    const product = await Product.create({ ...data, productType: 'fashion' });
    return product;
  } catch (error) {
    console.error('Product creation error:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    throw error;
  }
};

// create all product service
exports.addAllProductService = async (data) => {
  await Product.deleteMany();
  const fashionOnly = data
    .filter(item => !item.productType || item.productType === 'fashion')
    .map(item => ({ ...item, productType: 'fashion' }));
  const products = await Product.insertMany(fashionOnly);
  return products;
};

// get product data
exports.getAllProductsService = async () => {
  const products = await Product.find({ productType: 'fashion' })
    .sort({ createdAt: -1 }); // -1 = DESC, 1 = ASC
  return products;
};


// get type of product service
exports.getProductTypeService = async (req) => {
  const type = 'fashion';
  const query = req.query;
  let products;
  if (query.new === "true") {
    products = await Product.find({ productType: type })
      .sort({ createdAt: -1 })
      .limit(8);
  } else if (query.featured === "true") {
    products = await Product.find({
      productType: type,
      featured: true,
    });
  } else if (query.topSellers === "true") {
    products = await Product.find({ productType: type })
      .sort({ sellCount: -1 })
      .limit(8);
  } else {
    products = await Product.find({ productType: type });
  }
  return products;
};

// get offer product service
exports.getOfferTimerProductService = async () => {
  const products = await Product.find({
    productType: 'fashion',
    "offerDate.endDate": { $gt: new Date() },
  });
  return products;
};

// get popular product service by type
exports.getPopularProductServiceByType = async (type) => {
  const products = await Product.find({ productType: 'fashion' })
    .sort({ sellCount: -1 })
    .limit(8);
  return products;
};

exports.getTopRatedProductService = async () => {
  // Return top priced fashion products since we removed reviews
  const products = await Product.find({
    productType: 'fashion'
  }).sort({ price: -1 }).limit(8);

  return products;
};

// get product data
exports.getProductService = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// get product data
exports.getRelatedProductService = async (productId) => {
  // Find related products by same parent category
  const currentProduct = await Product.findById(productId);

  const relatedProducts = await Product.find({
    parent: currentProduct.parent,
    productType: 'fashion',
    _id: { $ne: productId }, // Exclude the current product ID
  }).limit(8);

  // If no related products by parent, return other fashion products
  if (relatedProducts.length === 0) {
    return await Product.find({
      productType: 'fashion',
      _id: { $ne: productId },
    }).limit(8);
  }

  return relatedProducts;
};

// update a product
exports.updateProductService = async (id, currProduct) => {
  const product = await Product.findById(id);
  if (product) {
    product.title = currProduct.title;
    product.sku = currProduct.sku;
    product.img = currProduct.img;
    product.slug = currProduct.slug;
    product.unit = currProduct.unit;
    product.imageURLs = currProduct.imageURLs;
    product.tags = currProduct.tags;
    product.parent = currProduct.parent;
    product.children = currProduct.children;
    product.price = currProduct.price;
    product.discount = currProduct.discount;
    product.quantity = currProduct.quantity;
    product.status = currProduct.status;
    product.productType = 'fashion';
    product.description = currProduct.description;
    product.additionalInformation = currProduct.additionalInformation;
    product.offerDate.startDate = currProduct.offerDate.startDate;
    product.offerDate.endDate = currProduct.offerDate.endDate;

    await product.save();
  }

  return product;
};




// get Reviews Products
exports.getStockOutProducts = async () => {
  const result = await Product.find({ status: "out-of-stock" }).sort({ createdAt: -1 })
  return result;
};

// get Reviews Products
// exports.deleteProduct = async (id) => {
//   const result = await Product.findByIdAndDelete(id)
//   return result;
// };


// Delete product with images
exports.deleteProduct = async (id) => {
  try {
    // First, find the product to get image URLs
    const product = await Product.findById(id);
    
    if (!product) {
      throw new Error('Product not found');
    }

    // Extract all image URLs from product
    const imagePublicIds = [];
    
    if (product.imageURLs && Array.isArray(product.imageURLs)) {
      product.imageURLs.forEach((imgObj) => {
        if (imgObj.img && typeof imgObj.img === 'string') {
          // Check if it's a Cloudinary URL
          if (imgObj.img.includes('cloudinary.com')) {
            const publicId = extractPublicId(imgObj.img);
            if (publicId) {
              imagePublicIds.push(publicId);
            }
          }
        }
      });
    }

    console.log(`Found ${imagePublicIds.length} images to delete for product ${id}`);

    // Delete images from Cloudinary (in parallel)
    if (imagePublicIds.length > 0) {
      const deletionPromises = imagePublicIds.map(publicId =>
        cloudinaryServices.cloudinaryImageDelete(publicId)
      );

      const deletionResults = await Promise.all(deletionPromises);
      
      const successCount = deletionResults.filter(r => r.result === 'ok').length;
      console.log(`Successfully deleted ${successCount}/${imagePublicIds.length} images from Cloudinary`);
    }

    // Delete the product from database
    const result = await Product.findByIdAndDelete(id);
    
    return result;
  } catch (error) {
    console.error('Error in deleteProduct service:', error);
    throw error;
  }
};



// Helper function to extract public_id from Cloudinary URL
const extractPublicId = (imageUrl) => {
  try {
    // Match pattern: /upload/v{version}/{public_id}.{extension}
    const regex = /\/upload\/(?:v\d+\/)?([^/.]+(?:\/[^/.]+)*)/;
    const matches = imageUrl.match(regex);
    
    if (matches && matches[1]) {
      return matches[1];
    }
    return null;
  } catch (error) {
    console.error('Error extracting public_id from URL:', imageUrl, error);
    return null;
  }
};