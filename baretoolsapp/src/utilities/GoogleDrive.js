import GoogleSignIn from 'react-native-google-sign-in';

const url = 'https://www.googleapis.com/drive/v3';
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3';
const boundaryString = 'indeptive_com_bndry'; // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload

let apiToken = null;

export function setApiToken(token) {
  console.log(token);
  apiToken = token
}

export async function getSignatureStamp() {
  // 1 - Get com.indeptive folder
  var indeptiveFolder = await get(queryParamsForIndeptiveFolder());
  console.log(indeptiveFolder);

  // 2 - Create com.indeptive folder if not found


  // 3 - Get Signature Stamp if it exists
  var signatureStampFile = await get(queryParamsForSignature(indeptiveFolder.id));
  console.log(signatureStampFile);

  return signatureStampFile;
}

function queryParamsForIndeptiveFolder() {
  return encodeURIComponent("mimeType='application/vnd.google-apps.folder' and name='com.indeptive' and 'root' in parents");
}

function queryParamsForSignature(indeptiveFolderId) {
  var q = `mimeType contains 'image' and name='SignatureStampForIndeptive.png' and '${indeptiveFolderId}' in parents`;
  console.log(q);
  return encodeURIComponent(q);
}

function get(qParams) {
  const options = configureGetOptions();
  return fetch(`${url}/files?q=${qParams}`, options)
    .then(parseAndHandleErrors)
    .then((body) => {
      if (body && body.files && body.files.length > 0) {
          console.log(body.files[0].id);
          return body.files[0];
      }
      else {
          return null;
      }
    })
}

function parseAndHandleErrors(response) {
  if (response.ok) {
    return response.json()
  }
  return response.json()
    .then((error) => {
      throw new Error(JSON.stringify(error))
    })
}

function configureGetOptions() {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiToken}`)
  return {
    method: 'GET',
    headers,
  }
}

function configurePostOptions(bodyLength, isUpdate = false) {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiToken}`)
  headers.append('Content-Type', `multipart/related; boundary=${boundaryString}`)
  headers.append('Content-Length', bodyLength)
  return {
    method: isUpdate ? 'PATCH' : 'POST',
    headers,
  }
}

function createMultipartBody(body, isUpdate = false) {
  // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
  const metaData = {
    name: 'data.json',
    description: 'Backup data for my app',
    mimeType: 'application/json',
  }
  // if it already exists, specifying parents again throws an error
  if (!isUpdate) metaData.parents = ['appDataFolder']

  // request body
  const multipartBody = `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`
  + `${JSON.stringify(metaData)}\r\n`
  + `--${boundaryString}\r\nContent-Type: application/json\r\n\r\n`
  + `${JSON.stringify(body)}\r\n`
  + `--${boundaryString}--`

  return multipartBody
}

// uploads a file with its contents and its meta data (name, description, type, location)
export function uploadFile(content, existingFileId) {
  const body = createMultipartBody(content, !!existingFileId)
  const options = configurePostOptions(body.length, !!existingFileId)
  return fetch(`${uploadUrl}/files${existingFileId ? `/${existingFileId}` : ''}?uploadType=multipart`, {
    ...options,
    body,
  })
    .then(parseAndHandleErrors)
}

export async function signInWithGoogleAsync() {
  const result = await GoogleSignIn.configure({
    clientID: '484760334438-h1av8l1pas6flr6anj5qpl6u3j511s62.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
    shouldFetchBasicProfile: true,
  });
}
