var obj1 = document.getElementById("fileKml");
var file = "";
var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
var content = "";
var name = "";

//ダイアログでファイルが選択された時
obj1.addEventListener("change", function(evt) {

  file = evt.target.files;

  //テキスト形式で読み込む
  for (var j = 0; j < file.length; j++) {
    content = "";
    content = 'name,lon,lat,range';
    //FileReaderの作成
    var reader = new FileReader();
    reader.readAsText(file[j]);

    //読込終了後の処理
    reader.onload = function(ev) {
      //いったん架空のテキストエリアに表示する
      var textkml = reader.result;
      var divData = document.getElementById("dataaa");
      divdata = "";
      divData.innerHTML = textkml;

      //架空のエリアからタグ検索
      var wpts = divData.getElementsByTagName("Placemark");

      console.log(wpts.length);
      //要素検索
      for (var i = 0; i < wpts.length; i++) {

        console.log(wpts[i]);

        //name
        var names = wpts[i].getElementsByTagName("name");
        if (names.length > 0 && names[0] != null) name = names[0].innerHTML;
        console.log(i);
        console.log(name);

        //緯度経度
        var lons = wpts[i].getElementsByTagName("longitude");
        if (lons.length > 0 && lons[0] != null) {
          var lon = lons[0].innerHTML;
          console.log(lon);
        }
        var lata = wpts[i].getElementsByTagName("latitude");
        if (lata.length > 0 && lata[0] != null) {
          var lat = lata[0].innerHTML;
          console.log(lat);
        }


        makeContent(name, lon, lat);
      } //i
    } //onload
  } //for j
}, false);

function makeContent(name, lon, lat) {
  $.getJSON('http://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?', {
      lon: lon,
      lat: lat,
      outtype: JSON
    })
    // 結果を取得したら
    .done(function(data) {
      if (data) {
        console.log(data.elevation);
        content += ("\n" + name + "," + lon + "," + lat + "," + data.elevation);
        console.log(content)
      } else {
        alert(i + '番目の標高が取得できませんでした')
      }
    });
}


//ファイル作成
function kml2csv() {
  console.log(file.length);
  for (var i = 0; i < file.length; i++) {
    var blob = new Blob([bom, content], {
      "type": "text/csv"
    });
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, "aaaa.csv");

      // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
      window.navigator.msSaveOrOpenBlob(blob, "aaaa.csv");
    } else {
      document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
  }
}
