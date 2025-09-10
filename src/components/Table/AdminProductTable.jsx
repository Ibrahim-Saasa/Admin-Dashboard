import { useState } from "react";
import { X, Filter, Plus, Search, Edit2, Trash2 } from "lucide-react";

const AdminProductTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Apple MacBook Pro 17"',
      price: "$2999",
      quantity: 25,
      sales: 150,
      category: "Laptops",
      selected: false,
    },
    {
      id: 2,
      name: "Microsoft Surface Pro",
      price: "$1999",
      quantity: 42,
      sales: 89,
      category: "Laptops",
      selected: false,
    },
    {
      id: 3,
      name: "Magic Mouse 2",
      price: "$99",
      quantity: 156,
      sales: 324,
      category: "Accessories",
      selected: false,
    },
    {
      id: 4,
      name: "Google Pixel Phone",
      price: "$799",
      quantity: 78,
      sales: 201,
      category: "Phones",
      selected: false,
    },
    {
      id: 5,
      name: "Apple Watch 5",
      price: "$999",
      quantity: 34,
      sales: 167,
      category: "Wearables",
      selected: false,
    },
    {
      id: 6,
      name: "Samsung Galaxy Tab",
      price: "$649",
      quantity: 62,
      sales: 112,
      category: "Tablets",
      selected: false,
    },
    {
      id: 7,
      name: "Sony Headphones",
      price: "$199",
      quantity: 89,
      sales: 298,
      category: "Accessories",
      selected: false,
    },
    {
      id: 8,
      name: 'Dell Monitor 24"',
      price: "$449",
      quantity: 31,
      sales: 73,
      category: "Monitors",
      selected: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [salesFilter, setSalesFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Sidebar and Modal states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New product state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    sales: 0,
  });

  const categories = [
    "Laptops",
    "Phones",
    "Tablets",
    "Accessories",
    "Monitors",
    "Wearables",
  ];

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

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesStock &&
      matchesSales &&
      matchesCategory
    );
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
    setCategoryFilter("all");
  };

  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.quantity ||
      !newProduct.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: newProduct.name,
      price: newProduct.price.startsWith("$")
        ? newProduct.price
        : `$${newProduct.price}`,
      quantity: parseInt(newProduct.quantity),
      sales: parseInt(newProduct.sales) || 0,
      category: newProduct.category,
      selected: false,
    };

    setProducts((prev) => [product, ...prev]);
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
      category: "",
      sales: 0,
    });
    setAddModalOpen(false);
  };

  const deleteSelectedProducts = () => {
    const selectedCount = products.filter((p) => p.selected).length;
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

  const getQuantityStatus = (quantity) => {
    if (quantity < 20) return "text-red-600 bg-red-100";
    if (quantity < 50) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const selectedCount = products.filter((p) => p.selected).length;
  const hasActiveFilters =
    searchTerm !== "" ||
    priceFilter !== "all" ||
    stockFilter !== "all" ||
    salesFilter !== "all" ||
    categoryFilter !== "all";

  return (
    <div className="">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $200</option>
              <option value="medium">$200 - $800</option>
              <option value="high">Over $800</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Level
            </label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stock</option>
              <option value="out">Out of Stock</option>
              <option value="low">Low Stock (&lt;20)</option>
              <option value="medium">Medium Stock (20-50)</option>
              <option value="high">High Stock (&gt;50)</option>
            </select>
          </div>

          {/* Sales Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sales Performance
            </label>
            <select
              value={salesFilter}
              onChange={(e) => setSalesFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sales</option>
              <option value="low">Low Sales (&lt;100)</option>
              <option value="medium">Medium Sales (100-250)</option>
              <option value="high">High Sales (&gt;250)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add New Product
                </h2>
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 299 or $299"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quantity"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Sales (Optional)
                </label>
                <input
                  type="number"
                  value={newProduct.sales}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sales: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        <div className="glass border-1 border-[#9ec49e] rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Product Management
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter size={18} />
                  Filters
                </button>
                {selectedCount > 0 && (
                  <button
                    onClick={deleteSelectedProducts}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete ({selectedCount})
                  </button>
                )}
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="flex items-center gap-2 titanium !text-black px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={18} />
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>{filteredProducts.length}</strong> product(s) found
                  {searchTerm && <span> matching "{searchTerm}"</span>}
                  {categoryFilter !== "all" && (
                    <span> • Category: {categoryFilter}</span>
                  )}
                  {priceFilter !== "all" && (
                    <span> • Price: {priceFilter}</span>
                  )}
                  {stockFilter !== "all" && (
                    <span> • Stock: {stockFilter}</span>
                  )}
                  {salesFilter !== "all" && (
                    <span> • Sales: {salesFilter}</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="titanium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`${
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
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
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No products found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Stats Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-800">
                  {products.length}
                </div>
                <div className="text-sm text-blue-600">Total Products</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-800">
                  {products.reduce((sum, p) => sum + p.sales, 0)}
                </div>
                <div className="text-sm text-green-600">Total Sales</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-800">
                  {products.filter((p) => p.quantity < 20).length}
                </div>
                <div className="text-sm text-yellow-600">Low Stock</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-800">
                  {selectedCount}
                </div>
                <div className="text-sm text-purple-600">Selected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductTable;
