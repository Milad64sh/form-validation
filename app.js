const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show error func
function ShowError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
// show success func
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
// check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    ShowError(input, 'Email is not valid');
  }
}
// check required function
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      ShowError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
// check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    ShowError(
      input,
      `${getFieldName(input)} must be at least ${min} charachters`
    );
  } else if (input.value.length > max) {
    ShowError(
      input,
      `${getFieldName(input)} must be less than ${max} charachters`
    );
  } else {
    showSuccess(input);
  }
}
// check passwords match
function checkPsswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    ShowError(input2, 'Passwords do not match');
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkPassValue();
  checkEmail(email);
  checkPsswordsMatch(password, password2);
  const inputs = document.querySelectorAll('.input');
  inputs.forEach((input) => {
    input.value = '';
  });
});
