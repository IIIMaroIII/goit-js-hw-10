import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/error.svg';
import iconSuccess from '../img/ok.svg';
import iconHello from '../img/hello.svg';
import iconCaution from '../img/caution.svg';

export default function showNotification(
  title = 'Hello',
  message = 'Type in your message, please',
  backgroundColor = 'white',
  icon = iconCaution
) {
  return iziToast.show({
    titleSize: '16px',
    title: `${title}`,
    message: `${message}`,
    messageSize: '16px',
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: `${backgroundColor}`,
    iconUrl: `${icon}`,
  });
}
