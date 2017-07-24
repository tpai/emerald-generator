const $ = require('cash-dom');
const Croppie = require('croppie');
require('./styles');

class Generator {
    constructor(target) {
        $(target).attr('class', 'gr-container');
        $(target).append(`
<div class="gr-container">
    <div id="file" class="gr-fileupload">
        圖片上傳...
    </div>
    <div style="margin-bottom: 1rem">
        縮放：手機雙指、桌機滑鼠滾輪
    </div>
  <div class="gr-parent">
    <div id="target"></div>
  </div>
</div>
<button id="download" class="gr-button">下載</button>
<img id="result" src="" style="display: none" />
<img id="cover" src="./cover.png" style="display: none" />
<canvas id="canvas" style="display: none"></canvas>`);

        this.target= document.getElementById('target');
        this.croppie = undefined;
        this.dropzone = undefined;
        this.initCroppie();
        this.initDropzone();
        this.bindListener();
    }
    initCroppie = () => {
        if (typeof this.croppie !== 'undefined') {
            this.croppie.destroy();
            this.croppie = undefined;
        }
        this.croppie = new Croppie(target, {
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
        $('.cr-viewport').append('<img src="./cover.png" class="gr-mask" />');
    }
    initDropzone = () => {
        this.dropzone = new Dropzone('#file', {
            url: '/#',
            createImageThumbnails: false,
            previewTemplate: '<div />'
        });
        this.dropzone.on('addedfile', file => {
            this.initCroppie();
            let fr = new FileReader();
            fr.onload = () => {
                this.croppie.bind({ url: fr.result });
            };
            fr.readAsDataURL(file);
        });
    }
    bindListener = () => {
        this.target.addEventListener('update', evt => {
            this.croppie.result({
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

        document.getElementById('download').addEventListener('click', () => {
            setTimeout(() => {
                const result = this.scaleIt(document.getElementById('result'), 1 / 2);
                const cover = this.scaleIt(document.getElementById('cover'), 1 / 2);
                let canvas = document.getElementById('canvas');
                let context = canvas.getContext('2d');
                canvas.width = 400;
                canvas.height = 554;
                context.drawImage(result, 0, 0);
                context.drawImage(cover, 0, 0);
                canvas.toBlob(blob => saveAs(blob));
            }, 500);
        });
    }
    scaleIt = (source, scaleFactor) => {
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');
        const w = source.width * scaleFactor;
        const h = source.height * scaleFactor;
        c.width = w;
        c.height = h;
        ctx.drawImage(source, 0, 0, w, h);
        return c;
    }
}

window.Generator = Generator;
