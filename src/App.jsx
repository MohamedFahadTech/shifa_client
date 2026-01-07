import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/LayoutPage";
import Dashboard from "./pages/Dashboard";
import LaundryOrder from "./pages/LaundryOrder";
import Customer from "./pages/Customer";
import Pickup from "./pages/Pickup";
import Subscription from "./pages/Subscription";
import Delivery from "./pages/Delivery";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import MyOrder from "./pages/MyOrder";


function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/layout/*" element={<Layout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="laundryOrder" element={<LaundryOrder />} />
					<Route path="customer" element={<Customer />} />
					<Route path="pickup" element={<Pickup />} />
					<Route path="subscriptions" element={<Subscription />} />
					<Route path="delivery" element={<Delivery />} />
					<Route path="Analytics" element={<Analytics />} />
					<Route path="home" element={<Home />} />
					<Route path="bookings" element={<Booking />} />
					<Route path="myOrders" element={<MyOrder />} />
					
				</Route>
			</Routes>
		</Router>
	);
}

export default App;