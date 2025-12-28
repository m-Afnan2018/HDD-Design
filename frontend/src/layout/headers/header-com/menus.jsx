'use client';
import React from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";

const Menus = () => {
  return (
    <ul className="d-flex justify-content-center align-items-center gap-3">
      {menu_data.map((menu) => (
        <li key={menu.id}>
          <Link href={menu.link}>{menu.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
