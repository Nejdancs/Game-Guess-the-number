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

  document.querySelector('.js-content').classList.remove('is-hidden');

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

const createdResultMessage = function (currentPoints, isUsedHelp) {
  let endMessage = 'баллов';
  const lastEl = String(currentPoints).at(-1);

  if (lastEl === '1') {
    endMessage = 'балл';
  } else if (lastEl >= 2 && lastEl <= 4) {
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

    if (outputHelp.classList.contains('open')) {
      return `Хитрец! Вы подсмотрели загаданное число ${value}! И ничего не заработали, а только потратили ${
        currentPoints * -1
      } ${createdResultMessage(currentPoints, true)}  за попытки`;
    }

    counterPoints(point);
    counterCurrentPoints(point);

    return `Ура! Вы угадали число ${value}, с ${totalAttempts}-й попытки! ${createdResultMessage(
      currentPoints,
    )}`;
  } else if (rangeValue === 0 || rangeValue === '0') {
    outputAttempts.textContent = '';
    return `Вы не выбрали сложность`;
  } else if (value === '') {
    return `Вы ничего не ввели`;
  } else if (Number(value) < randomNumber) {
    counterPoints(POINTFORFAILEDATTEMPT);
    counterCurrentPoints(POINTFORFAILEDATTEMPT);

    return `Загаданное число больше чем ${value}, пробуйте еще!`;
  } else if (Number(value) > randomNumber) {
    counterPoints(POINTFORFAILEDATTEMPT);
    counterCurrentPoints(POINTFORFAILEDATTEMPT);

    return `Загаданное число меньше чем ${value}, пробуйте еще!`;
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
