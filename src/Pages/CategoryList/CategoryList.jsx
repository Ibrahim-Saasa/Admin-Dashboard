import React, { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Eye, EyeOff } from "lucide-react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      heading: "Latest Electronics & Gadgets",
      description: "Discover cutting-edge electronics and smart devices",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      parentId: null,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      name: "Smartphones",
      heading: "Premium Smartphones",
      description: "Latest iPhone, Samsung, and Android devices",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
      parentId: 1,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 3,
      name: "Laptops",
      heading: "High-Performance Laptops",
      description: "Professional and gaming laptops for every need",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
      parentId: 1,
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 4,
      name: "Fashion",
      heading: "Trendy Fashion Collections",
      description: "Stylish clothing and accessories for all occasions",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      parentId: null,
      isActive: true,
      sortOrder: 2,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    description: "",
    image: "",
    parentId: null,
    isActive: true,
    sortOrder: 1,
  });

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ ...category });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        heading: "",
        description: "",
        image: "",
        parentId: null,
        isActive: true,
        sortOrder: 1,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Please enter a category name");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? { ...formData, id: editingCategory.id }
            : cat
        )
      );
    } else {
      const newCategory = {
        ...formData,
        id: Math.max(...categories.map((c) => c.id)) + 1,
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This will also delete all subcategories."
      )
    ) {
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== id && cat.parentId !== id)
      );
    }
  };

  const toggleActive = (id) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  const getParentCategories = () => {
    return categories.filter((cat) => cat.parentId === null);
  };

  const getSubCategories = (parentId) => {
    return categories.filter((cat) => cat.parentId === parentId);
  };

  const CategoryRow = ({ category, level = 0 }) => (
    <tr
      key={category.id}
      className={`border-b hover:bg-gray-50 ${
        !category.isActive ? "opacity-60" : ""
      }`}
    >
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            style={{ marginLeft: `${level * 24}px` }}
            className="flex items-center"
          >
            {category.image && (
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12 object-cover rounded-lg mr-3"
              />
            )}
            <div>
              <div className="font-medium text-gray-900">{category.name}</div>
              <div className="text-sm text-gray-500">{category.heading}</div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 max-w-xs truncate">
          {category.description}
        </p>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500">
          {category.parentId
            ? categories.find((c) => c.id === category.parentId)?.name
            : "Root"}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => toggleActive(category.id)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            category.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {category.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
          <span>{category.isActive ? "Active" : "Inactive"}</span>
        </button>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500">{category.sortOrder}</span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => openModal(category)}
            className="text-blue-600 hover:text-blue-900 p-1 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(category.id)}
            className="text-red-600 hover:text-red-900 p-1 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  const renderCategories = () => {
    const rows = [];
    const parentCategories = getParentCategories().sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

    parentCategories.forEach((parent) => {
      rows.push(<CategoryRow key={parent.id} category={parent} level={0} />);
      const subCategories = getSubCategories(parent.id).sort(
        (a, b) => a.sortOrder - b.sortOrder
      );
      subCategories.forEach((sub) => {
        rows.push(<CategoryRow key={sub.id} category={sub} level={1} />);
      });
    });

    return rows;
  };

  return (
    <div className="min-h-screen glass">
      <div className=" mx-auto">
        <div className="glass rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Category Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your e-commerce product categories
                </p>
              </div>
              <button
                onClick={() => openModal()}
                className="metallic-blue text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus size={18} />
                <span>Add Category</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 border-b border-gray-200 titanium-btn mb-2">
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600">Total Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {categories.filter((c) => c.isActive).length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {categories.filter((c) => c.parentId === null).length}
                </div>
                <div className="text-sm text-gray-600">Parent Categories</div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="titanium-btn border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sort Order
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="glass divide-y divide-gray-200">
                {renderCategories()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 titanium-btn bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="glass rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                  onClick={closeModal}
                  className="!text-black hover:text-gray-600 p-1 rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-transparent"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Parent Category
                  </label>
                  <select
                    name="parentId"
                    value={formData.parentId || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-transparent"
                  >
                    <option value="">Root Category</option>
                    {getParentCategories().map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-transparent"
                  placeholder="Category heading for display"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-transparent"
                  placeholder="Category description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Category Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-1"
                  >
                    <Upload size={16} />
                    <span>Upload</span>
                  </button>
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 focus:ring-blue-500 text-gray-800"
                    />
                    <span className="text-sm font-medium text-black">
                      Active
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 !text-black titanium-btn hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 metallic-blue text-white rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save size={16} />
                  <span>{editingCategory ? "Update" : "Create"} Category</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
