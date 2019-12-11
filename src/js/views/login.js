
class LoginUI {
    constructor() {
      this.$form = document.forms['loginForm'];
      this.username = document.getElementById('email-login');
      this.password = document.getElementById('password-login');
    }
  
    get form() {
      return this.$form;
    }
  
    get usernameValue() {
      return this.username.value;
    }
  
    get passwordValue() {
      return this.password.value;
    }
  }
  
  const loginUI = new LoginUI();
  
  export default loginUI;
  