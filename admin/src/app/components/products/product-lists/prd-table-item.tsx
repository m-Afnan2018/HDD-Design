import Image from "next/image";
import React, { useState } from "react";
import { Delete, Edit } from "@/svg";
import { IProduct } from "@/types/product-type";
import EditDeleteBtn from "../../button/edit-delete-btn";
import { getDefaultVariant } from "@/utils/utils";

const ProductTableItem = ({ product }: { product: IProduct }) => {
  const {_id, img, title, sku, price, status, quantity,imageURLs } = product || {};
  const defaultItem = getDefaultVariant(imageURLs || []);

  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
      <td className="pr-8 py-5 whitespace-nowrap">
        <a href="#" className="flex items-center space-x-5">
          {defaultItem?.img ? (
            <Image
              className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
              src={defaultItem.img}
              width={60}
              height={60}
              alt="product img"
            />
          ) : (
            <div className="w-[60px] h-[60px] rounded-md bg-[#F2F3F5] flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
          <span className="font-medium text-heading text-hover-primary transition">
            {title}
          </span>
        </a>
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">#{sku}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        {quantity}
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        ₹{price}
      </td>
      <td className="px-3 py-3 text-end">
        <span
          className={`text-[11px] px-3 py-1 rounded-md leading-none font-medium text-end ${
            status === "in-stock"
              ? "text-success bg-success/10"
              : "text-danger bg-danger/10"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-9 py-3 text-end">
        <div className="flex items-center justify-end space-x-2">
          <EditDeleteBtn id={_id}/>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableItem;
