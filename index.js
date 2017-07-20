const $ = require('jquery');
const Croppie = require('croppie');

const root = document.getElementById('root');

let crop;
reInitInstance();

root.addEventListener('update', evt => {
  crop.result('base64').then(dataurl => {
    $('#result').prop('src', dataurl);
  });
});

const files = new Dropzone('#file', {
    url: '/#',
    createImageThumbnails: false,
    previewTemplate: '<div />'
});

files.on('addedfile', file => {
    reInitInstance();
    var fr = new FileReader();
    fr.onload = function() {
        crop.bind({ url: fr.result });
    };
    fr.readAsDataURL(file);
});

$('#download').click(() => {
    setTimeout(() => {
      var img1 = document.getElementById('result');
      var img2 = document.getElementById('cover');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      canvas.width = img1.width;
      canvas.height = img1.height;
      context.drawImage(img1, 0, 0, 398, 550);
      context.drawImage(img2, 0, 0, 398, 550);
      canvas.toBlob(blob => saveAs(blob));
      saveAs(canvas.toDataURL());
    }, 500);
});

function reInitInstance() {
    const cover = '<img id="cover" src="./cover.png" class="cover" />';
    if (typeof crop !== 'undefined') {
        crop.destroy();
        crop = undefined;
    }
    crop = new Croppie(root, {
      enableExif: true,
      showZoomer: false,
      viewport: { width: 400, height: 554 },
      boundary: { width: 400, height: 554 }
    });
    $('.cr-viewport').append(cover);
}
