import { NextRequest, NextResponse } from "next/server";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/utils/cloudinaryUpload";


/**
 * PUT /api/products/[id]
 * Update an existing product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = id;
    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

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

    // Extract nested objects
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

    // Get old product data to delete old images if needed
    const oldImagesData = JSON.parse(formData.get("oldImages") as string || "[]");

    // Upload new variant images and handle existing ones
    const imageURLs = await Promise.all(
      variantsData.map(async (variant: any, index: number) => {
        const imageFile = formData.get(`variant_image_${index}`) as File | null;
        
        let imageUrl = variant.img;

        // If there's a new image file, upload it and delete old one
        if (imageFile && imageFile instanceof File) {
          try {
            // Upload new image
            imageUrl = await uploadImageToCloudinary(imageFile, "shofy-products");
            
            // Delete old image if it exists and is different
            const oldImage = oldImagesData[index];
            if (oldImage && oldImage !== imageUrl) {
              try {
                await deleteImageFromCloudinary(oldImage);
              } catch (deleteError) {
                console.error("Error deleting old image:", deleteError);
                // Continue even if deletion fails
              }
            }
          } catch (uploadError) {
            console.error(`Error uploading image for variant ${index}:`, uploadError);
            throw new Error(`Failed to upload image for variant ${index}`);
          }
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

    // Prepare product payload
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

    // Send to external server
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/edit-product/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Failed to update product",
          errors: result.errors,
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating product:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}