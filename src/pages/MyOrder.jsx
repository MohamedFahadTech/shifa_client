import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Calendar, Phone, ChevronRight } from "lucide-react"; // Using lucide-react for professional icons

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const phoneNo = sessionStorage.getItem("phoneno");

  useEffect(() => {
    if (!phoneNo) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/orders/user/${phoneNo}`)
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Order Fetch Error:", err);
      })
      .finally(() => setLoading(false));
  }, [phoneNo]);

  // Helper function for status styling
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered" || s === "completed") return "bg-green-100 text-green-700 border-green-200";
    if (s === "pending" || s === "processing") return "bg-amber-100 text-amber-700 border-amber-200";
    if (s === "cancelled") return "bg-red-100 text-red-700 border-red-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1">Track and manage your recent service requests</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
           <p className="text-xs text-gray-400 uppercase font-bold">Account</p>
           <p className="text-sm font-medium text-gray-700">{phoneNo || "Guest"}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
          <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="text-gray-500">When you place an order, it will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header: ID and Status */}
              <div className="px-6 py-4 border-b border-gray-50 flex flex-wrap items-center justify-between bg-white">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</span>
                    <p className="text-sm font-mono font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)} uppercase tracking-wide`}>
                  {order.status}
                </span>
              </div>

              {/* Body: Details */}
              <div className="p-6 grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone size={16} className="mr-2" />
                    <span>{order.phoneNo}</span>
                  </div>
                </div>

                <div className="md:col-span-1 border-l border-r border-gray-100 px-0 md:px-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Service Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 font-medium">{item.category}</span>
                        <span className="text-gray-400 text-xs">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-end">
                  <span className="text-xs font-bold text-gray-400 uppercase">Total Amount</span>
                  <span className="text-2xl font-black text-gray-900">₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Footer: Quick Actions */}
              <div className="px-6 py-3 bg-gray-50 flex justify-end items-center border-t border-gray-100">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center transition-colors">
                  View Details <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;