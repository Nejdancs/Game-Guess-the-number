const btnSolo = document.querySelector('[data-solo]');
const btnDuel = document.querySelector('[data-duel]');
const btnChangeMode = document.querySelector('[data-change-mode]');
const btnSubmit = document.querySelector('button[data-submit]');
const valueInput = document.querySelector('input[data-value]');
const areaInput = document.querySelector('[data-input]');
const outputResult = document.querySelector('.js-output');
const outputAttempts = document.querySelector('.js-attempts');
const outputPoints = document.querySelector('.js-points b');
const outputInfo = document.querySelector('.js-info');
const btnInfo = document.querySelector('[data-info]');
const chooseLvl = document.querySelector('[data-lvl]');
const btnHelp = document.querySelector('[data-help]');
const outputHelp = document.querySelector('.js-help');
const btnRefresh = document.querySelector('[data-refresh]');

let rangeValue = 0;
let randomNumber;
let totalAttempts = 0;
let totalPoints = 0;
let currentPoints = 0;
let isGuessed;

btnSolo.addEventListener('click', () => {
  document.querySelector('.js-choise-lvl').classList.remove('is-hidden');
  btnSolo.classList.add('is-hidden');
  btnDuel.classList.add('is-hidden');
  btnChangeMode.classList.remove('is-hidden');
});

btnDuel.addEventListener('click', () => {
  if (document.querySelector('.js-duel-area').classList.contains('is-hidden')) {
    document.querySelector('.js-duel-area').classList.remove('is-hidden');
    rangeValue = 100;
    document.querySelector('.js-lvl').textContent = `Загадай число от 1 до 100`;
  }

  btnSolo.classList.add('is-hidden');
  btnDuel.classList.add('is-hidden');
  btnChangeMode.classList.remove('is-hidden');
});

btnChangeMode.addEventListener('click', () => {
  location.reload();
});

const generateNumber = function (rangeValue) {
  randomNumber = Math.round(Math.random() * (rangeValue - 1) + 1);
};

const clearText = function () {
  outputResult.textContent = '';
  valueInput.value = '';
  outputHelp.classList.add('is-hidden');
};

const resetAttempts = function () {
  totalAttempts = 0;
  outputAttempts.textContent = '';
  outputHelp.classList.remove('open');
  areaInput.classList.remove('is-hidden');
};

const counterAttempts = function (value) {
  if (value !== '') {
    totalAttempts += 1;
  }
  outputAttempts.textContent = `Попыток: ${totalAttempts}`;
};

const POINTFORFAILEDATTEMPT = -1;
let point;

const calcPointsPerLevel = function () {
  if (rangeValue === '10') {
    point = 5;
  } else if (rangeValue === '100') {
    point = 10;
  } else if (rangeValue === '1000') {
    point = 15;
  }
};

const counterPoints = function (point = 0) {
  totalPoints += point;
  outputPoints.textContent = totalPoints;
};

const counterCurrentPoints = function (point = 0) {
  currentPoints += point;
};

chooseLvl.addEventListener('change', function () {
  rangeValue = chooseLvl.value;
  currentPoints = 0;
  isGuessed = false;
  clearText();
  resetAttempts();
  counterPoints();
  calcPointsPerLevel();

  document.querySelector(
    '.js-lvl',
  ).textContent = `Угадай число от 1 до ${rangeValue}`;

  document.querySelector('.js-solo').classList.remove('is-hidden');
  document.querySelector('.js-area-gussed').classList.remove('is-hidden');
  document.querySelector('.js-point-area').classList.remove('is-hidden');

  generateNumber(rangeValue);
});

btnRefresh.addEventListener('click', function () {
  generateNumber(rangeValue);
  clearText();
  resetAttempts();
  currentPoints = 0;
  isGuessed = false;
});

btnHelp.addEventListener('click', function () {
  outputHelp.classList.add('open');
  outputHelp.classList.toggle('is-hidden');

  outputHelp.textContent = `Загаданное число ${randomNumber}`;
});

const createResultMessage = function (currentPoints, isUsedHelp) {
  let endMessage = 'баллов';
  const lastEl = String(currentPoints).at(-1);

  if (lastEl === '1') {
    endMessage = 'балл';
  }

  if (lastEl >= 2 && lastEl <= 4) {
    endMessage = 'балла';
  }

  if (isUsedHelp) {
    return endMessage;
  }

  if (currentPoints > 0) {
    return `И заработали ${currentPoints} ${endMessage}`;
  }
  return `Но увы потеряли ${currentPoints * -1} ${endMessage}`;
};

