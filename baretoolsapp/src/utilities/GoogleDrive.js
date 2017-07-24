import GoogleSignIn from 'react-native-google-sign-in';

const url = 'https://www.googleapis.com/drive/v3';
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3';
const baseSpreadSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
const fileUrl = 'https://www.googleapis.com/drive/v3/files/';
const boundaryString = 'indeptive_com_bndry'; // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload
const templateFileForTimesheets = '1U7QxwfKcMl5JjVY5kP7x44cefXseojZC3owys8k3Vts';

let apiToken = null;

export function setApiToken(token) {
  apiToken = token
}

export async function getIndeptiveFolder() {
  var folder = await get(queryParamsForIndeptiveFolder());

  if (folder == null) {
    createDirectory('com.indeptive');
    folder = getIndeptiveFolder();
  }

  return folder;
}

export async function getSignatureStamp(indeptiveFolder) {
  // 3 - Get Signature Stamp if it exists
  var signatureStampFile = await get(queryParamsForSignature(indeptiveFolder.id), 'files/webContentLink,files/id,files/thumbnailLink');

  return signatureStampFile;
}

function queryParamsForIndeptiveFolder() {
  return encodeURIComponent("mimeType='application/vnd.google-apps.folder' and name='com.indeptive' and 'root' in parents");
}

function queryParamsForSignature(indeptiveFolderId) {
  var q = `mimeType contains 'image' and name='SignatureStampForIndeptive.png' and trashed=false and '${indeptiveFolderId}' in parents`;
  return encodeURIComponent(q);
}

function get(qParams, withFields) {
  const options = configureGetOptions();
  return fetch(`${url}/files?q=${qParams}${withFields ? `&fields=${withFields}` : ''}`, options)
    .then(parseAndHandleErrors)
    .then((body) => {
      if (body && body.files && body.files.length > 0) {
          return body.files[0];
      }
      else {
          return null;
      }
    })
}

function parseAndHandleErrors(response) {
  //console.log('response', response);

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

function configurePutOptions() {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiToken}`)
  return {
    method: 'PUT',
    headers,
  }
}

function createDirectory(directoryName) {
  const metaData = {
    name: directoryName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [ 'root' ]
  }

  const body = `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`
  + `${JSON.stringify(metaData)}\r\n`
  + `--${boundaryString}--`
  const options = configurePostOptions(0, false);
  return fetch(`${url}/files`, {
    ...options,
    body,
  })
  .then(parseAndHandleErrors);
}

export function copySpreadSheet(folderId) {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiToken}`)
  const options =  {
    method: 'POST',
    headers,
  }

  return fetch(`${fileUrl}${templateFileForTimesheets}/copy`, {
    ...options
  })
  .then(parseAndHandleErrors)
  .then((body) => {
    if (body && body.id) {
        var result = [];
        result.push(folderId);
        result.push(body.id);
        return result;
    }
    else {
        return null;
    }
  }
  );
}

export function createSpreadSheet(folderId) {
  const options = configurePostOptions(0, false);
  return fetch(`${baseSpreadSheetUrl}`, {
    ...options
  })
  .then(parseAndHandleErrors)
  .then((body) => {
    if (body && body.spreadsheetId) {
        var result = [];
        result.push(folderId);
        result.push(body.spreadsheetId);
        return result;
    }
    else {
        return null;
    }
  }
  );
}

export function enterDataInSpreadSheet(id, range, values) {
  const options = configurePutOptions();
  const metaData = {
    range: range,
    majorDimension: 'ROWS',
    values: [values]
  }

  const body = `${JSON.stringify(metaData)}\r\n`
  return fetch(`${baseSpreadSheetUrl}/${id}/values/${range}?valueInputOption=USER_ENTERED`, {
    ...options,
    body
  })
  .then(parseAndHandleErrors)
  .then(
    () => { return id; }
  );
}

export function moveSpreadSheet(id, name, directoryId) {
  const metaData = {
    addParents: directoryId,
    name: name
  }

  const body = `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`
  + `${JSON.stringify(metaData)}\r\n`
  + `--${boundaryString}--`
  const options = configurePostOptions(0, true);
  return fetch(`${url}/files/${id}?removeParents=root&addParents=${directoryId}`, {
    ...options,
    body,
  })
  .then(parseAndHandleErrors);
}

function createMultipartBody(body, isUpdate = false, indeptiveFolderId = null) {
  // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
  const metaData = {
    name: 'SignatureStampForIndeptive.png',
    description: 'Signature stamp used for timesheet',
    mimeType: 'image/png',
  }
  // if it already exists, specifying parents again throws an error

  if (!isUpdate) metaData.parents = [`${indeptiveFolderId}`];

  // request body
  const multipartBody = `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`
  + `${JSON.stringify(metaData)}\r\n`
  + `--${boundaryString}\r\nContent-Type: image/png\r\n`
  + `Content-Transfer-Encoding: base64\r\n\r\n`
  + `${body}\r\n`
  + `--${boundaryString}--`;

  return multipartBody;
}

// uploads a file with its contents and its meta data (name, description, type, location)
export function uploadFile(content, existingFileId, indeptiveFolderId) {
  var isUpdate = true;
  var fileIdToAppend = '/' + existingFileId;
  if (existingFileId == 'null') {
    isUpdate = false;
    fileIdToAppend = '';
  }

  const body = createMultipartBody(content, isUpdate, indeptiveFolderId)
  const options = configurePostOptions(body.length, isUpdate);

  return fetch(`${uploadUrl}/files${fileIdToAppend}?uploadType=multipart`, {
    ...options,
    body,
  })
    .then(parseAndHandleErrors);
}

export async function signInWithGoogleAsync() {
  const result = await GoogleSignIn.configure({
    clientID: '484760334438-h1av8l1pas6flr6anj5qpl6u3j511s62.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
    shouldFetchBasicProfile: true,
  });
}
