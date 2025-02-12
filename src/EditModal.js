import React, { useState } from "react";
// Компонент редактирования
const EditModal = ({ seminar, onClose, onSave }) => {
  const [editedData, setEditedData] = useState({ ...seminar });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      errors.title = "Название обязательно";
    }

    // Валидация описания
    if (editedData.description === "") {
      errors.description = "Описание обязательно";
    }
    // Валидация количества
    if (editedData.count <= 0 || editedData.count == "") {
      errors.count = "Количество должно быть числом больше нуля";
    }

    // Валидация отзывов
    if (editedData.reviews < 0) {
      errors.reviews = "Количество отзывов должно быть неотрицательным числом";
    }
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
              required
            />
            {error.title && <span className="error">{error.title}</span>}
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
