import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { toast } from 'react-toastify';
import { FaUserCheck, FaUserClock } from 'react-icons/fa';

export default function IdleStatus() {
  const [isIdle, setIsIdle] = useState(false);

  const onIdle = () => {
    setIsIdle(true);
    toast.warning('Система перейшла в режим енергозбереження через бездіяльність!');
  };

  const onActive = () => {
    setIsIdle(false);
    toast.success('Активність відновлено! Системи IVECO готові до роботи.');
  };

  useIdleTimer({
    timeout: 10000,
    onIdle,
    onActive,
    throttle: 500
  });

  return (
    <div style={{ padding: '20px', background: isIdle ? '#fff3cd' : '#d1e7dd', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s' }}>
      {isIdle ? <FaUserClock size={24} color="#856404" /> : <FaUserCheck size={24} color="#155724" />}
      <span style={{ fontWeight: 'bold', color: isIdle ? '#856404' : '#155724' }}>
        {isIdle ? 'Статус: Користувач відсутній (Енергозбереження)' : 'Статус: Оператор на місці (Активний)'}
      </span>
    </div>
  );
}
