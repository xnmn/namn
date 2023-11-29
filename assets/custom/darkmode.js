function getUserPreference() {
  return localStorage.getItem('theme') || 'system';
}
function saveUserPreference(userPreference) {
  localStorage.setItem('theme', userPreference);
}

function getAppliedMode(userPreference) {
  if (userPreference === 'light') {
    return 'light';
  }
  if (userPreference === 'dark') {
    return 'dark';
  }
  // system
  if (matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

function setAppliedMode(mode) {
  document.documentElement.dataset.appliedMode = mode;
}

function rotatePreferences(userPreference) {
  if (userPreference === 'system') {
    return 'light';
  }
  if (userPreference === 'light') {
    return 'dark';
  }
  if (userPreference === 'dark') {
    return 'light';
  }
  // for invalid values, just in case
  return 'system';
}

const themeDisplay = document.getElementById('mode');
const themeToggler = document.getElementById("checkbox");

let userPreference = getUserPreference();
setAppliedMode(getAppliedMode(userPreference));
themeDisplay.innerText = '';

themeToggler.onclick = () => {

  const newUserPref = rotatePreferences(userPreference);
  userPreference = newUserPref;
  saveUserPreference(newUserPref);
  themeDisplay.innerText = '';
  setAppliedMode(getAppliedMode(newUserPref));
  ballState();
}


function ballState() {
  let ball = document.querySelector(".ball");
  if (userPreference === 'dark') {
    ball.classList.add("dark-ball");
  } else {
    ball.classList.remove("dark-ball");
  }
}

window.onload = ballState();
