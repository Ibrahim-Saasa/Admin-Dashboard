import React, { useState } from "react";
import banner1 from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";
import banner3 from "../../assets/banner-3.png";
import banner4 from "../../assets/banner-4.png";
import banner5 from "../../assets/banner-5.png";
import ad1 from "../../assets/banner-1.png";
import ad2 from "../../assets/banner-1.png";
import ad3 from "../../assets/banner-1.png";
import ad4 from "../../assets/banner-1.png";
import ad5 from "../../assets/banner-1.png";
import ad6 from "../../assets/banner-1.png";

const BannerAdsManager = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Summer Sale 2024",
      description: "Up to 70% off on summer collection. Limited time offer!",
      imageUrl: banner1,
      position: "hero",
      status: "active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      clickCount: 1247,
      ctaText: "Shop Now",
      ctaLink: "/summer-sale",
      priority: 1,
      targetAudience: "all",
      createdAt: "2024-05-15",
    },
    {
      id: 2,
      title: "New Electronics Collection",
      description: "Discover the latest smartphones, laptops, and gadgets.",
      imageUrl: banner2,
      position: "sidebar",
      status: "active",
      startDate: "2024-07-01",
      endDate: "2024-12-31",
      clickCount: 892,
      ctaText: "Explore",
      ctaLink: "/electronics",
      priority: 2,
      targetAudience: "tech-enthusiasts",
      createdAt: "2024-06-20",
    },
    {
      id: 3,
      title: "Fashion Week Special",
      description: "Trendy fashion items with exclusive discounts.",
      imageUrl: banner3,
      position: "category",
      status: "scheduled",
      startDate: "2024-09-15",
      endDate: "2024-09-30",
      clickCount: 0,
      ctaText: "View Collection",
      ctaLink: "/fashion",
      priority: 1,
      targetAudience: "fashion-lovers",
      createdAt: "2024-07-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [currentBanner, setCurrentBanner] = useState({
    title: "",
    description: "",
    imageUrl: "",
    position: "hero",
    status: "draft",
    startDate: "",
    endDate: "",
    ctaText: "",
    ctaLink: "",
    priority: 1,
    targetAudience: "all",
  });

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const positions = {
    hero: "Hero Banner",
    sidebar: "Sidebar Ad",
    category: "Category Banner",
    popup: "Popup Ad",
    footer: "Footer Banner",
    product: "Product Page Ad",
  };

  const audiences = {
    all: "All Users",
    "new-users": "New Users",
    "returning-users": "Returning Users",
    "tech-enthusiasts": "Tech Enthusiasts",
    "fashion-lovers": "Fashion Lovers",
    "mobile-users": "Mobile Users",
  };

  const filteredBanners = banners.filter((banner) => {
    const matchesSearch =
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || banner.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddBanner = () => {
    setEditingBanner(null);
    setCurrentBanner({
      title: "",
      description: "",
      imageUrl: "",
      position: "hero",
      status: "draft",
      startDate: "",
      endDate: "",
      ctaText: "",
      ctaLink: "",
      priority: 1,
      targetAudience: "all",
    });
    setShowModal(true);
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner.id);
    setCurrentBanner({ ...banner });
    setShowModal(true);
  };

  const handleSaveBanner = () => {
    if (!currentBanner.title || !currentBanner.description) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingBanner) {
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === editingBanner
            ? { ...currentBanner, id: editingBanner }
            : banner
        )
      );
    } else {
      const newBanner = {
        ...currentBanner,
        id: Math.max(...banners.map((b) => b.id)) + 1,
        clickCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setBanners((prev) => [newBanner, ...prev]);
    }

    setShowModal(false);
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners((prev) => prev.filter((banner) => banner.id !== id));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server
      const imageUrl = URL.createObjectURL(file);
      setCurrentBanner((prev) => ({ ...prev, imageUrl }));
    }
  };

  const duplicateBanner = (banner) => {
    const duplicated = {
      ...banner,
      id: Math.max(...banners.map((b) => b.id)) + 1,
      title: `${banner.title} (Copy)`,
      status: "draft",
      clickCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setBanners((prev) => [duplicated, ...prev]);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      draft: "bg-gray-100 text-gray-800",
      scheduled: "bg-blue-100 text-blue-800",
      expired: "bg-red-100 text-red-800",
      paused: "bg-yellow-100 text-yellow-800",
    };
    return styles[status] || styles.draft;
  };

  const stats = {
    total: banners.length,
    active: banners.filter((b) => b.status === "active").length,
    scheduled: banners.filter((b) => b.status === "scheduled").length,
    totalClicks: banners.reduce((sum, b) => sum + b.clickCount, 0),
  };

  return (
    <div className="min-h-screen glass">
      {/* Header */}
      <div className=" shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Banner & Ads Manager
              </h1>
              <p className="text-gray-600 mt-1">
                Manage promotional banners and advertisements
              </p>
            </div>
            <button
              onClick={handleAddBanner}
              className="flex items-center gap-2 titanium cursor-pointer !text-black px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Banner
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="titanium p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Banners
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="titanium p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Banners
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="titanium p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.scheduled}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="titanium p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Clicks
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.totalClicks.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="titanium p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <svg
                  className="absolute left-3 top-3 h-4 w-4 !text-black"
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
                <input
                  type="text"
                  placeholder="Search banners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-black"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 !text-black rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="paused">Paused</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div className="text-sm !text-black">
              Showing {filteredBanners.length} of {banners.length} banners
            </div>
          </div>
        </div>

        {/* Banners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBanners.map((banner) => (
            <div
              key={banner.id}
              className="titanium rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Banner Image */}
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      banner.status
                    )}`}
                  >
                    {banner.status}
                  </span>
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full">
                    {positions[banner.position]}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleEditBanner(banner)}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-colors"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Banner Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">
                    {banner.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 ml-2">
                    #{banner.priority}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {banner.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Clicks:</span>
                    <span className="font-medium text-gray-900">
                      {banner.clickCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Audience:</span>
                    <span className="text-gray-900">
                      {audiences[banner.targetAudience]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-gray-900">
                      {banner.startDate} - {banner.endDate}
                    </span>
                  </div>
                </div>

                {banner.ctaText && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">
                      Call to Action:
                    </div>
                    <div className="font-medium text-sm text-blue-600">
                      "{banner.ctaText}" → {banner.ctaLink}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditBanner(banner)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => duplicateBanner(banner)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm transition-colors"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm transition-colors"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBanners.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 !text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No banners found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first banner or adjust your search
              filters.
            </p>
            <button
              onClick={handleAddBanner}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Create Banner
            </button>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Banner */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="titanium rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingBanner ? "Edit Banner" : "Add New Banner"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Title *
                  </label>
                  <input
                    type="text"
                    value={currentBanner.title}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter banner title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={currentBanner.description}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter banner description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <select
                    value={currentBanner.position}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(positions).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={currentBanner.status}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={currentBanner.startDate}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={currentBanner.endDate}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                  />
                  {currentBanner.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={currentBanner.imageUrl}
                        alt="Banner preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">
                  Call to Action
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Text
                    </label>
                    <input
                      type="text"
                      value={currentBanner.ctaText}
                      onChange={(e) =>
                        setCurrentBanner((prev) => ({
                          ...prev,
                          ctaText: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Shop Now, Learn More"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Link
                    </label>
                    <input
                      type="text"
                      value={currentBanner.ctaLink}
                      onChange={(e) =>
                        setCurrentBanner((prev) => ({
                          ...prev,
                          ctaLink: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="/sale, /products, https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={currentBanner.priority}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        priority: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>High (1)</option>
                    <option value={2}>Medium (2)</option>
                    <option value={3}>Low (3)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <select
                    value={currentBanner.targetAudience}
                    onChange={(e) =>
                      setCurrentBanner((prev) => ({
                        ...prev,
                        targetAudience: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(audiences).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBanner}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {editingBanner ? "Update Banner" : "Create Banner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerAdsManager;
