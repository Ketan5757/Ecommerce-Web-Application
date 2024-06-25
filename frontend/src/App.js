import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Footer from "./Components/Footer/Footer";
import AdminLogin from "./Pages/AdminLogin";
import Dashboard from "./Pages/Dashboard";
import Catalogue from "./Pages/Catalogue";
import Checkout from './Components/Checkout/Checkout'
import Register from "./Pages/Register";
import { AuthProvider } from "./Context/AuthContext";

function App() {
    
	return (
		<AuthProvider>
	
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Shop />} />
					{/* <Route path='/mens' element={<ShopCategory category="men"/>}/>
        <Route path='/womens' element={<ShopCategory category="women"/>}/>
        <Route path='/kids' element={<ShopCategory category="kid"/>}/> */}
					<Route path="/product" element={<Product />}>
						<Route path=":productId" element={<Product />} />
					</Route>
					<Route path="/cart" element={<Cart />} />
					<Route path="/catalogue" element={<Catalogue />}>
						<Route path=":category" element={<Catalogue />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/admin" element={<AdminLogin />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path='/Checkout' element={<Checkout/>}/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
		</AuthProvider>
	);
}

export default App;
