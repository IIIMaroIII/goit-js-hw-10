import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iconError from '../img/error.svg';
import iconSuccess from '../img/ok.svg';
import iconHello from '../img/hello.svg';
import iconCaution from '../img/caution.svg';
import showNotification from '../scripts/showNotification_iziToast';
import convertMs from '../scripts/convertMs';

let intervalId = 0;
let userSelectedDate;
let timeDiff = 0;
let timeObj;

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  spanValues: document.querySelectorAll('div.field > span.value'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    refs.startBtn.removeAttribute('disabled');
  },
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartBtn);

flatpickr(refs.input, options);

class Timer {
  constructor(tick) {
    this.tick = tick;
    this.intervalId = intervalId;
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
        'rgba(239, 64, 64, 1)',
        iconError
      );
    } else {
      showNotification(
        'Success!',
        'The timer has been started!',
        'rgba(89, 161, 13, 1)',
        iconSuccess
      );
      intervalId = setInterval(() => {
        timeDiff -= 1000;
        timeObj = convertMs(timeDiff);
        this.tick(timeObj);
      }, 1000);
    }
  }
  stop() {
    clearInterval(intervalId);
    showNotification(
      'Finished',
      'Time`s up!',
      'rgba(0, 153, 255, 1)',
      iconHello
    );
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
