import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Product from "./Product.js";
import ProductInfo from "./ProductInfo.js";
function App() {
  return (
    <Router>
      <Routes>
        {/* Отрисовываем компонент со списком товаров*/}
        <Route path="/" element={<Product />} />

        {/* Страница с подробным описаанием */}
        <Route path="/Подробнее/:id" element={<ProductInfo />} />
      </Routes>
    </Router>
  );
}
export default App;
