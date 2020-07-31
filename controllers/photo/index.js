
const upload = require('../upload')
const find = require('find')

const fsPromises = require('fs').promises
const { COPYFILE_EXCL } = require('fs').constants

const clc = require("cli-color")
const clrMsg = clc.bgXterm(56)

exports.save = function(retrievalPath, saveName){
    var shortName = saveName
    saveName = upload.dirName + saveName
    console.log(upload.dirName)
    fsPromises.copyFile(retrievalPath, saveName, COPYFILE_EXCL)
        .then(() => {
            console.log(`The file`, clrMsg(shortName),` was copied to the destination drive.`)
            find.file(/(\.jpg|.jpeg)$/, upload.dirName, function(files) {
                // collection metaphor message
                var fCollMetaphor = (files.length == 1) ? `is now ${files.length} file` : `are now ${files.length} files`
                console.log(`There ${fCollMetaphor} saved in the upload directory.`)
            })
        })
        .catch(() => console.log(`The file `,clc.red(shortName),` could not be copied to the destination drive.`))
}

//upload.info()

