import React, { useState } from "react";
// Компонент редактирования
const EditModal = ({ seminar, onClose, onSave }) => {
  const [editedData, setEditedData] = useState({ ...seminar });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://67aca4193f5a4e1477db5202.mockapi.io/YADRO/${seminar.id}`,
        {
          method: "PUT", // Используем PUT для обновления
          headers: {
            "Content-Type": "application/json", // Указываем тип содержимого
          },
          body: JSON.stringify(editedData), // Преобразуем данные в JSON
        }
      );

      if (!response.ok) {
        throw new Error(
          `Ошибка сервера: ${response.status} ${response.statusText}`
        );
      }

      const updatedSeminar = await response.json(); // Получаем обновленные данные с сервера
      onSave(updatedSeminar); // Передаем обновленные данные в родительский компонент
      onClose(); // Закрываем модальное окно
    } catch (err) {
      setError(`Ошибка сохранения изменений: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Валидация названия
    if (!editedData.title) {
      newErrors.title = "Название обязательно1111111111111111111111111111";
    }

    // Валидация описания
    if (!editedData.description) {
      newErrors.description = "Описание обязательно";
    }

    // Валидация количества
    if (isNaN(editedData.count) || editedData.count <= 0) {
      newErrors.count = "Количество должно быть числом больше нуля";
    }

    // Валидация отзывов
    if (isNaN(editedData.reviews) || editedData.reviews < 0) {
      newErrors.reviews =
        "Количество отзывов должно быть неотрицательным числом";
    }

    // Валидация URL картинки
    /*     const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!editedData.imageUrl || !urlPattern.test(editedData.imageUrl)) {
      newErrors.imageUrl = "Введите корректный URL";
    } */

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Возвращает true, если ошибок нет
  };

  /*  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(editedData); // Сохраняем данные, если валидация прошла успешно
      onClose(); // Закрываем модальное окно
    }
  }; */
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактирование продукта</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              name="title"
              value={editedData.title}
              onChange={handleChange}
              required
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={editedData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Количество:</label>
              <input
                type="text"
                name="count"
                value={editedData.count}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Отзывы:</label>
              <input
                type="text"
                name="reviews"
                value={editedData.reviews}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL фото:</label>
            <input
              type="url"
              name="photo"
              value={editedData.photo}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </button>
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
