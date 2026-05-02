// import React from "react";
// import Navbar from "./component/navbar";
// import Footer from "./component/footer";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Contact from "./pages/contact";
// import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import Home from "./pages/home";
// import Login from "./pages/login";
// import About from "./pages/about";
// import Products from "./pages/product";
// import Cart from "./pages/cart";
// import Signin from "./pages/signin";
// import { AuthProvider} from '../src/context/authcontext'
// import { ToastProvider} from '../src/context/ToastContext'
// function App() {
//   return (
//     <>  
//     <BrowserRouter>
//   <ToastContainer>
//     <AuthProvider>
//         <Navbar/>
//     <Routes>
//        <Route path="/" element={<Home/>}/>
//       <Route path="/products" element={<Products/>}/>

//       <Route path="/contact" element={<Contact/>}/>
//             <Route path="/signin" element={<Signin/>}/>
//                         <Route path="/about" element={<About/>}/>
//                                                 <Route path="/cart" element={<Cart/>}/>



//     </Routes>
//     <ToastContainer/>
//     <Footer/>
//     </AuthProvider>
//   </ToastContainer>
  
//     </BrowserRouter>
    
//     {/* <Navbar/> */}
//      {/* <Hero/>
//      <Sale/>
//     <images/>
//     <Categories/>
//     <Featured/>
//     <Footer/>
//     <Contact/> */}
//     </>

//   );
// }

// export default App;


import React from "react";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Contact from "./pages/contact";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Products from "./pages/product";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Payment from "./pages/payment";
import MyOrders from "./pages/myorder";
import OrderTracking from "./pages/orderTracking";
import Wishlist from "./pages/wishlist";
import UserDashboard from "./pages/userdashboard";
import UserProfile from "./pages/userprofile";

import { AuthProvider } from "./context/authcontext";
import { WishlistProvider } from "./context/WishlistContext";

import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<UserProfile />} />

            <Route path="/admindashboard" element={<AdminDashboard />} />
          </Routes>

          <Footer />
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;
