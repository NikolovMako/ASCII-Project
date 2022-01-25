var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var getPixels = require("get-pixels")

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
	  console.log(files.filetoupload);
      var newpath = 'C:/AsciiProject/backend/Images/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
      getPixels('C:/AsciiProject/backend/Images/' + files.filetoupload.originalFilename, function(err, pixels) {
        if(err) {
          console.log("Bad image path")
          return
        }
        console.log("got pixels", pixels.shape.slice())
      })
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);