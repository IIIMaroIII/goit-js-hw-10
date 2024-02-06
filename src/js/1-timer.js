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

//Object refs - is the list of links

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  spanValues: document.querySelectorAll('div.field > span.value'),
};

class Timer {
  constructor(updateTimerDisplay) {
    this.updateTimerDisplay = updateTimerDisplay;
    this.intervalId = intervalId;
  }

  // Method start() starts Timer after the date has been choosen.

  start() {
    intervalId = setInterval(() => {
      timeDiff -= 1000;
      timeObj = convertMs(timeDiff);
      const allEqualZero = Object.values(timeObj).every(value => value === 0);
      if (allEqualZero) {
        this.stop();
      }
      this.updateTimerDisplay(timeObj);
    }, 1000);
    showNotification(
      'Success!',
      'The timer`s been started!',
      '#59a10d',
      iconSuccess
    );
    refs.startBtn.setAttribute('disabled', true);
  }

  // Method validateTime() is checking the date has been choosen correctly (not in the future).

  validateTime(userSelectedDate) {
    timeDiff = userSelectedDate - options.defaultDate.getTime();
    if (timeDiff <= 0) {
      refs.startBtn.setAttribute('disabled', true);
      showNotification(
        'Error!',
        'Please choose a date in the future',
        'rgba(239, 64, 64, 1)',
        iconError
      );
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  }

  // Method stop() stops the timer when the time has been up.

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

const timer = new Timer(updateTimerDisplay);

// Object options is the set of flatpickr`s options.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    timer.validateTime(userSelectedDate);
  },
};

refs.startBtn.addEventListener('click', onStartBtn);

flatpickr(refs.input, options);

// Function updateTimerDisplay() displays the exact time which has been left.

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  refs.days.textContent = addZero(days);
  refs.hours.textContent = addZero(hours);
  refs.minutes.textContent = addZero(minutes);
  refs.seconds.textContent = addZero(seconds);
}

// Function onStartBtn() processes the event on button submit.

function onStartBtn(e) {
  timer.start();
}

// Function addZero() adds the symbol '0' in the beginning if it needs to be added.

function addZero(num) {
  return num.toString().padStart(2, '0');
}
