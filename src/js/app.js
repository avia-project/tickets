import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import loginUI from './views/login';
import registerUI from './views/register';

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
  }

  const loginForm = loginUI.form;

  function authenticate(data) {
    const { username } = data;
    localStorage.setItem('user', JSON.stringify(data));
    const noAuth = document.getElementById('no-auth');
    const auth = document.getElementById('auth');
    noAuth.style.display = 'none';
    auth.style.display = 'flex';
    const usernameLabel = document.getElementById('username');
    usernameLabel.innerText = username;

    //hideForm(loginUI);
    //hideForm(registerUI);
  }

  /*function hideForm(formUI) {
    formUI.username.value = "";
    formUI.password.value = "";

    console.log("hiding form called");
  }*/

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

  logoutBtn.addEventListener('click', () => logout());

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
        alert('login')
        authenticate(data);
      });
  });

  const registerForm = registerUI.form;

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
});
