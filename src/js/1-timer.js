import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iconError from '../img/error.svg';
import iconSuccess from '../img/ok.svg';
import iconHello from '../img/hello.svg';
import showNotification from '../scripts/showNotification_iziToast';
import convertMs from '../scripts/convertMs';

let intervalId;
let userSelectedDate = '';
let timeDiff = 0;
let timeObj = {};

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    refs.startBtn.removeAttribute('disabled');
  },
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartBtn);

flatpickr(refs.input, options);

class Timer {
  constructor(tick) {
    this.tick = tick;
  }

  start() {
    this.initTime = Date.now();
    timeDiff = userSelectedDate - this.initTime;
    this.validateTime();
    refs.startBtn.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);
  }

  validateTime() {
    if (timeDiff < 0) {
      return showNotification(
        'Error!',
        'Please choose a date in the future',
        'red',
        iconError
      );
    } else {
      showNotification(
        'Success!',
        'The timer has been started!',
        'green',
        iconSuccess
      );
      intervalId = setInterval(() => {
        timeDiff -= 1000;

        timeObj = convertMs(timeDiff);

        this.tick(timeObj);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        showNotification('Finished', 'Time`s up!', 'White', iconHello);
      }, timeDiff);
    }
    console.log(userSelectedDate);
    console.log(timeDiff);
  }
}

const timer = new Timer(tick);

function tick({ days, hours, minutes, seconds }) {
  refs.days.textContent = addZero(days);
  refs.hours.textContent = addZero(hours);
  refs.minutes.textContent = addZero(minutes);
  refs.seconds.textContent = addZero(seconds);
}

function onStartBtn(e) {
  timer.start();
}

function addZero(num) {
  return num.toString().padStart(2, '0');
}
