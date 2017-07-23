webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var Croppie = __webpack_require__(1);

var root = document.getElementById('root');

var crop = void 0;
reInitInstance();

root.addEventListener('update', function (evt) {
    crop.result({
        type: 'rawcanvas',
        size: {
            width: 800,
            height: 1108
        },
        format: 'png'
    }).then(function (canvas) {
        $('#result').prop('src', canvas.toDataURL());
    });
});

var files = new Dropzone('#file', {
    url: '/#',
    createImageThumbnails: false,
    previewTemplate: '<div />'
});

files.on('addedfile', function (file) {
    reInitInstance();
    var fr = new FileReader();
    fr.onload = function () {
        crop.bind({ url: fr.result });
    };
    fr.readAsDataURL(file);
});

$('#download').click(function () {
    setTimeout(function () {
        var result = scaleIt(document.getElementById('result'), 1 / 2);
        var cover = scaleIt(document.getElementById('cover'), 1 / 2);
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 554;
        context.drawImage(result, 0, 0);
        context.drawImage(cover, 0, 0);
        canvas.toBlob(function (blob) {
            return saveAs(blob);
        });
    }, 500);
});

function scaleIt(source, scaleFactor) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var w = source.width * scaleFactor;
    var h = source.height * scaleFactor;
    c.width = w;
    c.height = h;
    ctx.drawImage(source, 0, 0, w, h);
    return c;
}

function reInitInstance() {
    var cover = '<img src="./cover.png" class="mask" />';
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

/***/ })

},[2]);