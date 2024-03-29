import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iconError from '../img/error.svg';
import iconSuccess from '../img/ok.svg';
import iconHello from '../img/hello.svg';
import showNotification from '../scripts/showNotification_iziToast';

let userSelectedDate;

//Object refs - is the list of links

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn(e) {
  timer.start();
  e.target.setAttribute('disabled', true);
  refs.input.setAttribute('disabled', true);
}

class Timer {
  constructor() {
    this.notificationTimerStarted = {
      title: 'Success!',
      message: 'The timer`s been started!',
      color: '#59a10d',
      icon: iconSuccess,
    };
    this.notificationDateInThePast = {
      title: 'Error!',
      message: 'Please choose a date in the future',
      color: 'rgba(239, 64, 64, 1)',
      icon: iconError,
    };
    this.notificationTimeIsUp = {
      title: 'Finished',
      message: 'Time`s up!',
      color: 'rgba(0, 153, 255, 1)',
      icon: iconHello,
    };
    this.intervalId = null;
    this.timeDiff = 0;
    this.timeObj = {};
  }

  // Method start() starts Timer after the date has been choosen.

  start() {
    this.intervalId = setInterval(() => {
      this.timeDiff -= 1000;
      this.timeObj = this.convertMs(this.timeDiff);
      const allEqualZero = Object.values(this.timeObj).every(
        value => value === 0
      );
      if (allEqualZero) {
        this.stop();
      }
      this.updateTimerDisplay(this.timeObj);
    }, 1000);
    showNotification(this.notificationTimerStarted);
  }

  // Method validateTime() is checking the date has been choosen correctly (not in the future).

  validateTime(userSelectedDate) {
    this.timeDiff = userSelectedDate - options.defaultDate.getTime();
    if (this.timeDiff <= 0) {
      refs.startBtn.setAttribute('disabled', true);
      showNotification(this.notificationDateInThePast);
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  }

  // Method stop() stops the timer when the time has been up.

  stop() {
    clearInterval(this.intervalId);
    showNotification(this.notificationTimeIsUp);
    refs.input.removeAttribute('disabled');
  }
  // Function updateTimerDisplay() displays the exact time which has been left.

  updateTimerDisplay({ days, hours, minutes, seconds }) {
    refs.days.textContent = this.addZero(days);
    refs.hours.textContent = this.addZero(hours);
    refs.minutes.textContent = this.addZero(minutes);
    refs.seconds.textContent = this.addZero(seconds);
  }

  // Function addZero() adds the symbol '0' in the beginning if it needs to be added.

  addZero(num) {
    return num.toString().padStart(2, '0');
  }
  // convertMs(ms) converts MS to object (days,hours,minutes,seconds)
  convertMs(ms) {
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
}

const timer = new Timer();

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

flatpickr(refs.input, options);

// Function onStartBtn() processes the event on button submit.