const checkNumber = function (value) {
  if (Number(value) === randomNumber) {
    clearText();
    isGuessed = true;

    if (
      !document.querySelector('.js-duel-area').classList.contains('is-hidden')
    ) {
      document.querySelector('.js-output-result').textContent =
        cretaeResultMsgDuel();
      document.getElementById('refresh').classList.remove('is-hidden');
    }

    if (outputHelp.classList.contains('open')) {
      return `Хитрец! Вы подсмотрели загаданное число ${value}! И ничего не заработали, а только потратили ${
        currentPoints * -1
      } ${createResultMessage(currentPoints, true)}  за попытки 🤥`;
    }

    counterPoints(point);
    counterCurrentPoints(point);

    return (
      `Ура! Вы угадали число ${value}, с ${totalAttempts}-й попытки!` +
      (document.querySelector('.js-duel-area').classList.contains('is-hidden')
        ? `${createResultMessage(currentPoints)}👍`
        : `👍`)
    );
  }

  if (value === '') {
    return `Вы ничего не ввели 😅`;
  }

  if (Number(value) < randomNumber) {
    counterPoints(POINTFORFAILEDATTEMPT);
    counterCurrentPoints(POINTFORFAILEDATTEMPT);

    return `Загаданное число больше чем ${value}, пробуйте еще! 😉`;
  }

  if (Number(value) > randomNumber) {
    counterPoints(POINTFORFAILEDATTEMPT);
    counterCurrentPoints(POINTFORFAILEDATTEMPT);

    return `Загаданное число меньше чем ${value}, пробуйте еще! 😉`;
  }
};

btnSubmit.addEventListener('click', function () {
  const value = valueInput.value;
  counterAttempts(value);
  clearText();
  outputResult.textContent = checkNumber(value);

  if (isGuessed) {
    resetAttempts();
    areaInput.classList.add('is-hidden');
  }
});

btnInfo.addEventListener('click', function () {
  outputInfo.classList.toggle('is-hidden');
});

document.getElementById('reset').onclick = function () {
  location.reload();
};
document.getElementById('refresh').onclick = function () {
  location.reload();
};

const btnGuessed = document.querySelector('[data-guessed]');
const btnSmaller = document.querySelector('[data-smaller]');
const btnBigger = document.querySelector('[data-bigger]');
const btnGussedRight = document.querySelector('[data-gussedRight]');
const btnReady = document.querySelector('[data-ready]');
const outputMsg = document.querySelector('.js-output-message');
const outputtotalGuessed = document.querySelector('.js-total-guessed');

let minNumber = 1;
let maxNumber = 100;
let averageNumber = Math.round((maxNumber - minNumber) / 2);
let totalGuessed = 0;

const calculateTotalGussed = () => {
  totalGuessed += 1;
  outputtotalGuessed.textContent = `Попытка: ${totalGuessed}`;
};

const createResulMsg = () => {
  let message = `Ваше число ${averageNumber}? 🤔`;

  if (totalGuessed > 7) {
    message = `Вы жульничаете! А я так надеялся на вашу честность...😞`;
    document.querySelector('.js-input-area').classList.add('is-hidden');
    document.getElementById('refresh').classList.remove('is-hidden');
  }

  outputMsg.textContent = message;
};

btnSmaller.addEventListener('click', () => {
  calculateTotalGussed();
  maxNumber = averageNumber;
  averageNumber -=
    totalGuessed < 7 ? Math.round((maxNumber - minNumber) / 2) : 1;
  createResulMsg();
});

btnBigger.addEventListener('click', () => {
  calculateTotalGussed();

  minNumber = averageNumber;
  averageNumber +=
    totalGuessed < 7 ? Math.round((maxNumber - minNumber) / 2) : 1;
  createResulMsg();
});

btnGussedRight.addEventListener('click', () => {
  outputMsg.textContent = `Я угадал с ${totalGuessed} попытки! Теперь ваша очередь отгадывать! 😎`;
  document.querySelector('.js-input-area').classList.add('is-hidden');
  btnReady.classList.remove('is-hidden');
});

btnGuessed.addEventListener('click', () => {
  btnGuessed.classList.add('is-hidden');
  outputMsg.classList.remove('is-hidden');
  calculateTotalGussed();

  document.querySelector('.js-input-area').classList.remove('is-hidden');
  outputMsg.textContent = `Ваше число ${averageNumber}? 🤔`;
});

btnReady.addEventListener('click', () => {
  btnReady.classList.add('is-hidden');

  outputMsg.classList.add('is-hidden');
  outputtotalGuessed.classList.add('is-hidden');
  document.querySelector('.js-lvl').textContent = `Отгадай число от 1 до 100`;
  document.querySelector('.js-area-gussed').classList.remove('is-hidden');
  generateNumber(rangeValue);
});

function cretaeResultMsgDuel() {
  if (totalGuessed > totalAttempts) {
    return `Вы выиграли! Компьютер отгадал за ${totalGuessed}, а вы за ${totalAttempts} попыток`;
  }
  if (totalGuessed === totalAttempts) {
    return `Ничья! Компьютер отгадал за ${totalGuessed}, а вы за ${totalAttempts} попыток`;
  }
  return `Вы проиграли!  Компьютер отгадал за ${totalGuessed}, а вы за ${totalAttempts} попыток`;
}
