import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import About from "./pages/About";  // Import About page
import { useState } from "react";
import FilterData from "./pages/FilterData";
import ProductDetail from "./pages/ProductDetail";
import TrackOrder from './pages/TrackOrder';  // Import the TrackOrder component


function App() {
  const [order, setOrder] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout setOrder={setOrder} />} />
        <Route path="/order-confirmation" element={<Order order={order} />} />
        <Route path="/filter-data" element={<FilterData />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> {/* Add About page route */}
        <Route path="/track-order/:orderNumber" element={<TrackOrder />} /> {/* Add route for TrackOrder */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
