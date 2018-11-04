const fs = require('fs');
const wallpaper = require('wallpaper');
const fetch = require('node-fetch');

const client_id = 'd9db0b00cf5196e511534fbf74101e5c761d9b5c877b0ad089f6745900e3b729';

(async function app() {
  const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${client_id}`);

  const json = await res.json();

  const imgUrl = await fetch(json.urls.full);

  const downloadImg = imgUrl.body.pipe(
    fs.createWriteStream('wallpaper.png').on('close', async function() {
      console.log('pic saved!');
      const success = await wallpaper.set('wallpaper.png');
    })
  );
})();
