const URL = 'https://recipe-app-back.herokuapp.com';

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
  const token = localStorage.getItem('accessToken');
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
  return await axios.get(url, config);
}

async function deleteDataFromApi(url) {
  const token = localStorage.getItem('accessToken');
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
  return await axios.delete(url, config);
}
