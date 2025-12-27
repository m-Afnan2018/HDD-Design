'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

const useSearchFormSubmit = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = searchText.trim();
    if (!query) {
      router.push(`/`);
      setSearchText("");
      return;
    }

    const route = `/search?searchText=${encodeURIComponent(query)}&productType=fashion`;

    router.push(route);
    setSearchText("");
  };

  return {
    searchText,
    setSearchText,
    handleSubmit,
  };
};

export default useSearchFormSubmit;
