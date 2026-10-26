import { useSelector } from 'react-redux';

export default function GrandChild() {
  const theme = useSelector((state) => state.app.theme);
  const truck = useSelector((state) => state.app.truck);

  return (
    <div className={`grandchild-container ${theme}`}>
      <h3>Глибокий рівень вкладеності (Компонент-онук)</h3>
      <p>Специфікацію Iveco отримано напряму через Redux (useSelector):</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li><strong>Модель вантажівки:</strong> {truck.model}</li>
        <li><strong>Тип транспорту:</strong> {truck.type}</li>
        <li><strong>Двигун / Паливо:</strong> {truck.engine}</li>
        <li><strong>Призначення:</strong> {truck.purpose}</li>
      </ul>
    </div>
  );
}
