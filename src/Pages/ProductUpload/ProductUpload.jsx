import React, { useState } from "react";

const ProductUpload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({
    // Basic Information
    name: "",
    category: "",
    subcategory: "",
    brand: "",
    model: "",
    description: "",

    // Pricing & Inventory
    price: "",
    comparePrice: "",
    costPrice: "",
    sku: "",
    barcode: "",
    quantity: "",
    lowStockAlert: "",

    // Product Details (varies by category)
    specifications: {},

    // Images & Media
    images: [],
    videos: [],

    // SEO & Marketing
    tags: [],
    metaTitle: "",
    metaDescription: "",

    // Shipping & Dimensions
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    shippingClass: "",

    // Status
    status: "draft",
    featured: false,
  });

  const categories = {
    electronics: {
      name: "Electronics",
      subcategories: [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Cameras",
        "Audio",
        "Gaming",
        "Smart Home",
        "Wearables",
      ],
      fields: [
        "processor",
        "storage",
        "ram",
        "displaySize",
        "batteryLife",
        "connectivity",
        "operatingSystem",
      ],
    },
    fashion: {
      name: "Fashion",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Clothing",
        "Shoes",
        "Bags",
        "Jewelry",
        "Watches",
      ],
      fields: [
        "size",
        "color",
        "material",
        "brand",
        "season",
        "careInstructions",
        "origin",
      ],
    },
    appliances: {
      name: "Home Appliances",
      subcategories: [
        "Kitchen",
        "Laundry",
        "Cleaning",
        "Small Appliances",
        "HVAC",
        "Water Systems",
      ],
      fields: [
        "powerConsumption",
        "energyRating",
        "capacity",
        "warranty",
        "installation",
        "dimensions",
        "features",
      ],
    },
    furniture: {
      name: "Furniture",
      subcategories: [
        "Living Room",
        "Bedroom",
        "Dining Room",
        "Office",
        "Outdoor",
        "Storage",
      ],
      fields: [
        "material",
        "color",
        "style",
        "assembly",
        "weight",
        "dimensions",
        "warranty",
      ],
    },
    beauty: {
      name: "Beauty & Personal Care",
      subcategories: [
        "Skincare",
        "Makeup",
        "Haircare",
        "Fragrances",
        "Personal Care",
        "Tools",
      ],
      fields: [
        "skinType",
        "ingredients",
        "volume",
        "shade",
        "scent",
        "application",
        "benefits",
      ],
    },
    sports: {
      name: "Sports & Fitness",
      subcategories: [
        "Exercise Equipment",
        "Sports Gear",
        "Outdoor",
        "Athletic Wear",
        "Supplements",
      ],
      fields: [
        "sport",
        "level",
        "material",
        "size",
        "weight",
        "features",
        "safety",
      ],
    },
  };

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProductData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSpecificationChange = (spec, value) => {
    setProductData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [spec]: value,
      },
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !productData.tags.includes(tagInput.trim())) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // In a real app, you would upload these files to a server
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const removeImage = (indexToRemove) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!productData.name || !productData.category || !productData.price) {
      alert("Please fill in all required fields (Name, Category, Price)");
      return;
    }

    console.log("Product Data:", productData);
    alert("Product uploaded successfully!");

    // Reset form
    setProductData({
      name: "",
      category: "",
      subcategory: "",
      brand: "",
      model: "",
      description: "",
      price: "",
      comparePrice: "",
      costPrice: "",
      sku: "",
      barcode: "",
      quantity: "",
      lowStockAlert: "",
      specifications: {},
      images: [],
      videos: [],
      tags: [],
      metaTitle: "",
      metaDescription: "",
      weight: "",
      dimensions: { length: "", width: "", height: "" },
      shippingClass: "",
      status: "draft",
      featured: false,
    });
    setCurrentStep(1);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const currentCategory = categories[productData.category];

  return (
    <div className="py-5 ">
      <div className=" mx-auto ">
        <div className=" rounded-lg shadow-lg overflow-hidden border-1 border-[#9ec49e]">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-yellow-300 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              Upload New Product
            </h1>
            <p className="text-blue-100 mt-2">
              Add detailed product information across multiple categories
            </p>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-6 border-b ">
            <div className="flex items-center justify-between ">
              {[
                {
                  step: 1,
                  title: "Basic Info",
                  desc: "Name, category, description",
                },
                {
                  step: 2,
                  title: "Details & Specs",
                  desc: "Specifications, pricing",
                },
                { step: 3, title: "Media & SEO", desc: "Images, tags, SEO" },
                {
                  step: 4,
                  title: "Shipping & Final",
                  desc: "Dimensions, review",
                },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= item.step
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {item.step}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={`font-medium ${
                        currentStep >= item.step
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <div
                      className={`hidden sm:block w-16 h-1 mx-4 ${
                        currentStep > item.step ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={productData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={productData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {Object.entries(categories).map(([key, cat]) => (
                        <option key={key} value={key}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {productData.category && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcategory
                      </label>
                      <select
                        value={productData.subcategory}
                        onChange={(e) =>
                          handleInputChange("subcategory", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Subcategory</option>
                        {currentCategory.subcategories.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={productData.brand}
                      onChange={(e) =>
                        handleInputChange("brand", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Brand name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model/Style
                    </label>
                    <input
                      type="text"
                      value={productData.model}
                      onChange={(e) =>
                        handleInputChange("model", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Model or style number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    value={productData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed product description..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details & Specifications */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Pricing & Specifications
                </h2>

                {/* Pricing */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Pricing & Inventory
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selling Price * ($)
                      </label>
                      <input
                        type="number"
                        value={productData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compare Price ($)
                      </label>
                      <input
                        type="number"
                        value={productData.comparePrice}
                        onChange={(e) =>
                          handleInputChange("comparePrice", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost Price ($)
                      </label>
                      <input
                        type="number"
                        value={productData.costPrice}
                        onChange={(e) =>
                          handleInputChange("costPrice", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={productData.sku}
                        onChange={(e) =>
                          handleInputChange("sku", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="SKU123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Barcode
                      </label>
                      <input
                        type="text"
                        value={productData.barcode}
                        onChange={(e) =>
                          handleInputChange("barcode", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="123456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={productData.quantity}
                        onChange={(e) =>
                          handleInputChange("quantity", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Low Stock Alert
                      </label>
                      <input
                        type="number"
                        value={productData.lowStockAlert}
                        onChange={(e) =>
                          handleInputChange("lowStockAlert", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>

                {/* Category-specific Specifications */}
                {currentCategory && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      {currentCategory.name} Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentCategory.fields.map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                            {field.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <input
                            type="text"
                            value={productData.specifications[field] || ""}
                            onChange={(e) =>
                              handleSpecificationChange(field, e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${field}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Media & SEO */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Media & SEO
                </h2>

                {/* Image Upload */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Product Images
                  </h3>
                  <div className="mb-4">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload multiple images (JPG, PNG, WebP)
                    </p>
                  </div>

                  {productData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {productData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter tag and press Add"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <button
                      onClick={addTag}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* SEO */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    SEO Optimization
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={productData.metaTitle}
                        onChange={(e) =>
                          handleInputChange("metaTitle", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="SEO-friendly title (50-60 characters)"
                        maxLength={60}
                      />
                      <p className="text-sm text-gray-500">
                        {productData.metaTitle.length}/60 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={productData.metaDescription}
                        onChange={(e) =>
                          handleInputChange("metaDescription", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="SEO meta description (150-160 characters)"
                        maxLength={160}
                        rows={3}
                      />
                      <p className="text-sm text-gray-500">
                        {productData.metaDescription.length}/160 characters
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Shipping & Final Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Shipping & Final Details
                </h2>

                {/* Shipping Details */}
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={productData.weight}
                        onChange={(e) =>
                          handleInputChange("weight", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Class
                      </label>
                      <select
                        value={productData.shippingClass}
                        onChange={(e) =>
                          handleInputChange("shippingClass", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="">Standard</option>
                        <option value="heavy">Heavy Items</option>
                        <option value="fragile">Fragile</option>
                        <option value="express">Express Shipping</option>
                        <option value="bulky">Bulky Items</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Dimensions (cm)
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Length
                        </label>
                        <input
                          type="number"
                          value={productData.dimensions.length}
                          onChange={(e) =>
                            handleInputChange(
                              "dimensions.length",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Width
                        </label>
                        <input
                          type="number"
                          value={productData.dimensions.width}
                          onChange={(e) =>
                            handleInputChange(
                              "dimensions.width",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Height
                        </label>
                        <input
                          type="number"
                          value={productData.dimensions.height}
                          onChange={(e) =>
                            handleInputChange(
                              "dimensions.height",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Status */}
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Publication Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={productData.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={productData.featured}
                        onChange={(e) =>
                          handleInputChange("featured", e.target.checked)
                        }
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="featured"
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        Mark as Featured Product
                      </label>
                    </div>
                  </div>
                </div>

                {/* Final Review Summary */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Product Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Name:</strong>{" "}
                      {productData.name || "Not specified"}
                    </div>
                    <div>
                      <strong>Category:</strong>{" "}
                      {currentCategory?.name || "Not specified"}
                    </div>
                    <div>
                      <strong>Price:</strong> ${productData.price || "0.00"}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {productData.quantity || "0"}
                    </div>
                    <div>
                      <strong>Images:</strong> {productData.images.length}{" "}
                      uploaded
                    </div>
                    <div>
                      <strong>Tags:</strong> {productData.tags.length} added
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex gap-3 ">
              <button
                onClick={() => {
                  setProductData({
                    name: "",
                    category: "",
                    subcategory: "",
                    brand: "",
                    model: "",
                    description: "",
                    price: "",
                    comparePrice: "",
                    costPrice: "",
                    sku: "",
                    barcode: "",
                    quantity: "",
                    lowStockAlert: "",
                    specifications: {},
                    images: [],
                    videos: [],
                    tags: [],
                    metaTitle: "",
                    metaDescription: "",
                    weight: "",
                    dimensions: { length: "", width: "", height: "" },
                    shippingClass: "",
                    status: "draft",
                    featured: false,
                  });
                  setCurrentStep(1);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Reset Form
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Next
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Upload Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
