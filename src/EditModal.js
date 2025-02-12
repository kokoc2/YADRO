import React, { useState } from "react";
// Компонент редактирования
const EditModal = ({ seminar, onClose, onSave }) => {
  const [editedData, setEditedData] = useState({ ...seminar });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...setEditedData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const errors = validateForm(editedData);
    if (Object.keys(errors).length > 0) {
      setError("Пожалуйста, исправьте ошибки в форме.");
      setLoading(false);
      return; // Прерываем выполнение, если есть ошибки
    }
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

  const validateForm = (editedData) => {
    const errors = {};

    // Валидация названия
    if (editedData.title === "") {
      errors.title = "Введите название";
    }

    // Валидация описания
    if (editedData.description === "") {
      errors.description = "Введите описание";
    }
    // Валидация количества проданного товара
    if (editedData.count <= 0 || editedData.count == "") {
      errors.count = "Количество не может быть меньше 0";
    }

    // Валидация количества отзывов отзывов
    if (editedData.reviews <= 0 || editedData.reviews == "") {
      errors.reviews = "Количество отзывов не может быть меньше 0";
    }
    setErrors(errors);
    return errors;
  };

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
              // required
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={editedData.description}
              onChange={handleChange}
              // required
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Количество:</label>
              <input
                type="text"
                name="count"
                value={editedData.count}
                onChange={handleChange}
              />
              {errors.count && (
                <span className="error-message">{errors.count}</span>
              )}
            </div>

            <div className="form-group">
              <label>Отзывы:</label>
              <input
                type="text"
                name="reviews"
                value={editedData.reviews}
                onChange={handleChange}
                // required
              />
              {errors.reviews && (
                <span className="error-message">{errors.reviews}</span>
              )}
            </div>
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
            <button className="save-button" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
