var upload = require('../upload');
var find = require('find');
var fsPromises = require('fs').promises;
var COPYFILE_EXCL = require('fs').constants.COPYFILE_EXCL;
var clc = require("cli-color");
var clrMsg = clc.bgXterm(56);
exports.save = function (retrievalPath, saveName) {
    var shortName = saveName;
    saveName = upload.dirName + saveName;
    console.log(upload.dirName);
    fsPromises.copyFile(retrievalPath, saveName, COPYFILE_EXCL)
        .then(function () {
        console.log("The file", clrMsg(shortName), " was copied to the destination drive.");
        find.file(/(\.jpg|.jpeg)$/, upload.dirName, function (files) {
            // collection metaphor message
            var fCollMetaphor = (files.length == 1) ? "is now " + files.length + " file" : "are now " + files.length + " files";
            console.log("There " + fCollMetaphor + " saved in the upload directory.");
        });
    })["catch"](function () { return console.log("The file ", clc.red(shortName), " could not be copied to the destination drive."); });
};
//upload.info()
