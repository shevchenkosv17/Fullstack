import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ukLocale from '@fullcalendar/core/locales/uk';
import { io } from 'socket.io-client';
import './App.css';

const API_BASE = "http://192.168.5.109:3000";
const socket = io(API_BASE);

const MECHANICS = ['Кривобородов', 'Котов', 'Сеноженский'];

const formatDateForInput = (dateStr) => {
  const d = new Date(dateStr);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

function App() {
  const [events, setEvents] = useState([]);
  const [createForm, setCreateForm] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCar, setEditCar] = useState('');
  const [editColor, setEditColor] = useState('#3788d8');
  const [editMech, setEditMech] = useState('');
  const [editRepair, setEditRepair] = useState('');
  const [editStart, setEditStart] = useState('');
  const [editEnd, setEditEnd] = useState('');

  const loadData = () => {
    fetch(`${API_BASE}/api/appointments`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.map(app => ({
          id: app.id.toString(),
          title: `${app.client_name} | ${app.car_model || ''} | Мех: ${app.mechanic_name || 'Не обрано'}`,
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

  const openCreateForm = (start, end) => {
    setMenuData(null);
    setCreateForm({
      client_name: '',
      car_model: '',
      mechanic_name: '',
      repair_info: '',
      color: '#3788d8',
      start_time: formatDateForInput(start),
      end_time: formatDateForInput(end)
    });
  };

  const handleSelect = (selectInfo) => {
    selectInfo.view.calendar.unselect();
    openCreateForm(selectInfo.startStr, selectInfo.endStr);
  };

  const handleNewAppointmentClick = () => {
    const start = new Date();
    start.setSeconds(0, 0);
    start.setMilliseconds(0);
    const remainder = start.getMinutes() % 30;
    if (remainder !== 0) {
      start.setMinutes(start.getMinutes() + (30 - remainder));
    }
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    openCreateForm(start, end);
  };

  const submitCreate = (e) => {
    e.preventDefault();
    const name = createForm.client_name.trim();
    if (!name) return;

    fetch(`${API_BASE}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: name,
        car_model: createForm.car_model.trim(),
        start_time: createForm.start_time,
        end_time: createForm.end_time,
        color: createForm.color,
        mechanic_name: createForm.mechanic_name,
        repair_info: createForm.repair_info.trim()
      })
    }).then(() => {
      setCreateForm(null);
      loadData();
    });
  };

  const handleEventChange = (changeInfo) => {
    const ep = changeInfo.event.extendedProps;
    fetch(`${API_BASE}/api/appointments/${changeInfo.event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start_time: changeInfo.event.startStr,
        end_time: changeInfo.event.endStr,
        client_name: ep.client_name,
        car_model: ep.car_model,
        color: changeInfo.event.backgroundColor,
        mechanic_name: ep.mechanic_name,
        repair_info: ep.repair_info
      })
    }).then(() => loadData());
  };

  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    clickInfo.jsEvent.stopPropagation();
    setCreateForm(null);
    const props = clickInfo.event.extendedProps;
    const rect = clickInfo.el.getBoundingClientRect();

    setMenuData({ 
      id: clickInfo.event.id, 
      top: window.scrollY + rect.top, 
      left: window.scrollX + rect.left + rect.width + 10 
    });
    
    setEditName(props.client_name);
    setEditCar(props.car_model || '');
    setEditColor(clickInfo.event.backgroundColor);
    setEditMech(props.mechanic_name || '');
    setEditRepair(props.repair_info || '');
    setEditStart(formatDateForInput(clickInfo.event.start));
    setEditEnd(formatDateForInput(clickInfo.event.end));
  };

  const saveChanges = () => {
    fetch(`${API_BASE}/api/appointments/${menuData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: editName,
        car_model: editCar,
        color: editColor,
        mechanic_name: editMech,
        repair_info: editRepair,
        start_time: editStart,
        end_time: editEnd
      })
    }).then(() => {
      setMenuData(null);
      loadData();
    });
  };

  const deleteEventById = (id) => {
    fetch(`${API_BASE}/api/appointments/${id}`, {
      method: 'DELETE'
    }).then(() => loadData());
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
      <div className="header-row">
        <h2 className="main-logo">DNIPROMOTOR</h2>
        <button type="button" className="new-appointment-btn" onClick={handleNewAppointmentClick}>
          + Новий запис
        </button>
      </div>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={true}
        editable={true}
        select={handleSelect}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
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

      {createForm && (
        <div className="modal-overlay" onClick={() => setCreateForm(null)}>
          <form className="create-appointment-modal" onClick={(e) => e.stopPropagation()} onSubmit={submitCreate}>
            <h4>Новий запис</h4>
            <p className="modal-hint">Перевірте час і заповніть деталі ремонту перед збереженням.</p>

            <label>Ім'я клієнта:</label>
            <input
              type="text"
              autoFocus
              required
              value={createForm.client_name}
              onChange={(e) => setCreateForm({ ...createForm, client_name: e.target.value })}
            />

            <label>Автомобіль:</label>
            <input
              type="text"
              value={createForm.car_model}
              onChange={(e) => setCreateForm({ ...createForm, car_model: e.target.value })}
            />

            <label>Призначити механіка:</label>
            <select
              value={createForm.mechanic_name}
              onChange={(e) => setCreateForm({ ...createForm, mechanic_name: e.target.value })}
            >
              <option value="">-- Не обрано --</option>
              {MECHANICS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>

            <label>Інформація по ремонту:</label>
            <textarea
              rows="3"
              value={createForm.repair_info}
              onChange={(e) => setCreateForm({ ...createForm, repair_info: e.target.value })}
              placeholder="Опишіть несправність чи перелік робіт..."
            />

            <label>Початок запису:</label>
            <input
              type="datetime-local"
              value={createForm.start_time}
              onChange={(e) => setCreateForm({ ...createForm, start_time: e.target.value })}
            />

            <label>Кінець запису:</label>
            <input
              type="datetime-local"
              value={createForm.end_time}
              onChange={(e) => setCreateForm({ ...createForm, end_time: e.target.value })}
            />

            <label>Статус (колір):</label>
            <select
              value={createForm.color}
              onChange={(e) => setCreateForm({ ...createForm, color: e.target.value })}
            >
              <option value="#3788d8">🔵 Синій (В черзі)</option>
              <option value="#2ecc71">🟢 Зелений (Готово)</option>
              <option value="#f1c40f">🟡 Жовтий (Очікування)</option>
              <option value="#e74c3c">🔴 Червоний (Проблема)</option>
            </select>

            <div className="menu-buttons">
              <button type="submit" className="save-btn">Зберегти</button>
              <button type="button" className="cancel-btn" onClick={() => setCreateForm(null)}>Скасувати</button>
            </div>
          </form>
        </div>
      )}

      {menuData && (
        <div className="context-edit-menu" style={{ top: menuData.top, left: menuData.left }} onClick={(e) => e.stopPropagation()}>
          <h4>Деталі ремонту</h4>
          
          <label>Ім'я клієнта:</label>
          <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
          
          <label>Автомобіль:</label>
          <input type="text" value={editCar} onChange={(e) => setEditCar(e.target.value)} />
          
          <label>Призначити механіка:</label>
          <select value={editMech} onChange={(e) => setEditMech(e.target.value)}>
            <option value="">-- Не обрано --</option>
            {MECHANICS.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <label>Інформація по ремонту:</label>
          <textarea rows="3" value={editRepair} onChange={(e) => setEditRepair(e.target.value)} placeholder="Опишіть несправність чи перелік робіт..."></textarea>

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
