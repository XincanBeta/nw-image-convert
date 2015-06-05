var im = require('imagemagick');
var path = require('path');
var formats = {
  'icon.png': 57,
  'icon@2x.png': 114,
  'icon-20.png': 20,
  'icon-20@2x.png': 40,
  'icon-30.png': 30,
  'icon-30@2x.png': 60,
  'icon-40.png': 40,
  'icon-40@2x.png': 80,
  'icon-50.png': 50,
  'icon-50@2x.png': 100,
  'icon-60.png': 60,
  'icon-60@2x.png': 120,
  'icon-72.png': 72,
  'icon-72@2x.png': 144,
  'icon-76.png': 76,
  'icon-76@2x.png': 152,
  'icon-small.png': 29,
  'icon-small@2x.png': 58
};

// 禁用 window 的默认事件
window.ondragover = window.ondrop = function(e) {
  e.preventDefault();
  return false;
}

var el = document.querySelector("#drop");
el.ondragover = function() {
  this.className = "hover";
  this.innerHTML = "Drop the file";
  return false;
}

el.ondragleave = function() {
  this.className = "";
  this.innerHTML = "Drop your icon here ^ ^";
  return false;
}

el.ondrop = function(e) {
  e.preventDefault();
  for (var i = 0; i < e.dataTransfer.files.length; i++) {
		var converted = 0;
    var file = e.dataTransfer.files[i].path;
    // dirname(file) 获取文件所在目录的绝对路径
    for (var format in formats) {
      var size = formats[format]
      var output = path.dirname(file) + path.sep + format;
      im.convert([file, '-resize', size + 'x' + size, output], function(err, stdout) {
        if (err) throw err;
        converted ++;
        if( converted === Object.keys(formats).length ){
        	el.className = '';
        	el.innerHTML = 'Travail terminate';
        	var audio = new Audio('sound/done.wav');
        	audio.play();
        }
      });
    }
  };
}
