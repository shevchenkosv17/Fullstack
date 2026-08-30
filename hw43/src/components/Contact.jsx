import { useNavigate } from 'react-router';

export default function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Дякуємо! Заявку на консультацію та тест-драйв Iveco eDaily успішно відправлено. Менеджер звʼяжеться з вами.');
    navigate('/');
  };

  return (
    <div>
      <h1 style={{ lineHeight: '1.3', marginBottom: '20px' }}>Замовити презентацію Iveco Green Power</h1>
      <p>Залиште заявку, щоб отримати індивідуальний розрахунок вартості володіння (TCO) та записатися на демонстрацію екологічного транспорту.</p>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '350px' }}>
        <label>
          Назва компанії або ім'я:
          <input type="text" required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} />
        </label>
        <label>
          Контактний телефон:
          <input type="tel" placeholder="+380" required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} />
        </label>
        <button type="submit" style={{ padding: '10px', background: '#0056b3', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Надіслати запит
        </button>
      </form>
    </div>
  );
}
