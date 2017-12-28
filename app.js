import { importKey, encrypt } from './index.js';

const key = document.querySelector('#key');
const input = document.querySelector('#input');
const output = document.querySelector('#output');

input.addEventListener('input', async () => {
  // base64 エンコードされた公開鍵をデコードする
  const publicKey = atob(key.value.trim());

  try {
    // 公開鍵を import する
    const key = await importKey(publicKey);

    // import した公開鍵を使って暗号化する
    const data = await encrypt(key, input.value);

    // base64 エンコードする
    output.value = btoa(data);
  } catch (error) {
    console.error(error);
  }
});
