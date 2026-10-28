import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ukLocale from '@fullcalendar/core/locales/uk';
import { io } from 'socket.io-client'; // Тут должна быть ТОЧКА, а не дефис!

import './App.css';

const socket = io('http://localhost:3000');

function App() {
  const [events, setEvents] = useState([]);
  
  const [menuData, setMenuData] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCar, setEditCar] = useState('');
  const [editColor, setEditColor] = useState('#3788d8');
  const [editStart, setEditStart] = useState('');
  const [editEnd, setEditEnd] = useState('');

  const loadData = () => {
    fetch('http://localhost:3000/api/appointments')
      .then(res => res.json())
      .then(data => {
        setEvents(data.map(app => ({
          id: app.id.toString(),
          title: `${app.client_name} (${app.car_model || ''})`,
          start: app.start_time,
          end: app.end_time,
          backgroundColor: app.color,
          extendedProps: { ...app }
        })));
      })
      .catch(err => console.error("Помилка завантаження даних:", err));
  };

  useEffect(() => {
    loadData();
    socket.on('appointments_changed', loadData);
    return () => socket.off('appointments_changed', loadData);
  }, []);

  const handleSelect = (selectInfo) => {
    const name = prompt("Введіть ім'я клієнта:");
    if (!name) return;
    const car = prompt("Марка авто:");
    
    fetch('http://localhost:3000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: name,
        car_model: car,
        start_time: selectInfo.startStr,
        end_time: selectInfo.endStr,
        color: '#3788d8'
      })
    }).then(() => loadData());
  };

  const handleEventChange = (changeInfo) => {
    const ep = changeInfo.event.extendedProps;
    fetch(`http://localhost:3000/api/appointments/${changeInfo.event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start_time: changeInfo.event.startStr,
        end_time: changeInfo.event.endStr,
        client_name: ep.client_name,
        car_model: ep.car_model,
        color: changeInfo.event.backgroundColor
      })
    }).then(() => loadData());
  };

  const handleEventDidMount = (info) => {
    info.el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const props = info.event.extendedProps;
      
      const formatDateForInput = (dateStr) => {
        const d = new Date(dateStr);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      };

      setMenuData({ id: info.event.id, x: e.clientX, y: e.clientY });
      setEditName(props.client_name);
      setEditCar(props.car_model || '');
      setEditColor(info.event.backgroundColor);
      setEditStart(formatDateForInput(info.event.start));
      setEditEnd(formatDateForInput(info.event.end));
    });
  };

  const saveChanges = () => {
    fetch(`http://localhost:3000/api/appointments/${menuData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: editName,
        car_model: editCar,
        color: editColor,
        start_time: editStart,
        end_time: editEnd
      })
    }).then(() => {
      setMenuData(null);
      loadData();
    });
  };

  const deleteEventById = (id) => {
    fetch(`http://localhost:3000/api/appointments/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        loadData();
      }
    })
    .catch(err => console.error("Помилка видалення:", err));
  };

  const handleEventDragStop = (info) => {
    const trashEl = document.getElementById('calendar-trash-zone');
    if (!trashEl) return;

    const trashRect = trashEl.getBoundingClientRect();
    const x = info.jsEvent.clientX;
    const y = info.jsEvent.clientY;

    if (x >= trashRect.left && x <= trashRect.right && y >= trashRect.top && y <= trashRect.bottom) {
      if (confirm(`Видалити замовлення клієнта ${info.event.extendedProps.client_name} з черги?`)) {
        deleteEventById(info.event.id);
      }
    }
  };

  return (
    <div className="app-container" onClick={() => setMenuData(null)}>
      <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#2c3e50', fontFamily: 'sans-serif' }}>
        Монітор черги СТО
      </h2>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={true}
        editable={true}
        select={handleSelect}
        eventChange={handleEventChange}
        eventDidMount={handleEventDidMount}
        eventDragStop={handleEventDragStop}
        slotMinTime="09:00:00"
        slotMaxTime="19:00:00"
        height="auto"
        weekends={false}
        allDaySlot={false}
        slotDuration="00:30:00"
        locale={ukLocale}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridWeek,timeGridDay' }}
        nowIndicator={true}
      />

      <div id="calendar-calendar-trash-wrapper">
        <div id="calendar-trash-zone">
          🗑️ Перетягніть замовлення сюди для видалення
        </div>
      </div>

      {menuData && (
        <div className="context-edit-menu" style={{ top: menuData.y, left: menuData.x }} onClick={(e) => e.stopPropagation()}>
          <h4>Редагування замовлення</h4>
          <label>Ім'я клієнта:</label>
          <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
          
          <label>Автомобіль:</label>
          <input type="text" value={editCar} onChange={(e) => setEditCar(e.target.value)} />
          
          <label>Початок запису:</label>
          <input type="datetime-local" value={editStart} onChange={(e) => setEditStart(e.target.value)} />
          
          <label>Кінець запису:</label>
          <input type="datetime-local" value={editEnd} onChange={(e) => setEditEnd(e.target.value)} />

          <label>Статус (колір):</label>
          <select value={editColor} onChange={(e) => setEditColor(e.target.value)}>
            <option value="#3788d8">🔵 Синій (В черзі)</option>
            <option value="#2ecc71">🟢 Зелений (Готово)</option>
            <option value="#f1c40f">🟡 Жовтий (Очікування)</option>
            <option value="#e74c3c">🔴 Червоний (Проблема)</option>
          </select>

          <div className="menu-buttons">
            <button className="save-btn" onClick={saveChanges}>Зберегти</button>
            <button className="delete-btn" onClick={() => { if(confirm("Видалити замовлення?")) { deleteEventById(menuData.id); setMenuData(null); } }}>❌ Видалити</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
