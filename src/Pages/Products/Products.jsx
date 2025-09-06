import Button from "@mui/material/Button";
import React from "react";

const Products = () => {
  return (
    <>
      <div className="card p-5 bg-[#fff0f5] shadow-lg rounded-md flex items-center">
        <h1 className="font-[700] text-[20px] text-[]">Products</h1>
        <Button className="btn-blue !ml-auto">Add Product</Button>
      </div>
    </>
  );
};

export default Products;
