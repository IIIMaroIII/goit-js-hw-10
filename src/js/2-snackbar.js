import showNotification from '../scripts/showNotification_iziToast';
import iconError from '../img/error.svg';
import iconSuccess from '../img/ok.svg';

const refs = {
  form: document.querySelector('.form'),
};

const notificationSuccess = {
  title: '',
  message: '',
  color: '#59a10d',
  icon: iconSuccess,
};

const notificationError = {
  title: '',
  message: '',
  color: 'rgba(239, 64, 64, 1)',
  icon: iconError,
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const delayMS = evt.currentTarget.elements.delay.value;
  const state = evt.currentTarget.elements.state.value;
  createPromise(notificationSuccess, delayMS, state)
    .then(res => {
      res.message = `Fulfilled promise in ${delayMS}ms`;
      showNotification(res);
    })
    .catch(err => {
      err.message = `Rejected promise in ${delayMS}ms`;
      err.color = notificationError.color;
      err.icon = notificationError.icon;
      showNotification(err);
    });
}

function createPromise(obj, delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
}
