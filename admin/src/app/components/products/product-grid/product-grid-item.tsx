import React from "react";
import Image from "next/image";
// internal
import { IProduct } from "@/types/product-type";
import ProductGridAction from "./product-grid-action";
import { getDefaultVariant } from "@/utils/utils";

const ProductGridItem = ({ product }: { product: IProduct }) => {
  const { _id,img, title, sku, price, status, quantity,imageURLs } = product || {};

  const defaultItem = getDefaultVariant(imageURLs || []);
  return (
    <div className="rounded-md bg-white border-gray6 border">
      <div className="relative">
        <a href="#" className="inline-block bg-[#F2F3F5]">
          {defaultItem?.img ? (
            <Image
              className="w-full"
              src={defaultItem.img}
              width={279}
              height={297}
              alt="product img"
            />
          ) : (
            <div className="w-full h-[297px] flex items-center justify-center text-gray-400 text-sm bg-gray-100">
              No Image Available
            </div>
          )}
        </a>
        <div className="absolute top-5 right-5 z-10">
          <ProductGridAction id={_id}/>
        </div>
      </div>
      <div className="px-5 py-5">
        <a
          href="#"
          className="text-lg font-normal text-heading text-hover-primary mb-2 inline-block leading-none"
        >
          {title}
        </a>
        <div className="leading-none mb-2">
          <span className="text-base font-medium text-black">
            ₹{price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductGridItem;
