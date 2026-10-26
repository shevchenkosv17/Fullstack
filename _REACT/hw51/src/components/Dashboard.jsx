import { toast } from 'react-toastify';
import { FaPlay, FaStop, FaTools } from 'react-icons/fa';

export default function Dashboard() {
  const startEngine = () => {
    toast.success('Двигун IVECO eDaily успішно запущено! Заряд батареї — 100%.');
  };

  const stopEngine = () => {
    toast.error('Двигун зупинено. Бортові системи переведені в режим паркування.');
  };

  const checkDiagnostics = () => {
    toast.info('Запущено повну діагностику систем штучного інтелекту...');
  };

  return (
    <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #eef0f2', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
      <h3 style={{ marginBottom: '24px', color: '#091524', fontWeight: 700, fontSize: '20px' }}>Бортовий комп'ютер IVECO Green Power</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={startEngine} style={{ padding: '12px 24px', background: '#198754', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <FaPlay /> Запуск двигуна
        </button>
        <button onClick={stopEngine} style={{ padding: '12px 24px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <FaStop /> Зупинка системи
        </button>
        <button onClick={checkDiagnostics} style={{ padding: '12px 24px', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <FaTools /> Діагностика
        </button>
      </div>
    </div>
  );
}
