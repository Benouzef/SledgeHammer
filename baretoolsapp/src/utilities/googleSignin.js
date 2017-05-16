import GoogleSignIn from 'react-native-google-sign-in';

let apiToken = null

export function setApiToken(token) {
  console.log(token);
  apiToken = token
}

export async function signInWithGoogleAsync() {
  const result = await GoogleSignIn.configure({
    clientID: '484760334438-h1av8l1pas6flr6anj5qpl6u3j511s62.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.appdata'],
    shouldFetchBasicProfile: true,
  });
}
