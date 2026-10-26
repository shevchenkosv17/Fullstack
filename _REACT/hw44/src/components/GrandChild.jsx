import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function GrandChild() {
  const { truck, theme } = useContext(AppContext);

  return (
    <div className={`grandchild-container ${theme}`}>
      <h3>Глибокий рівень вкладеності (Компонент-онук)</h3>
      <p>Специфікацію Iveco отримано напряму через useContext:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li><strong>Модель вантажівки:</strong> {truck.model}</li>
        <li><strong>Тип транспорту:</strong> {truck.type}</li>
        <li><strong>Двигун / Паливо:</strong> {truck.engine}</li>
        <li><strong>Призначення:</strong> {truck.purpose}</li>
      </ul>
    </div>
  );
}
