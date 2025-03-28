// Оголошуємо об'єкт для зберігання даних форми
const formData = {
    email: '',
    message: ''
  };
  
  // Задаємо ключ для локального сховища
  const STORAGE_KEY = 'feedback-form-state';
  
  // Функція для збереження даних у локальне сховище
  const saveFormData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };
  
  // Подія для відстеження змін в інпуті форми
  document.querySelector('.feedback-form').addEventListener('input', (e) => {
    // Оновлюємо значення об'єкта formData
    const { name, value } = e.target;
    if (name === 'email') {
      formData.email = value.trim();
    } else if (name === 'message') {
      formData.message = value.trim();
    }
  
    // Зберігаємо нові дані в локальне сховище
    saveFormData();
  });
  
  // Функція для заповнення форми при завантаженні сторінки
  const loadFormData = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';
  
      // Заповнюємо поля форми значеннями з локального сховища
      document.querySelector('[name="email"]').value = formData.email;
      document.querySelector('[name="message"]').value = formData.message;
    }
  };
  
  // Завантажуємо дані при завантаженні сторінки
  document.addEventListener('DOMContentLoaded', loadFormData);
  
  // Обробка події відправки форми
  document.querySelector('.feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Перевірка, чи заповнені всі поля
    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
    } else {
      // Виводимо об'єкт formData в консоль
      console.log(formData);
  
      // Очищаємо локальне сховище та форму
      localStorage.removeItem(STORAGE_KEY);
      formData.email = '';
      formData.message = '';
      document.querySelector('.feedback-form').reset();
    }
  });
  