const URL = 'https://recipe-app-back.herokuapp.com';

const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');

signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  new FormData(signInForm);
});

signInForm.addEventListener('formdata', (e) => {
  const data = Object.fromEntries(e.formData);

  postDataToApi(`${URL}/auth/signin`, data)
    .then((res) => {
      const { accessToken } = res.data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        window.location.href = 'main.html';
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  new FormData(signUpForm);
  signUpForm.reset();
});

signUpForm.addEventListener('formdata', (e) => {
  const data = Object.fromEntries(e.formData);

  postDataToApi(`${URL}/auth/signup`, data)
    .then((res) => {
      alert('all ok, please signIn with this credentials !');
    })
    .catch((error) => {
      console.log(error);
    });
});

async function postDataToApi(url, data, token = null) {
  const config = {
    headers: {
      mode: 'no-cors',
      Authorization: `Bearer ${token}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  };
  return await axios.post(url, data, config);
}

async function getDataFromApi(url) {
  return await axios.get(url);
}
