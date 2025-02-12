import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Product from "./Product.js";
import ProductInfo from "./ProductInfo.js";
function App() {
  return (
    <Router>
      <Routes>
        {/* Отрисовываем компонент со списком товара*/}
        <Route path="/" element={<Product />} />

        {/* Страница с деталями семинара */}
        <Route path="/Подробнее/:id" element={<ProductInfo />} />
      </Routes>
    </Router>
  );
}
export default App;
