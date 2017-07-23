const $ = require('jquery');
const Croppie = require('croppie');

const root = document.getElementById('root');

let crop;
reInitInstance();

root.addEventListener('update', evt => {
    crop.result({
        type: 'rawcanvas',
        size: {
            width: 800,
            height: 1108
        },
        format: 'png'
    }).then(canvas => {
        $('#result').prop('src', canvas.toDataURL());
    });
});

const files = new Dropzone('#file', {
    url: '/#',
    createImageThumbnails: false,
    previewTemplate: '<div />'
});

files.on('addedfile', file => {
    reInitInstance();
    let fr = new FileReader();
    fr.onload = function() {
        crop.bind({ url: fr.result });
    };
    fr.readAsDataURL(file);
});

$('#download').click(() => {
    setTimeout(() => {
        const result = scaleIt(document.getElementById('result'), 1 / 2);
        const cover = scaleIt(document.getElementById('cover'), 1 / 2);
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 554;
        context.drawImage(result, 0, 0);
        context.drawImage(cover, 0, 0);
        canvas.toBlob(blob => saveAs(blob));
    }, 500);
});

function scaleIt(source, scaleFactor) {
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    const w = source.width * scaleFactor;
    const h = source.height * scaleFactor;
    c.width = w;
    c.height = h;
    ctx.drawImage(source, 0, 0, w, h);
    return c;
}

function reInitInstance() {
    const cover = '<img src="./cover.png" class="mask" />';
    if (typeof crop !== 'undefined') {
        crop.destroy();
        crop = undefined;
    }
    crop = new Croppie(root, {
        enableExif: true,
        showZoomer: false,
        viewport: {
            width: 400,
            height: 554
        },
        boundary: {
            width: 400,
            height: 554
        }
    });
    $('.cr-viewport').append(cover);
}
