'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Ester Minja',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-08-06T17:01:17.194Z',
    '2024-08-01T23:36:17.929Z',
    '2024-08-11T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Geraldo Bitri',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const account3 = {
  owner: 'Jessica Davis',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2020-12-01T13:15:33.035Z',
    '2020-10-30T09:48:16.867Z',
    '2020-09-25T06:04:23.907Z',
    '2020-02-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-03-10T14:43:26.374Z',
    '2020-08-25T18:49:59.371Z',
    '2020-05-26T12:01:20.894Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP', // Japanese (Japan)
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90, -50, 300, -60],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2021-01-15T10:12:45.987Z',
    '2021-03-22T14:27:38.123Z',
    '2021-04-10T08:55:21.456Z',
    '2021-06-17T19:45:33.789Z',
    '2021-07-04T22:11:05.654Z',
    '2021-09-14T13:29:47.012Z',
    '2021-11-02T05:33:09.876Z',
    '2021-12-20T16:15:31.321Z',
  ],
  currency: 'INR',
  locale: 'hi-IN', // Hindi (India)
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date, locale) {
  //calculating how many days have past from two dates
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); //converting from miliseconds to days

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  //if none of the conditions are met, the coe below gets excecuted
  /*
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
  */
  return new Intl.DateTimeFormat(locale).format(date);
};
//reusable for the currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displayMovements = function (acc, sort = false) {
  //empy-ing the entire container
  containerMovements.innerHTML = '';

  //sorting movements
  //we dont want to change the original array movements, so we create a copy of it (slice)
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  //adding elements, looping over the movements
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]); //lopping over two arrays at the same time

    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`;
    //attaching the html to the movement div
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Displaying Deposit summary to html (in)
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

//display-ing the amount in website
//by passing movements argument to the function, we do not save it in the account
//so we have to pass the account, read the movements from that account and then
//create a new property balance in that account
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  //foreach
  accs.forEach(function (acc) {
    //adding a new property
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(
        name => name[0] //returning the fist letter
      )
      .join(''); //stw
  });
  //console.log(accs);
};
createUsernames(accounts); //adding a username property in accounts

const updateUI = function (acc) {
  //display movements
  displayMovements(acc);
  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
};
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0); //40
    //in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 sseconds stop timer and logout user
    if (time === 0) {
      clearInterval(timer); //stop the timer
      //display iui and welcome message
      labelWelcome.textContent = 'Log in to get started';

      containerApp.style.opacity = 0; //making the page visible for the user
    }

    //decrease 1 sec every second
    time--;
  };
  //set time to 10 mins
  let time = 600;
  tick();
  //call the timer everysecond
  const timer = setInterval(tick, 1000);
  return timer;
};
//event handler
let currentAccount, timer;
/*
//FAKE always LOGIN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
*/
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevents the form from submitin and reloading the page
  //getting the username
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //console.log(currentAccount);
  //to acces  the pin
  //?to see if the acc exists, if not it returns undefined ( not error)
  if (currentAccount?.pin === +inputLoginPin.value) {
    //display iui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100; //making the page visible for the user

    //create current date and time
    //experimenting API
    const now = new Date();
    //to display it the way we want it, we create an object and put it in the function below
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //or long or 2-digit
      year: 'numeric',
      //weekday: 'long', //short
    };
    //const locale = navigator.language; //getting it from the browser
    //labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //hiding the input field

    //to make a clear transition from one user to another we clear the time if we were
    //logged in before. the time starts again from the start with the new account
    //if there is another timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

//conversion
const currencyConversionRates = {
  'EUR-USD': 1.1, // 1 EUR = 1.10 USD
  'USD-EUR': 0.91, // 1 USD = 0.91 EUR

  'EUR-JPY': 150.23, // 1 EUR = 150.23 JPY
  'JPY-EUR': 0.0067, // 1 JPY = 0.0067 EUR

  'EUR-INR': 90.55, // 1 EUR = 90.55 INR
  'INR-EUR': 0.011, // 1 INR = 0.011 EUR

  'USD-JPY': 137.5, // 1 USD = 137.50 JPY
  'JPY-USD': 0.0073, // 1 JPY = 0.0073 USD

  'USD-INR': 83.33, // 1 USD = 83.33 INR
  'INR-USD': 0.012, // 1 INR = 0.012 USD

  'JPY-INR': 0.6, // 1 JPY = 0.60 INR
  'INR-JPY': 1.67, // 1 INR = 1.67 JPY
};

const convertCurrency = function (amount, fromCurrency, toCurrency) {
  const conversionRate =
    currencyConversionRates[`${fromCurrency}-${toCurrency}`];
  return amount * conversionRate;
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value; //getting the amount we want to transfer
  const recieverAcc = accounts.find(
    //currac => we want to find the acc where username === ...
    acc => acc.username === inputTransferTo.value
  );
  //cleaning the input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  //transfering positive amount, checking if the user has the amount to transfer
  //and we should not transfer money to ourselves
  if (
    amount > 0 &&
    recieverAcc && //to see if the recieveracc exists
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    const senderCurrency = currentAccount.currency; // Replace with the actual sender's currency
    const receiverCurrency = recieverAcc.currency; // Replace with the actual receiver's currency
    //console.log(senderCurrency + '  ' + receiverCurrency);
    //console.log(convertCurrency(amount, senderCurrency, receiverCurrency));
    //doing the transfer
    //now we have to add the value to the other accounts
    // balance and decrease the value in this account that send the money
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(
      convertCurrency(amount, senderCurrency, receiverCurrency)
    );
    //pushing the date also in the movmentsdates array
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());
  }
  updateUI(currentAccount);

  //the time captures inactivity moments of the user
  //reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});
//one acc can loan only if there is at least one deposit with at least 10% of the requested loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add movements
      currentAccount.movements.push(amount);

      //pushing the loan date also in the movmentsdates array
      currentAccount.movementsDates.push(new Date().toISOString());
      //update UI
      updateUI(currentAccount);

      //the time captures inactivity moments of the user
      //reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

//closing the account means deleting an account (slice) from the array accounts
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //check if the user is correct and the pin
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    //loops over the array and in each iteration, it gets access to the current account
    const index = accounts.findIndex(
      acc => acc.username == currentAccount.username //and we find the one where account has the username= currentaccountusername
    );
    //deleting the user
    accounts.splice(index, 1);
    //loging out- hiding the ui
    containerApp.style.opacity = 0;
  }
  //cleaning the input fields
  inputCloseUsername.value = inputClosePin.value = '';
});

//sorting by clicking in the sort button
let sorted = false; //to check weather we sorted or not
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted); //we sort it.
  sorted = !sorted; //flip the var. changing sorted from true to false and from false to true
});
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
