webpackJsonp([0],{2:function(e,t,n){function o(){void 0!==a&&(a.destroy(),a=void 0),a=new i(r,{enableExif:!0,showZoomer:!1,viewport:{width:400,height:554},boundary:{width:400,height:554}}),d(".cr-viewport").append('<img id="cover" src="./cover.png" class="cover" />')}var d=n(0),i=n(1),r=document.getElementById("root"),a=void 0;o(),r.addEventListener("update",function(e){a.result("base64").then(function(e){d("#result").prop("src",e)})}),new Dropzone("#file",{url:"/#",createImageThumbnails:!1,previewTemplate:"<div />"}).on("addedfile",function(e){o();var t=new FileReader;t.onload=function(){a.bind({url:t.result})},t.readAsDataURL(e)}),d("#download").click(function(){setTimeout(function(){var e=document.getElementById("result"),t=document.getElementById("cover"),n=document.getElementById("canvas"),o=n.getContext("2d");n.width=e.width,n.height=e.height,o.drawImage(e,0,0,398,550),o.drawImage(t,0,0,398,550),n.toBlob(function(e){return saveAs(e)}),saveAs(n.toDataURL())},500)})}},[2]);
