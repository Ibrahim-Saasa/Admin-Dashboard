import React, { useState, useEffect } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: null,
      customer: "John Smith",
      product: 'Apple MacBook Pro 17"',
      category: "Laptop",
      price: "$2999",
      status: "Completed",
    },
    {
      id: null,
      customer: "Sarah Johnson",
      product: "Microsoft Surface Pro",
      category: "Laptop PC",
      price: "$1999",
      status: "Processing",
    },
    {
      id: null,
      customer: "Mike Davis",
      product: "Magic Mouse 2",
      category: "Accessories",
      price: "$99",
      status: "Shipped",
    },
    {
      id: null,
      customer: "Emma Wilson",
      product: "Google Pixel Phone",
      category: "Phone",
      price: "$799",
      status: "Pending",
    },
    {
      id: null,
      customer: "Alex Brown",
      product: "Apple Watch 5",
      category: "Wearables",
      price: "$999",
      status: "Completed",
    },
  ]);

  const [orderIdFormat, setOrderIdFormat] = useState("ORD");
  const [idLength, setIdLength] = useState(6);

  // Order ID generation functions
  const generateOrderId = (prefix = "ORD", length = 6) => {
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(Math.random() * Math.pow(10, length - 4))
      .toString()
      .padStart(length - 4, "0");
    return `${prefix}-${timestamp}${randomNum}`;
  };

  const generateUniqueOrderId = () => {
    let newId;
    const existingIds = orders.map((order) => order.id).filter((id) => id);

    do {
      newId = generateOrderId(orderIdFormat, idLength);
    } while (existingIds.includes(newId));

    return newId;
  };

  // Status color mapping
  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-green-100 text-green-800",
      Processing: "bg-yellow-100 text-yellow-800",
      Shipped: "bg-blue-100 text-blue-800",
      Pending: "bg-gray-100 text-gray-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Initialize order IDs when component mounts or when format changes
  useEffect(() => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        id: order.id ? order.id : generateUniqueOrderId(),
      }))
    );
  }, []);

  // Regenerate all order IDs
  const regenerateAllOrderIds = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        id: generateUniqueOrderId(),
      }))
    );
  };

  // Add new order
  const addNewOrder = () => {
    const customers = [
      "Alice Cooper",
      "Bob Martin",
      "Carol White",
      "David Lee",
      "Eva Garcia",
    ];
    const products = [
      "iPhone 15",
      "Samsung Galaxy Tab",
      "Sony Headphones",
      "Dell Monitor",
      "Logitech Keyboard",
    ];
    const categories = ["Phone", "Tablet", "Audio", "Monitor", "Accessories"];
    const statuses = ["Pending", "Processing", "Shipped"];

    const randomCustomer =
      customers[Math.floor(Math.random() * customers.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomPrice = `$${Math.floor(Math.random() * 2000 + 100)}`;

    const newOrder = {
      id: generateUniqueOrderId(),
      customer: randomCustomer,
      product: randomProduct,
      category: randomCategory,
      price: randomPrice,
      status: randomStatus,
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  // Edit order
  const editOrder = (index) => {
    const order = orders[index];
    const newCustomer = prompt("Edit customer name:", order.customer);
    if (newCustomer) {
      setOrders((prevOrders) =>
        prevOrders.map((order, i) =>
          i === index ? { ...order, customer: newCustomer } : order
        )
      );
    }
  };

  // Delete order
  const deleteOrder = (index) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-full mx-auto glass !rounded-lg shadow-lg">
      <div className="!rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Order Management Dashboard
          </h1>
          <button
            onClick={addNewOrder}
            className="border-2 border-[#9ec49e] titanium-btn !text-black px-4 py-2 rounded-lg transition-colors"
          >
            Add New Order
          </button>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Order ID Format:
            </label>
            <select
              value={orderIdFormat}
              onChange={(e) => setOrderIdFormat(e.target.value)}
              className="px-3 py-1 border rounded"
            >
              <option value="ORD">ORD-XXXXXX</option>
              <option value="INV">INV-XXXXXX</option>
              <option value="PO">PO-XXXXXX</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              ID Length:
            </label>
            <input
              type="number"
              value={idLength}
              onChange={(e) => setIdLength(parseInt(e.target.value) || 6)}
              min="4"
              max="10"
              className="px-2 py-1 border rounded w-16"
            />
          </div>
          <button
            onClick={regenerateAllOrderIds}
            className="titanium-btn hover:bg-[#799c79] !text-black px-3 py-1 rounded text-sm transition-colors"
          >
            Regenerate All IDs
          </button>
        </div>

        <div className="max-w-full mx-auto glass rounded-md shadow-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-md titanium-btn border-t border-[#000]">
              <tr className="border-b border-[#000] !text-black">
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Items
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-b border-[#9ec49e]">
                  <td className="px-6 py-4 font-medium !text-gray-900 font-mono">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{order.product}</div>
                      <div className="text-xs text-gray-500">
                        {order.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">{order.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editOrder(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOrder(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
