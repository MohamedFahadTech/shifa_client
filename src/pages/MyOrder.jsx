import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Package,
	Calendar,
	Phone,
	ChevronRight,
	Tag
} from "lucide-react"; 

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

	// Status Badge Logic matching the "Logistics" feel
	const getStatusConfig = (status) => {
		const s = status?.toLowerCase();
		if (s === "delivered" || s === "completed")
			return { text: "Completed", color: "text-emerald-500", bg: "bg-emerald-50" };
		if (s === "pending" || s === "processing")
			return { text: "In Progress", color: "text-amber-500", bg: "bg-amber-50" };
		if (s === "cancelled")
			return { text: "Cancelled", color: "text-rose-500", bg: "bg-rose-50" };
		return { text: status, color: "text-blue-500", bg: "bg-blue-50" };
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F6C453]"></div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto space-y-8 p-4">
			{/* HEADER SECTION - Matches PickupPage */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h3 className="text-3xl font-black text-[#0B0C0F] italic leading-tight uppercase">
						Order <span className="text-[#F6C453] not-italic">History</span>
					</h3>
					<p className="text-gray-500 text-sm font-medium">Track your service requests and transaction logs.</p>
				</div>

				<div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
					<div className="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center">
						<Phone className="h-4 w-4 text-[#F6C453]" />
					</div>
					<div>
						<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">USER ID</p>
						<p className="text-sm font-bold text-[#0B0C0F]">{phoneNo || "Guest"}</p>
					</div>
				</div>
			</div>

			{orders.length === 0 ? (
				<div className="border-2 border-dashed border-gray-200 rounded-[32px] py-20 flex flex-col items-center justify-center text-gray-400">
					<Package className="h-12 w-12 mb-4 opacity-20" />
					<span className="text-sm font-bold uppercase tracking-widest text-gray-300">No Orders Found</span>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{orders.map((order) => {
						const status = getStatusConfig(order.status);
						return (
							<div
								key={order._id}
								className="group bg-white p-6 rounded-[32px] border border-gray-100 hover:border-[#F6C453] transition-all hover:shadow-xl hover:shadow-[#F6C453]/5 flex flex-col"
							>
								{/* Top Row: Order ID & Date */}
								<div className="flex justify-between items-start mb-6">
									<div>
										<span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
											Transaction ID
										</span>
										<span className="text-sm font-mono font-bold text-[#0B0C0F] bg-gray-50 px-2 py-1 rounded">
											#{order._id.slice(-10).toUpperCase()}
										</span>
									</div>
									<div className="text-right">
										<div className="flex items-center text-xs font-black text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 mb-2">
											<Calendar className="h-3 w-3 mr-1 text-[#F6C453]" />
											{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
										</div>
										<span className={`text-[10px] font-bold uppercase block tracking-tighter ${status.color}`}>
											● {status.text}
										</span>
									</div>
								</div>

								{/* Items Section */}
								<div className="mb-6 space-y-3">
									<div className="flex items-center gap-2">
										<Tag className="h-3 w-3 text-gray-400" />
										<span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Services Rendered</span>
									</div>
									<div className="grid grid-cols-1 gap-2">
										{order.items.map((item, index) => (
											<div key={index} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
												<span className="text-sm font-bold text-[#0B0C0F]">{item.category}</span>
												<span className="text-[10px] font-black bg-[#F6C453] text-[#0B0C0F] px-2 py-0.5 rounded uppercase">
													Qty: {item.quantity}
												</span>
											</div>
										))}
									</div>
								</div>

								{/* Action Bar / Footer */}
								<div className="mt-auto pt-5 border-t border-gray-100 flex justify-end items-center">
									<div className="flex flex-col">
										<span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Bill</span>
										<span className="text-xl font-black text-[#0B0C0F]">₹{order.totalAmount}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default MyOrder;