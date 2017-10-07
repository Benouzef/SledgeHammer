import GoogleSignIn from 'react-native-google-sign-in';

export async function signInWithGoogleAsync() {
  const result = await GoogleSignIn.configure({
    clientID: '45295109591-nt5ob968mg0vkpsjcee4kf55msslgv7k.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    shouldFetchBasicProfile: true,
  });
}
