import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";

function ProductInfo() {
  const { id } = useParams(); // Получаем id из URL
  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Загружаем данные о семинаре по его id
    fetch(`https://67aca4193f5a4e1477db5202.mockapi.io/YADRO/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        return response.json();
      })
      .then((data) => {
        setSeminar(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="seminar-details">
      <div className="FlexName">
        <h2>
          <Link to="/" className="path">
            Назад к списку /
          </Link>
        </h2>
        <h2> &nbsp;{seminar.title}</h2>
      </div>

      <p className="name2">{seminar.name2}</p>
      <p>{seminar.description}</p>
      <h2>Свяжитесь с нами!</h2>
      {/* Кнопка для возврата к списку семинаров */}
      <Link to="/">
        <button className="edit-button">Назад к списку</button>
      </Link>
    </div>
  );
}

export default ProductInfo;
