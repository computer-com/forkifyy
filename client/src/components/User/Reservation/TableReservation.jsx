import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../../assets/css/TableReservation.css";

const TableReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTable, setSelectedTable] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [reservationDetails, setReservationDetails] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
    name: '',
    phone: '',
    email: ''
  });
  const [confirmedTables, setConfirmedTables] = useState(new Set());
  const [currentSection, setCurrentSection] = useState('indoor'); // 'indoor' or 'outdoor'

  // Mock table data - in real app, this would come from backend
  const tables = {
    indoor: [
      { id: 1, seats: 2, position: { top: '20%', left: '20%' }, section: 'window' },
      { id: 2, seats: 2, position: { top: '20%', left: '50%' }, section: 'window' },
      { id: 3, seats: 4, position: { top: '20%', left: '80%' }, section: 'window' },
      { id: 4, seats: 4, position: { top: '50%', left: '20%' }, section: 'center' },
      { id: 5, seats: 6, position: { top: '50%', left: '50%' }, section: 'center' },
      { id: 6, seats: 6, position: { top: '50%', left: '80%' }, section: 'center' },
      { id: 7, seats: 8, position: { top: '80%', left: '35%' }, section: 'private' },
      { id: 8, seats: 8, position: { top: '80%', left: '65%' }, section: 'private' },
    ],
    outdoor: [
      { id: 9, seats: 2, position: { top: '20%', left: '30%' }, section: 'garden' },
      { id: 10, seats: 2, position: { top: '20%', left: '70%' }, section: 'garden' },
      { id: 11, seats: 4, position: { top: '50%', left: '30%' }, section: 'garden' },
      { id: 12, seats: 4, position: { top: '50%', left: '70%' }, section: 'garden' },
      { id: 13, seats: 6, position: { top: '80%', left: '50%' }, section: 'patio' },
    ]
  };

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30'
  ];

  const validateForm = () => {
    const { name, phone, email, date, time, guests } = reservationDetails;
    if (!name || !phone || !email || !date || !time || !guests) {
      alert('Please fill in all required fields');
      return false;
    }
    if (!selectedTable) {
      alert('Please select a table');
      return false;
    }
    return true;
  };

  const handleTableClick = (tableId) => {
    if (!reservationDetails.date || !reservationDetails.time) {
      alert('Please select date and time first');
      return;
    }
    if (confirmedTables.has(tableId)) {
      alert('This table is already reserved');
      return;
    }
    setSelectedTable(tableId);
    setIsConfirming(true);
  };

  const handleConfirmReservation = () => {
    if (!validateForm()) return;
    
    setConfirmedTables(prev => new Set([...prev, selectedTable]));
    setIsConfirming(false);
    setSelectedTable(null);
    
    // Here you would typically make an API call to save the reservation
    alert('Reservation confirmed! A confirmation email will be sent to you shortly.');
    
    // Reset form
    setReservationDetails({
      date: '',
      time: '',
      guests: 2,
      specialRequests: '',
      name: '',
      phone: '',
      email: ''
    });
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    setReservationDetails(prev => ({ ...prev, time }));
  };

  const handleCancelSelection = () => {
    setSelectedTable(null);
    setIsConfirming(false);
  };

  const getTableStatus = (tableId) => {
    if (confirmedTables.has(tableId)) return 'confirmed';
    if (selectedTable === tableId) return 'selected';
    return '';
  };

  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <h1>Table Reservation</h1>
        <p>Select your preferred table from the layout below</p>
      </div>

      <div className="reservation-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={reservationDetails.name}
            onChange={(e) => setReservationDetails(prev => ({
              ...prev,
              name: e.target.value
            }))}
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            value={reservationDetails.phone}
            onChange={(e) => setReservationDetails(prev => ({
              ...prev,
              phone: e.target.value
            }))}
            placeholder="Your phone number"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={reservationDetails.email}
            onChange={(e) => setReservationDetails(prev => ({
              ...prev,
              email: e.target.value
            }))}
            placeholder="Your email address"
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={reservationDetails.date}
            onChange={(e) => setReservationDetails(prev => ({
              ...prev,
              date: e.target.value
            }))}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label>Number of Guests:</label>
          <select
            value={reservationDetails.guests}
            onChange={(e) => setReservationDetails(prev => ({
              ...prev,
              guests: parseInt(e.target.value)
            }))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="time-slots">
        {timeSlots.map((time) => (
          <div
            key={time}
            className={`time-slot ${selectedTimeSlot === time ? 'selected' : ''}`}
            onClick={() => handleTimeSlotSelect(time)}
          >
            {time}
          </div>
        ))}
      </div>

      <div className="section-toggle">
        <button
          className={`btn ${currentSection === 'indoor' ? 'selected' : ''}`}
          onClick={() => setCurrentSection('indoor')}
        >
          Indoor Seating
        </button>
        <button
          className={`btn ${currentSection === 'outdoor' ? 'selected' : ''}`}
          onClick={() => setCurrentSection('outdoor')}
        >
          Outdoor Seating
        </button>
      </div>

      <div className="restaurant-layout">
        <div className="layout-container">
          <div className="entrance">Entrance</div>
          {/* Decorative elements */}
          {currentSection === 'outdoor' && (
            <>
              <div className="plant" style={{ top: '10%', left: '10%' }} />
              <div className="plant" style={{ top: '10%', left: '90%' }} />
              <div className="plant" style={{ top: '90%', left: '10%' }} />
              <div className="plant" style={{ top: '90%', left: '90%' }} />
            </>
          )}
          {tables[currentSection].map((table) => (
            <div
              key={table.id}
              className={`table table-${table.seats} ${getTableStatus(table.id)}`}
              style={{
                top: table.position.top,
                left: table.position.left,
              }}
              onClick={() => handleTableClick(table.id)}
            >
              <div className="table-top"></div>
              <div className="table-info">
                Table {table.id}
                <br />
                {table.seats} seats
                <br />
                {table.section}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isConfirming && (
        <div className="confirmation-panel">
          <h3>Confirm Reservation</h3>
          <div className="confirmation-details">
            <p>Name: {reservationDetails.name}</p>
            <p>Table {selectedTable} for {reservationDetails.guests} guests</p>
            <p>Date: {reservationDetails.date}</p>
            <p>Time: {reservationDetails.time}</p>
          </div>
          <div className="form-group">
            <label>Special Requests:</label>
            <textarea
              value={reservationDetails.specialRequests}
              onChange={(e) => setReservationDetails(prev => ({
                ...prev,
                specialRequests: e.target.value
              }))}
              placeholder="Any special requests or dietary requirements?"
            />
          </div>
          <div className="confirmation-buttons">
            <button className="btn confirm-btn" onClick={handleConfirmReservation}>
              Confirm Reservation
            </button>
            <button className="btn cancel-btn" onClick={handleCancelSelection}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span className="legend-text">Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color selected"></div>
          <span className="legend-text">Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-color confirmed"></div>
          <span className="legend-text">Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;
