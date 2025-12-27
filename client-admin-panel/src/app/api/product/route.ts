import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "../../../utils/cloudinaryUpload"; // Adjust path

/**
 * POST /api/products
 * Create a new product with image uploads
 */
export async function POST(request: NextRequest) {
  try {
    // Skip Cloudinary test for now - will test during image upload
    console.log("Processing product creation...");
    // Parse form data
    const formData = await request.formData();

    // Extract basic fields
    const title = formData.get("title") as string;
    const sku = formData.get("sku") as string;
    const unit = formData.get("unit") as string;
    const price = formData.get("price") as string;
    const discount = formData.get("discount") as string;
    const quantity = formData.get("quantity") as string;
    const parent = formData.get("parent") as string;
    const children = formData.get("children") as string;
    const status = formData.get("status") as string;
    const productType = "fashion";
    const description = formData.get("description") as string;
    const videoId = formData.get("videoId") as string;
    const featured = formData.get("featured") === "true";

    // Extract nested objects (sent as JSON strings)
    const brand = JSON.parse(formData.get("brand") as string);
    const offerDate = JSON.parse(formData.get("offerDate") as string || "{}");
    const tags = JSON.parse(formData.get("tags") as string || "[]");
    const additionalInformation = JSON.parse(
      formData.get("additionalInformation") as string || "[]"
    );

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!unit) missingFields.push("unit");
    if (!price) missingFields.push("price");
    if (!quantity) missingFields.push("quantity");
    if (!parent) missingFields.push("parent");
    if (!children) missingFields.push("children");
    if (!description) missingFields.push("description");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }



    // Process variants with image uploads
    const variantsData = JSON.parse(formData.get("variants") as string || "[]");
    
    if (!variantsData || variantsData.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one product variant is required" },
        { status: 400 }
      );
    }

    // Upload variant images to Cloudinary (skip if credentials are not set)
    const imageURLs = await Promise.all(
      variantsData.map(async (variant: any, index: number) => {
        const imageFile = formData.get(`variant_image_${index}`) as File | null;

        let imageUrl = variant.img; // Use existing URL if no new file

        // If there's a new image file, try to upload it
        if (imageFile && imageFile instanceof File) {
          // Skip upload if Cloudinary credentials are not configured
          if (process.env.CLOUDINARY_API_KEY === 'your_cloud_name_here' ||
              process.env.CLOUDINARY_API_KEY === 'your_api_key_here' ||
              !process.env.CLOUDINARY_API_KEY ||
              !process.env.CLOUDINARY_NAME ||
              !process.env.CLOUDINARY_API_SECRET) {
            console.log(`Skipping image upload for variant ${index} - Cloudinary not configured`);
            imageUrl = ""; // Will be handled by frontend as "no image"
          } else {
            try {
              console.log(`Uploading image for variant ${index}, file: ${imageFile.name}, size: ${imageFile.size}, type: ${imageFile.type}`);
              imageUrl = await uploadImageToCloudinary(imageFile, "shofy-products");
              console.log(`Successfully uploaded image for variant ${index}: ${imageUrl}`);
            } catch (uploadError: any) {
              console.error(`Error uploading image for variant ${index}:`, uploadError);
              // Don't fail the entire product creation for image upload errors
              console.log(`Continuing without image for variant ${index}`);
              imageUrl = ""; // Product will be created without image
            }
          }
        } else {
          console.log(`No image file for variant ${index}, using URL: ${variant.img || 'empty'}`);
          // For new products without images, this should be empty
          imageUrl = variant.img || "";
        }

        return {
          color: {
            name: variant.color || "",
            clrCode: variant.colorCode || "",
          },
          img: imageUrl,
          sizes: variant.size ? variant.size.split(",").map((s: string) => s.trim()) : [],
          isDefault: variant.isDefault || false,
        };
      })
    );

    // Check if at least one default variant exists
    const hasDefault = imageURLs.some((img) => img.isDefault === true);
    if (!hasDefault && imageURLs.length > 0) {
      imageURLs[0].isDefault = true;
    }

    // Prepare product payload for external server
    const productPayload = {
      sku: sku || "",
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      unit,
      imageURLs,
      parent,
      children,
      price: Number(price),
      discount: Number(discount) || 0,
      quantity: Number(quantity),
      status: status || "in-stock",
      productType: productType,
      description,
      videoId: videoId || "",
      additionalInformation,
      tags,
      offerDate: {
        startDate: offerDate?.startDate || null,
        endDate: offerDate?.endDate || null,
      },
      featured,
    };

    // Debug logging
    console.log('Product payload:', JSON.stringify(productPayload, null, 2));

    // console.log(productPayload,'productPayload');

    // Send to external server
    console.log('Sending to backend:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/add`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productPayload),
    });

    const result = await response.json();
    console.log('Backend response:', response.status, JSON.stringify(result, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || result.error || "Failed to create product",
          details: result.details || result.errors || "Check console for more details",
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}