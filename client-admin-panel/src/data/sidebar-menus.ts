import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Coupons,
  Orders,
  Products,
  Profile,
  Setting,
  StuffUser,
} from "@/svg";

const sidebar_menu: Array<ISidebarMenus> = [
  {
    id: 1,
    icon: Dashboard,
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: Products,
    link: "/product-list",
    title: "Products",
    subMenus: [
      { title: "Product List", link: "/product-list" },
      { title: "Product Grid", link: "/product-grid" },
      { title: "Add Product", link: "/add-product" }
    ],
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Orders",
  },
  {
    id: 5,
    icon: Coupons,
    link: "/coupon",
    title: "Coupons",
  },
  {
    id: 6,
    icon: Profile,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 7,
    icon: Setting,
    link: "#",
    title: "Online store",
  },
  {
    id: 8,
    icon: StuffUser,
    link: "/our-staff",
    title: "Our Staff",
  },
];

export default sidebar_menu;
