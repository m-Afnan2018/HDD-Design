'use client'
import React from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
// internal
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";

const CategoryFilter = ({setCurrPage,shop_right=false}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // Fashion categories (static since we removed category system)
  const fashionCategories = [
    { name: "clothing", display: "Clothing" },
    { name: "bags", display: "Bags" },
    { name: "shoes", display: "Shoes" }
  ];

  // handle category route
  const handleCategoryRoute = (title) => {
    setCurrPage(1);
    router.push(
      `/${shop_right?'shop-right-sidebar':'shop'}?category=${title
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
        )
    dispatch(handleFilterSidebarClose());
  }

  const content = fashionCategories.map((item) => (
    <li key={item.name}>
      <a
        onClick={() => handleCategoryRoute(item.name)}
        style={{ cursor: "pointer" }}
        className={
          category === item.name.toLowerCase().replace("&", "").split(" ").join("-")
            ? "active"
            : ""
        }
      >
        {item.display}
      </a>
    </li>
  ));
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
