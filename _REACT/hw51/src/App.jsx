import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IdleStatus from './components/IdleStatus';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div style={{ maxWidth: '650px', margin: '60px auto', padding: '0 20px', fontFamily: '"Segoe UI", sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#091524', marginBottom: '8px', fontWeight: 800, letterSpacing: '1px' }}>IVECO SMART CONTROL</h1>
      <p style={{ color: '#6c757d', marginBottom: '32px' }}>Панель інтеграції спеціалізованих систем та моніторингу активності</p>
      <IdleStatus />
      <Dashboard />
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </div>
  );
}
