import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
	Squares2X2Icon,
	ShoppingBagIcon,
	UserGroupIcon,
	ChartBarIcon,
	Cog6ToothIcon,
	ArrowLeftOnRectangleIcon,
	Bars3Icon,
	BellIcon,
	MagnifyingGlassIcon,
	TruckIcon,
	MapPinIcon,
	TicketIcon,
	ClipboardDocumentCheckIcon,
	AcademicCapIcon,
	QueueListIcon,
} from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";



const SidebarItem = ({ to, icon: Icon, label, onClick }) => (
	<NavLink
		to={to}
		onClick={onClick}
		className={({ isActive }) => `
      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
      ${isActive
				? "bg-[#F6C453] text-[#0B0C0F] font-bold shadow-lg shadow-[#F6C453]/20"
				: "text-gray-400 hover:bg-white/5 hover:text-white"}
    `}
	>
		<Icon className="h-5 w-5 shrink-0" />
		<span className="text-[15px] tracking-tight">{label}</span>
	</NavLink>
);

const DashboardLayout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const role = sessionStorage.getItem("role"); // "user" or "admin"
	const MENU_ITEMS = [
		{
			to: "/layout/dashboard",
			icon: Squares2X2Icon,
			label: "Dashboard",
			roles: ["admin"],
		},
		{
			to: "/layout/laundryOrder",
			icon: ShoppingBagIcon,
			label: "Laundry Orders",
			roles: ["admin"],
		},
		{
			to: "/layout/customer",
			icon: UserGroupIcon,
			label: "Customers",
			roles: ["admin"],
		},
		{
			to: "/reports",
			icon: ChartBarIcon,
			label: "Analytics",
			roles: ["admin"],
		},
		{
			to: "/layout/pickup",
			icon: MapPinIcon,
			label: "Pickups",
			roles: ["admin"],
		},
		{
			to: "/layout/delivery",
			icon: TruckIcon,
			label: "Deliveries",
			roles: ["admin"],
		},
		{
			to: "/layout/myOrders",
			icon: ClipboardDocumentCheckIcon,
			label: "My Orders",
			roles: [ "user"],
		},
		{
			to: "/layout/bookings",
			icon: ClipboardDocumentListIcon,
			label: "Bookings",
			roles: ["admin", "user"],
		},
		
		
		{
			to: "/layout/settings",
			icon: TruckIcon,
			label: "Pickup & Delivery",
			roles: ["admin", "user"],
		},
		

	];

	const handleLogout = () => {
		sessionStorage.clear();
		navigate("/");
	};



	return (
		<div className="flex h-screen bg-[#F8F9FA] text-[#0B0C0F] overflow-hidden">

			{/* --- SIDEBAR (Matches Login Left Side) --- */}
			<aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0B0C0F] transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
				<div className="flex flex-col h-full px-6 py-8">
					{/* Logo Section */}
					<div className="mb-10 px-2">
						<h1 className="text-xl font-bold tracking-tighter text-white uppercase italic">
							Shifa <span className="text-[#F6C453] not-italic">Laundry</span>
						</h1>
						<div className="mt-2 flex space-x-1">
							<span className="h-1 w-8 bg-[#F6C453] rounded-full"></span>
							<span className="h-1 w-2 bg-[#F6C453]/30 rounded-full"></span>
						</div>
					</div>

					{/* Navigation Links */}
					<div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 px-4">
						Internal Console
					</div>
					<nav className="flex-1 space-y-2">
						{MENU_ITEMS
							.filter(item => item.roles.includes(role))
							.map(item => (
								<SidebarItem
									key={item.to}
									to={item.to}
									icon={item.icon}
									label={item.label}
									onClick={() => setIsMobileMenuOpen(false)}
								/>
							))}
					</nav>


					{/* Bottom Section */}
					<div className="pt-6 border-t border-white/10 space-y-2">
						<button
							onClick={handleLogout}
							className="flex items-center space-x-3 px-4 py-3 w-full text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all group"
						>
							<ArrowLeftOnRectangleIcon className="h-5 w-5" />
							<span className="text-[15px] font-semibold tracking-tight">Sign Out</span>
						</button>

					</div>
				</div>
			</aside>

			{/* --- MAIN CONTENT AREA (Matches Login Right Side) --- */}
			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">

				{/* Top Header */}
				<header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
					<div className="flex items-center gap-4">
						<button
							className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
							onClick={() => setIsMobileMenuOpen(true)}
						>
							<Bars3Icon className="h-6 w-6" />
						</button>

						{/* Subtle Search */}
						<div className="hidden md:flex relative w-72">
							<MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search command..."
								className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#F6C453] outline-none transition-all"
							/>
						</div>
					</div>

					{/* Right Actions */}
					<div className="flex items-center space-x-6">
						<button className="relative p-2 text-gray-500 hover:text-[#0B0C0F] transition-colors">
							<BellIcon className="h-6 w-6" />
							<span className="absolute top-2 right-2 h-2 w-2 bg-[#F6C453] rounded-full border-2 border-white"></span>
						</button>

						<div className="flex items-center space-x-4">
							<div className="text-right hidden sm:block">
								<p className="text-sm font-bold text-[#0B0C0F]">Admin User</p>
								<p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Tier</p>
							</div>
							<div className="h-10 w-10 rounded-full border-2 border-[#F6C453] p-0.5 shadow-sm">
								<img
									src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
									alt="Avatar"
									className="rounded-full bg-gray-100"
								/>
							</div>
						</div>
					</div>
				</header>

				{/* Dynamic Page Content */}
				<main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-8">
					<div className="max-w-7xl mx-auto">
						{/* The actual page content loads here */}
						<div className="bg-white rounded-[32px] border border-gray-200 p-8 shadow-sm min-h-[60vh]">
							<Outlet />
						</div>
					</div>
				</main>
			</div>

			{/* Mobile Backdrop */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-[#0B0C0F]/60 backdrop-blur-sm z-40 lg:hidden transition-all"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}
		</div>
	);
};

export default DashboardLayout;