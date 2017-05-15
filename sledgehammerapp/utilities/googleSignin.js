import Expo from 'expo';

const url = 'https://www.googleapis.com/drive/v3'

const boundaryString = 'foo_bar_baz' // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload

let apiToken = null

export function setApiToken(token) {
  console.log(token);
  apiToken = token
}

export async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '1095046110502-levrqnka7h8grfdib7j6ghh47ngir892.apps.googleusercontent.com',
      iosClientId: '1095046110502-uc48pslth7pgv81fuqh2im7i40svt190.apps.googleusercontent.com',
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.appdata'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

export async function getUserInfo(accessToken) {
  let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}`},
  });

  return userInfoResponse;
}

export async function listFiles() {
  const options = configureGetOptions();
  return fetch(`${url}/files/`, options)
    .then(parseAndHandleErrors)
}

function configureGetOptions() {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiToken}`)
  return {
    method: 'GET',
    headers,
  }
}

function parseAndHandleErrors(response) {
  if (response.ok) {
    let resp = response.json();
    console.log(resp);
    return resp;
  }
  return response.json()
    .then((error) => {
      throw new Error(JSON.stringify(error));
    })
}
