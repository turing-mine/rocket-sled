var formidable = require('formidable'), fs = require('fs'), util = require('util'), os = require('os');
var _ = require('underscore');
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
var modID = module.id;
var photo = require('../controllers/photo');
exports.xRoot = function (req, res, appRoot, appMeta, serverIpAddr, lPort) {
    fs.readFile(appRoot, 'utf8', function (err, data) {
        if (err) {
            res.writeHead(404, appMeta);
            return res.end("404 File Not Found");
        }
        var rootContent = data;
        var rootTemplate = _.template(rootContent);
        res.writeHead(200, appMeta);
        res.write(rootTemplate({ ip_addr: serverIpAddr, ip_port: lPort }));
        res.end();
    });
    return;
};
exports.xForm = function (req, res, cheeseRoot, appMeta, serverIpAddr, lPort) {
    fs.readFile(cheeseRoot, 'utf8', function (err, data) {
        if (err) {
            res.writeHead(404, appMeta);
            return res.end("404 File Not Found");
        }
        var formContent = data;
        var formTemplate = _.template(formContent);
        res.writeHead(200, appMeta);
        res.write(formTemplate({ ip_addr: serverIpAddr, ip_port: lPort }));
        res.end();
    });
    return;
};
exports.xUpload = function (req, res, buenoRoot, appMeta, serverIpAddr, lPort) {
    // parse a file upload
    var form = new formidable.IncomingForm();
    var imgOrientation;
    var imgType;
    var imgPort;
    if (lPort == "80") {
        imgPort = "";
    }
    else {
        imgPort = ":" + lPort;
    }
    form.parse(req, function (err, fields, files) {
        //res.writeHead(200, {'content-type': 'text/plain'})
        //res.write('received upload:\n\n')
        //res.write(util.inspect({fields: fields, files: files}))
        //console.log(files.upload["type"])
        var retrievalPath = files.upload["path"];
        var saveName = files.upload["name"];
        //console.log("file size: " + files.upload["size"])
        //console.log(fields)
        var imgOrientation = "360";
        fs.readFile(buenoRoot, 'utf8', function (err, data) {
            if (err) {
                res.writeHead(404, appMeta);
                return res.end("404 File Not Found");
            }
            var uploadContent = data;
            var uploadTemplate = _.template(uploadContent);
            if (files.upload["type"] == 'image/jpeg') {
                imgType = files.upload.type;
                photo.save(retrievalPath, saveName);
            }
            else {
                imgType = "unknown";
                console.log('Not an image, no file uploaded...');
            }
            function showOriented() {
                console.log(fields);
                var truComment = fields.social;
                res.writeHead(200, appMeta);
                res.write(uploadTemplate({
                    ip_addr: serverIpAddr,
                    ip_port: imgPort,
                    img_name: files.upload.name,
                    img_size: files.upload.size,
                    img_type: imgType,
                    img_orientation: imgOrientation,
                    comments: truComment
                }));
                res.end();
                //console.log(`Image orientation: ${imgOrientation}`)
            }
            showOriented();
        });
    });
    return;
};
