import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './redux/appSlice';
import GrandChild from './components/GrandChild';

const ChildComponentLevel1 = React.memo(function ChildComponentLevel1() {
  return (
    <div className="child-container">
      <h2>Перший рівень вкладеності (Компонент-дитина)</h2>
      <p>Цей компонент оптимізовано за допомогою React.memo.</p>
      <GrandChild />
    </div>
  );
});

function MainContent() {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Конфігуратор Iveco Green Power</h1>
        <button onClick={() => dispatch(toggleTheme())} className={`theme-toggle-btn ${theme}`}>
          {theme === 'light' ? 'Темна тема' : 'Світла тема'}
        </button>
      </div>
      <ChildComponentLevel1 />
    </div>
  );
}

export default function App() {
  return (
    <MainContent />
  );
}
