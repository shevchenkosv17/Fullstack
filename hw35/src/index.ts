import './style.scss';
import join from 'lodash/join';

const message = join(['Проєкт', 'Webpack', 'готовий!'], ' ');
console.log(message);

const heading = document.createElement('h1');
heading.innerText = message;
document.body.prepend(heading);
