import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTruckData } from '../redux/appSlice';

export default function GrandChild() {
  const theme = useSelector((state) => state.app.theme);
  const truck = useSelector((state) => state.app.truck);
  const loading = useSelector((state) => state.app.loading);
  const error = useSelector((state) => state.app.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTruckData());
  }, [dispatch]);

  return (
    <div className={`grandchild-container ${theme}`}>
      <h3>Глибокий рівень вкладеності (Компонент-онук)</h3>
      <p>Специфікацію Iveco отримано асинхронно через Redux Thunk:</p>

      {loading && (
        <div style={{ color: '#007bff', fontWeight: 'bold', margin: '15px 0' }}>
          ⏳ Завантаження специфікації з сервера...
        </div>
      )}

      {error && (
        <div style={{ color: 'red', fontWeight: 'bold', margin: '15px 0' }}>
          ❌ {error}
        </div>
      )}

      {truck && !loading && (
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Модель вантажівки:</strong> {truck.model}</li>
          <li><strong>Тип транспорту:</strong> {truck.type}</li>
          <li><strong>Двигун / Паливо:</strong> {truck.engine}</li>
          <li><strong>Призначення:</strong> {truck.purpose}</li>
        </ul>
      )}
    </div>
  );
}
