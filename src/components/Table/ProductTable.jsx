import React, { useState } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Apple MacBook Pro 17"',
      price: "$2999",
      quantity: 25,
      sales: 150,
      selected: false,
    },
    {
      id: 2,
      name: "Microsoft Surface Pro",
      price: "$1999",
      quantity: 42,
      sales: 89,
      selected: false,
    },
    {
      id: 3,
      name: "Magic Mouse 2",
      price: "$99",
      quantity: 156,
      sales: 324,
      selected: false,
    },
    {
      id: 4,
      name: "Google Pixel Phone",
      price: "$799",
      quantity: 78,
      sales: 201,
      selected: false,
    },
    {
      id: 5,
      name: "Apple Watch 5",
      price: "$999",
      quantity: 34,
      sales: 167,
      selected: false,
    },
    {
      id: 6,
      name: "Samsung Galaxy Tab",
      price: "$649",
      quantity: 62,
      sales: 112,
      selected: false,
    },
    {
      id: 7,
      name: "Sony Headphones",
      price: "$199",
      quantity: 89,
      sales: 298,
      selected: false,
    },
    {
      id: 8,
      name: 'Dell Monitor 24"',
      price: "$449",
      quantity: 31,
      sales: 73,
      selected: false,
    },
    {
      id: 9,
      name: "Logitech Keyboard",
      price: "$129",
      quantity: 124,
      sales: 256,
      selected: false,
    },
    {
      id: 10,
      name: "iPhone 15",
      price: "$1199",
      quantity: 18,
      sales: 342,
      selected: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [salesFilter, setSalesFilter] = useState("all");

  const hasActiveFilters =
    searchTerm !== "" ||
    priceFilter !== "all" ||
    stockFilter !== "all" ||
    salesFilter !== "all";

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.includes(searchTerm) ||
      product.quantity.toString().includes(searchTerm) ||
      product.sales.toString().includes(searchTerm);

    const price = parseInt(product.price.replace("$", ""));
    let matchesPrice = true;
    if (priceFilter === "low") matchesPrice = price < 200;
    else if (priceFilter === "medium")
      matchesPrice = price >= 200 && price <= 800;
    else if (priceFilter === "high") matchesPrice = price > 800;

    let matchesStock = true;
    if (stockFilter === "low") matchesStock = product.quantity < 20;
    else if (stockFilter === "medium")
      matchesStock = product.quantity >= 20 && product.quantity <= 50;
    else if (stockFilter === "high") matchesStock = product.quantity > 50;
    else if (stockFilter === "out") matchesStock = product.quantity === 0;

    let matchesSales = true;
    if (salesFilter === "low") matchesSales = product.sales < 100;
    else if (salesFilter === "medium")
      matchesSales = product.sales >= 100 && product.sales <= 250;
    else if (salesFilter === "high") matchesSales = product.sales > 250;

    return matchesSearch && matchesPrice && matchesStock && matchesSales;
  });

  const handleProductSelect = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectedAll;
    setSelectedAll(newSelectAll);
    setProducts((prev) => prev.map((p) => ({ ...p, selected: newSelectAll })));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setPriceFilter("all");
    setStockFilter("all");
    setSalesFilter("all");
  };

  const selectedCount = products.filter((p) => p.selected).length;

  const addNewProduct = () => {
    const productNames = [
      "iPad Air",
      "AirPods Pro",
      "Nintendo Switch",
      "PS5 Controller",
      "Webcam HD",
    ];
    const randomName =
      productNames[Math.floor(Math.random() * productNames.length)];
    const randomPrice = `$${Math.floor(Math.random() * 1500 + 50)}`;
    const randomQuantity = Math.floor(Math.random() * 200 + 1);
    const randomSales = Math.floor(Math.random() * 500 + 10);

    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: randomName,
      price: randomPrice,
      quantity: randomQuantity,
      sales: randomSales,
      selected: false,
    };

    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteSelectedProducts = () => {
    if (selectedCount === 0) {
      alert("Please select products to delete");
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedCount} selected product(s)?`
      )
    ) {
      setProducts((prev) => prev.filter((p) => !p.selected));
      setSelectedAll(false);
    }
  };

  const editQuantity = (id) => {
    const product = products.find((p) => p.id === id);
    const newQuantity = prompt("Edit quantity:", product.quantity);
    if (newQuantity && !isNaN(newQuantity)) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, quantity: parseInt(newQuantity) } : p
        )
      );
    }
  };

  const getQuantityStatus = (quantity) => {
    if (quantity < 20) return "text-red-600 bg-red-50";
    if (quantity < 50) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="max-w-full mx-auto bg-[#fff0f5] border-1 border-[#9ec49e] rounded-md shadow-lg">
      <div className=" rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Product Management
          </h1>
          <div className="flex gap-2">
            {selectedCount > 0 && (
              <button
                onClick={deleteSelectedProducts}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete Selected ({selectedCount})
              </button>
            )}
            <button
              onClick={addNewProduct}
              className="border-2 border-[#9ec49e] hover:bg-gradient-to-r from-green-600 to-yellow-300 text-black px-4 py-2 rounded-lg transition-colors"
            >
              Add New Product
            </button>
          </div>
        </div>

        {/* Search Bar and Filters */}
        <div className="mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products by name, price, quantity, or sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Price Range:
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $200</option>
                <option value="medium">$200 - $800</option>
                <option value="high">Over $800</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Stock Level:
              </label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                <option value="all">All Stock</option>
                <option value="out">Out of Stock</option>
                <option value="low">Low Stock (under 20)</option>
                <option value="medium">Medium Stock (20-50)</option>
                <option value="high">High Stock (over 50)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Sales Performance:
              </label>
              <select
                value={salesFilter}
                onChange={(e) => setSalesFilter(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                <option value="all">All Sales</option>
                <option value="low">Low Sales (under 100)</option>
                <option value="medium">Medium Sales (100-250)</option>
                <option value="high">High Sales (over 250)</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Filter Results Summary */}
          {(searchTerm || hasActiveFilters) && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>{filteredProducts.length}</strong> product(s) found
                {searchTerm && <span> matching "{searchTerm}"</span>}
                {priceFilter !== "all" && <span> • Price: {priceFilter}</span>}
                {stockFilter !== "all" && <span> • Stock: {stockFilter}</span>}
                {salesFilter !== "all" && <span> • Sales: {salesFilter}</span>}
              </p>
            </div>
          )}
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-md bg-gradient-to-r from-green-600 to-yellow-300 border-t border-[#000]">
              <tr className="border-b border-[#000]">
                <th scope="col" className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Sales
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`border-b border-[#9ec49e] ${
                    product.selected ? "bg-blue-50" : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={product.selected}
                      onChange={() => handleProductSelect(product.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getQuantityStatus(
                        product.quantity
                      )}`}
                    >
                      {product.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-blue-600">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editQuantity(product.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit Qty
                      </button>
                      <button
                        onClick={() => handleProductSelect(product.id)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        {product.selected ? "Deselect" : "Select"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No products found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">
              Total Products
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {products.length}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600 font-medium">
              Total Sales
            </div>
            <div className="text-2xl font-bold text-green-800">
              {products.reduce((sum, product) => sum + product.sales, 0)}
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-sm text-yellow-600 font-medium">
              Low Stock Items
            </div>
            <div className="text-2xl font-bold text-yellow-800">
              {products.filter((product) => product.quantity < 20).length}
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">
              Selected Items
            </div>
            <div className="text-2xl font-bold text-purple-800">
              {selectedCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
