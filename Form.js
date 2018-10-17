import React from "react";
import Submit from "./submit";
export default class Form extends React.Component {
  state = {
    username: "",
    email: "",
    age: "",
    formErrors: { username: "", email: "", age: "" },
    usernameValid: false,
    emailValid: false,
    ageValid: false,
    formValid: false,
    isSubmitClick: false
  };

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let ageValid = this.state.ageValid;

    switch (fieldName) {
      case "username":
        usernameValid =
          value.length > 5 &&
          value.length < 11 &&
          isNaN(value[0]) &&
          !value.match(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
        fieldValidationErrors.username = usernameValid ? "" : "is Invalid";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "age":
        var today = new Date();
        var birthDate = new Date(value);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age = age - 1;
        }

        ageValid = age >= 18;
        fieldValidationErrors.age = ageValid ? "" : "you are not 18 years!";

        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        emailValid: emailValid,
        ageValid: ageValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.usernameValid && this.state.emailValid && this.state.ageValid
    });
  }

  onReset = () => {
    this.setState({
      username: "",
      email: "",
      age: ""
    });
  };
  onSubmit = () => {
    this.setState({ isSubmitClick: true });
  };
  render() {
    if (this.state.isSubmitClick === false)
      return (
        <form>
          <input
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleInput}
          />
          <br />
          {this.state.formErrors.username}
          <br />
          <input
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleInput}
          />
          <br />
          {this.state.formErrors.email}
          <br />

          <input
            name="age"
            type="date"
            value={this.state.age}
            onChange={this.handleInput}
          />
          <br />
          {this.state.formErrors.age}
          {this.state.formValid}
          <br />
          <button
            disabled={!this.state.formValid}
            onClick={() => this.onSubmit()}
          >
            Submit{" "}
          </button>
          <button onClick={() => this.onReset()}>reset </button>
        </form>
      );
    else return <Submit />;
  }
}
