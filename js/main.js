const btnSubmit = document.querySelector('button[data-submit]');
const valueInput = document.querySelector('input[data-value]');
const resultEl = document.querySelector('.js-output');
const attemptsEl = document.querySelector('.js-attempts');
const chooseLvl = document.querySelector('[data-lvl]');
const btnHelp = document.querySelector('[data-help]');
const outputHelp = document.querySelector('.js-help');
const btnRefresh = document.querySelector('[data-refresh]');

let rangeValue = 0;
let randomNumber = 'Вы не выбрали сложность!';
let totalAttempts = 0;

const generateNumber = function (rangeValue) {
  randomNumber =
    rangeValue !== '0'
      ? Math.round(Math.random() * (rangeValue - 1) + 1)
      : 'Вы не выбрали сложность!';
};

const clearText = function () {
  outputHelp.textContent = '';
  resultEl.textContent = '';
  valueInput.value = '';
};

const resetAttempts = function () {
  totalAttempts = 0;
  attemptsEl.textContent = '';
};

chooseLvl.addEventListener('change', function () {
  rangeValue = chooseLvl.value;
  clearText();
  resetAttempts();

  let message = '';

  if (rangeValue !== '0') {
    message = `Угадай число от 1 до ${rangeValue}`;
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
});

btnHelp.addEventListener('click', function () {
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
  attemptsEl.textContent = `Попыток: ${totalAttempts}`;

  if (Number(value) === randomNumber) {
    generateNumber(rangeValue);
    clearText();
    return `Ура! Вы угадали число ${value} с ${totalAttempts} попытки!`;
  } else if (rangeValue === 0 || rangeValue === '0') {
    attemptsEl.textContent = '';
    return `Вы не выбрали сложность`;
  } else if (value === '') {
    return `Вы ничего не ввели`;
  } else if (Number(value) < randomNumber) {
    return `Загаданное число больше чем ${value}, пробуйте еще!`;
  } else if (Number(value) > randomNumber) {
    return `Загаданное число меньше чем ${value}, пробуйте еще!`;
  }
};

btnSubmit.addEventListener('click', function () {
  const value = valueInput.value;
  clearText();
  resultEl.textContent = checkNumber(value);

  if (
    resultEl.textContent ===
    `Ура! Вы угадали число ${value} с ${totalAttempts} попытки!`
  ) {
    resetAttempts();
  }
});
