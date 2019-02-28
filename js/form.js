var input = document.querySelector('input');
var preview = document.querySelector('.preview');

input.style.opacity = 0;

input.addEventListener('change', updateImageDisplay);

var curFiles = "";

function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  curFiles = input.files;
  if (curFiles.length === 0) {
    var para = document.createElement('p');
    para.textContent = 'ファイルが選択されていません';
    preview.appendChild(para);
  } else {
    var list = document.createElement('ol');
    preview.appendChild(list);
    for (var i = 0; i < curFiles.length; i++) {
      var listItem = document.createElement('li');
      var para = document.createElement('p');

      if (validFileType(curFiles[i])) {
        var name = curFiles[i].name;
        para.textContent = name;
        listItem.appendChild(para);

        var nameReplace = name.replace('kml', 'csv');
        var downloadName = document.getElementById("download");
        downloadName.setAttribute("download", nameReplace)

      } else {
        para.textContent = curFiles[i].name + ' はファイル形式が有効ではありません。選択し直してください。';
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

var fileTypes = [
  'application/vnd.google-earth.kml+xml'
]

function validFileType(file) {
  for (var i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}
