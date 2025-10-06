import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="news" element={<h1>Tin tức</h1>} />
        <Route path="about" element={<h1>About</h1>} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
