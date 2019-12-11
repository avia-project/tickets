
class RegisterUI {
    constructor() {
      this.$form = document.forms['registerForm'];
      this.username = document.getElementById('email-register');
      this.password = document.getElementById('password-register');
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
  
  const registerUI = new RegisterUI();
  
  export default registerUI;
  