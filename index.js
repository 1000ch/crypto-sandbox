const { subtle } = window.crypto || window.msCrypto;

function stringToArrayBuffer(string) {
  const length = string.length;
  const arrayBuffer = new ArrayBuffer(string.length);
  const arrayBufferView = new Uint8Array(arrayBuffer);

  for (let i = 0; i < length; i++) {
    arrayBufferView[i] = string.charCodeAt(i);
  }

  return arrayBuffer;
}

function arrayBufferToString(arrayBuffer) {
  const arrayBufferView = new Uint8Array(arrayBuffer);
  const byteLength = arrayBufferView.byteLength;

  let string = '';
  for (let i = 0; i < byteLength; i++) {
    string += String.fromCodePoint(arrayBufferView[i]);
  }

  return string;
}

export async function importKey(string) {
  // 公開鍵を array buffer に変換する
  const ab = stringToArrayBuffer(string);

  // array buffer になった公開鍵を使って CryptoKey を生成する
  const key = await subtle.importKey('spki', ab, {
    name: 'RSA-OAEP',
    hash: {
      name: 'SHA-256'
    }
  }, false, ['encrypt']);

  return key;
}

export async function encrypt(key, string) {
  // 暗号化する文字列を array buffer に変換する
  const ab = stringToArrayBuffer(string);

  // 公開鍵を使って暗号化する
  const data = await subtle.encrypt({
    name: 'RSA-OAEP'
  }, key, ab);

  // 暗号化したデータを文字列に変換する
  return arrayBufferToString(data);
}
