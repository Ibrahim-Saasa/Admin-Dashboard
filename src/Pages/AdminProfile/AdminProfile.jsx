import { useContext, useState, useEffect } from "react";
import { editData } from "../../utils/api";
import { MyContext } from "../../App";

const AdminProfile = () => {
  const { admin, setAdmin } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    country: "",
  });

  // ✅ Load admin data on mount
  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || "",
        phone: admin.phone || "",
        age: admin.age || "",
        country: admin.country || "",
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting:", formData);

      const res = await editData("/api/admin/profile", formData);

      console.log("Response:", res);

      if (res.success) {
        // ✅ Update context with new admin data
        const updatedAdmin = {
          ...admin,
          ...res.admin,
        };
        setAdmin(updatedAdmin);

        // ✅ Update sessionStorage
        sessionStorage.setItem("adminData", JSON.stringify(updatedAdmin));

        alert("Profile updated successfully!");
      } else {
        alert(res.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed: " + (err.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-6 glass rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your country"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full titanium-btn py-2 rounded-lg disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
