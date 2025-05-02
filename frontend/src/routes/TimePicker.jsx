import React, { useState, useEffect, useContext } from 'react';
import customTimePickerStyles from '../styles/customTimePicker.module.css';
import { BotCOntext } from "../context/BotContext";

const TimePicker = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("00");
  const { missedChatTimer, setMissedChatTimer } = useContext(BotCOntext);

  useEffect(() => {
    const savedTimer = localStorage.getItem('missedchat');
    if (savedTimer) {
      setMissedChatTimer(parseInt(savedTimer, 10));
    }
  }, [setMissedChatTimer]);

  const handleSaveTimer = () => {
    const totalMilliseconds =
      parseInt(hours) * 3600000 +
      parseInt(minutes) * 60000 +
      parseInt(seconds) * 1000;
    setMissedChatTimer(totalMilliseconds);
    alert(`the missed chat timer is : ${totalMilliseconds}`);
    localStorage.setItem('missedchat', totalMilliseconds.toString());
  };

  const generateOptions = (max) =>
    Array.from({ length: max }, (_, i) => String(i).padStart(2, "0"));

  return (
    <div className={customTimePickerStyles.timePickerContainer}>
      <select
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className={customTimePickerStyles.timeSelector}
      >
        {generateOptions(24).map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span className={customTimePickerStyles.timeSeparator}>:</span>
      <select
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        className={customTimePickerStyles.timeSelector}
      >
        {generateOptions(60).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <span className={customTimePickerStyles.timeSeparator}>:</span>
      <select
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        className={customTimePickerStyles.timeSelector}
      >
        {generateOptions(60).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        onClick={handleSaveTimer}
        className={customTimePickerStyles.saveButton}
      >
        Save
      </button>
    </div>
  );
};

export default TimePicker;
