const btnSubmit = document.querySelector('button[data-submit]');
const valueInput = document.querySelector('input[data-value]');
const resultEl = document.querySelector('.js-output');
const outputAttempts = document.querySelector('.js-attempts');
const outputPoints = document.querySelector('.js-points b');
const outputInfo = document.querySelector('.js-info');
const btnInfo = document.querySelector('[data-info]');
const chooseLvl = document.querySelector('[data-lvl]');
const btnHelp = document.querySelector('[data-help]');
const outputHelp = document.querySelector('.js-help');
const btnRefresh = document.querySelector('[data-refresh]');

let rangeValue = 0;
let randomNumber = 'Вы не выбрали сложность!';
let totalAttempts = 0;
let totalPoints = 0;
let currentPoints = 0;

const generateNumber = function (rangeValue) {
  randomNumber =
    rangeValue !== '0'
      ? Math.round(Math.random() * (rangeValue - 1) + 1)
      : 'Вы не выбрали сложность!';
};

const clearText = function () {
  // outputHelp.textContent = '';
  resultEl.textContent = '';
  valueInput.value = '';
  outputHelp.classList.add('is-hidden');
};

const resetAttempts = function () {
  totalAttempts = 0;
  outputAttempts.textContent = '';
  outputHelp.classList.remove('open');

  document.querySelector('[data-input]').classList.remove('is-hidden');
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
  clearText();
  resetAttempts();
  counterPoints();

  let message = '';

  if (rangeValue !== '0') {
    message = `Угадай число от 1 до ${rangeValue}`;
    document.querySelector('.js-content').classList.remove('is-hidden');
  } else {
    message = '';
  }

  document.querySelector('.js-lvl').textContent = message;
  generateNumber(rangeValue);
});

btnRefresh.addEventListener('click', function () {
  generateNumber(rangeValue);
  clearText();
  resetAttempts();
  currentPoints = 0;
});

btnHelp.addEventListener('click', function () {
  outputHelp.classList.add('open');
  outputHelp.classList.toggle('is-hidden');

  if (!isNaN(randomNumber)) {
    outputHelp.textContent = `Загаданное число ${randomNumber}`;
  } else {
    outputHelp.textContent = randomNumber;
  }
});

const checkNumber = function (value) {
  if (value !== '') {
    totalAttempts += 1;
  }
  outputAttempts.textContent = `Попыток: ${totalAttempts}`;

  if (Number(value) === randomNumber) {
    // generateNumber(rangeValue);
    clearText();

    if (outputHelp.classList.contains('open')) {
      return `Хитрец! Вы подсмотрели загаданное число ${value}! И ничего не заработали, а только потратили ${currentPoints} баллов за попытки`;
    }

    let point = 15;

    if (rangeValue === '10') {
      point = 5;
    } else if (rangeValue === '100') {
      point = 10;
    }

    counterPoints(point);
    counterCurrentPoints(point);

    return `Ура! Вы угадали число ${value}, с ${totalAttempts}-й попытки! И заработали ${currentPoints} баллов`;
  } else if (rangeValue === 0 || rangeValue === '0') {
    outputAttempts.textContent = '';
    return `Вы не выбрали сложность`;
  } else if (value === '') {
    return `Вы ничего не ввели`;
  } else if (Number(value) < randomNumber) {
    counterPoints(-1);
    counterCurrentPoints(-1);

    return `Загаданное число больше чем ${value}, пробуйте еще!`;
  } else if (Number(value) > randomNumber) {
    counterPoints(-1);
    counterCurrentPoints(-1);

    return `Загаданное число меньше чем ${value}, пробуйте еще!`;
  }
};

btnSubmit.addEventListener('click', function () {
  const value = valueInput.value;
  clearText();
  resultEl.textContent = checkNumber(value);

  if (
    resultEl.textContent ===
      `Ура! Вы угадали число ${value}, с ${totalAttempts}-й попытки! И заработали ${currentPoints} баллов` ||
    resultEl.textContent ===
      `Хитрец! Вы подсмотрели загаданное число ${value}! И ничего не заработали, а только потратили ${currentPoints} баллов за попытки`
  ) {
    resetAttempts();
    document.querySelector('[data-input]').classList.add('is-hidden');
  }
});

btnInfo.addEventListener('click', function () {
  outputInfo.classList.toggle('is-hidden');
});

document.getElementById('reset').onclick = function () {
  location.reload();
};
