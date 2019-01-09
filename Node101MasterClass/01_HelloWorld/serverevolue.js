var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log('Page demandee : ' + page);
    res.writeHead(200, {"Content-Type": "text/html"});

    if (page == '/Marseille') {
        res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Hello Marseille !</title>'+
'    </head>'+ 
'    <body>'+
'     	<p>Hello <strong>Marseille</strong> de la part de SkillValue !</p>'+
'    </body>'+
'</html>');
    } else if (page == '/Paris'){ 
        res.write('<!DOCTYPE html>'+
        '<html>'+
        '    <head>'+
        '        <meta charset="utf-8" />'+
        '        <title>Hello Paris !</title>'+
        '    </head>'+ 
        '    <body>'+
        '     	<p>Hello <strong>Paris</strong> de la part de SkillValue !</p>'+
        '    </body>'+
        '</html>');
    } else {
        res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Hello World !</title>'+
'    </head>'+ 
'    <body>'+
'     	<p>Hello <strong>le Monde</strong> de la part de SkillValue !</p>'+
'    </body>'+
'</html>');
    }
    
    res.end();
});
server.listen(8080);