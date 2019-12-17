import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import loginUI    from './views/login';
import registerUI from './views/register';
import userPageUI from './views/userpage';
import {getModalInstance} from './plugins/materialize';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    loadLocalStorage();
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  function loadLocalStorage() {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      const data = JSON.parse(userStorage);
      console.log(data);
      authenticate(data);
    }
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    const buttons = document.getElementsByClassName("add_ticket");
    Array.from(buttons).forEach(button => {
      button.addEventListener("click", function () {
        const body = locations.lastSearch[button.value];
        let currency = ticketsUI.getCurrencySymbol();
        body['username'] = document.getElementById('usrpg-title').innerText;
        body['currency'] = currency;
        userPageUI.addTicket(locations.lastSearch[button.value], currency, 1);
        fetch(`http://www.aviadata.loc/ticket/add`, { method: 'POST', body: JSON.stringify(body) })
            .then(response => {
              if (response.ok)
                return response.json();
              else {
                alert('ERROR adding ticket');
                throw response;
              }
            })
            .then(data => {
              alert('added');
            });
      });
    });
  }

  const loginForm     = loginUI.form;
  const registerForm  = registerUI.form;

  const loginModal    = getModalInstance(document.getElementById('modal1'));
  const registerModal = getModalInstance(document.getElementById('modal2'));
  const userPageModal = getModalInstance(document.getElementById('modal3'));


  function authenticate(data) {
    const { username } = data;
    const { tickets } = data;
    userPageUI.clearContainer();
    userPageUI.tickets = tickets;
    userPageUI.renderTickets();
    localStorage.setItem('user', JSON.stringify(data));
    const noAuth = document.getElementById('no-auth');
    const auth = document.getElementById('auth');
    noAuth.style.display = 'none';
    auth.style.display = 'flex';
    const usernameButton = document.getElementById('userpage');
    usernameButton.innerText = username;

    const userPageTitle = document.getElementById('usrpg-title');
    userPageTitle.innerText = username;

    if ((typeof loginModal != ('undefined')) || loginModal.isOpen)
      hideLoginForm();

    if ((typeof registerModal != ('undefined')) || registerModal.isOpen)
      hideRegisterForm();
  }

  function hideLoginForm() {
    loginUI.username.value = "";
    loginUI.password.value = "";

    loginModal.close();
  }

  function hideRegisterForm() {
    registerUI.username.value = "";
    registerUI.password.value = "";

    registerModal.close();
  }

  function incorrectData(formUI) {
    formUI.password.value = "";

    var message;
    if (formUI === registerUI)
      message = "User with this username is already exists";
    else message = "Incorrect data";

    alert(message);
  }

  function logout() {
    localStorage.clear();
    const noAuth = document.getElementById('no-auth');
    const auth = document.getElementById('auth');
    noAuth.style.display = 'block';
    auth.style.display = 'none';
  }

  const logoutBtn = document.getElementById('logout');
  const userPageBtn = document.getElementById('usrpg-close-btn');

  logoutBtn.addEventListener('click', () => logout());

  userPageBtn.addEventListener('click', () => {
    userPageModal.close();
  });

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const body = {
      username: loginUI.usernameValue,
      password: loginUI.passwordValue
    };
    fetch(`http://www.aviadata.loc/login`, { method: 'POST', body: JSON.stringify(body) })
      .then(response => {
          if (response.ok)
            return response.json();
          else { 
            incorrectData(loginUI);
            throw response;
          }
      })
      .then(data => {
        alert('login');
        authenticate(data);
      });
  });

  registerForm.addEventListener('submit', event => {
    event.preventDefault();
    const body = {
      username: registerUI.usernameValue,
      password: registerUI.passwordValue
    };
    fetch(`http://www.aviadata.loc/register`, { method: 'POST', body: JSON.stringify(body) })
      .then(response => {
          if (response.ok) 
            return response.json();
          else { 
            incorrectData(registerUI);
            throw response;
          }
        })
      .then(data => {
        alert('Register');
        authenticate(data);
      });
  });

  function addTicket() {
    console.log("Foo");
  }
});
