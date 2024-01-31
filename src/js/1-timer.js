import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // timeDifference(selectedDates[0]);
  },
};

class Timer {
  start() {}
}

flatpickr(refs.input, options);

// function timeDifference(choosenDate) {
//   const currentDate = new Date();
//   if (choosenDate < currentDate) {
//     return window.alert('Please choose a date in the future');
//   }
//   differenceBetweenChoosenAndCurrentDate = choosenDate - currentDate;
//   dateFormat = convertMs(differenceBetweenChoosenAndCurrentDate);
//   const addZero = addZeroToValue(toString({ days, hours, minutes, seconds }));
//   timerRendering(dateFormat);
//   refs.startBtn.removeAttribute('disabled');
// }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
