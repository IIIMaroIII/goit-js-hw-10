import showNotification from '../scripts/showNotification_iziToast';
import iconError from '../img/error.svg';
import iconSuccess from '../img/ok.svg';

const refs = {
  form: document.querySelector('.form'),
};

let dataValues = [];

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const delayMs = evt.currentTarget.elements.delay.value;
  const state = evt.currentTarget.elements.state.value;
  createPromise(delayMs, state)
    .then(res => {
      onFullFilledNotification(res, delayMs);
    })
    .catch(res => {
      onRejectedNotification(res, delayMs);
    });
}

function onFullFilledNotification(message, delay) {
  setTimeout(() => {
    showNotification('', message, 'green', iconSuccess);
  }, delay);
}
function onRejectedNotification(message, delay) {
  setTimeout(() => {
    showNotification('', message, 'red', iconError);
  }, delay);
}
function createPromise(delay = 0, status = '') {
  return new Promise((resolve, reject) => {
    if (status === 'fulfilled') {
      resolve(`Fulfilled promise in ${delay}ms`);
    } else {
      reject(`Rejected promise in ${delay}ms`);
    }
  });
}

// 1) Создаем функцию createPromise которая принимает delay, status
// 2) При сабмите получаем данные с new FormData.
// 3) записываем в переменную результат выполнения функции createPromise в
// которую передаем аргументами delay и статус.
// 4) на переменной с возвращенным Promise вызываем методы then() и catch()
// для обработки функций onFullfilled и onRejected.
// 5) прописываем функции onFullfilled и onRejected на уведомления.
