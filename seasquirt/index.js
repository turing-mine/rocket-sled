
// uploads.__dirname (here be sea monsters...)

const uploads = require('../uploads')
const find = require('find')

const fsPromises = require('fs').promises
const { COPYFILE_EXCL } = require('fs').constants

const clc = require("cli-color")
const clrMsg = clc.bgXterm(56)

exports.photocopy = function(retrievalPath, saveName){
    var shortName = saveName
    saveName = uploads.dirName + saveName
    console.log(uploads.dirName)
    fsPromises.copyFile(retrievalPath, saveName, COPYFILE_EXCL)
        .then(() => {
            console.log(`The file`, clrMsg(shortName),` was copied to the destination drive.`)
            find.file(/(\.jpg|.jpeg)$/, uploads.dirName, function(files) {
                // collection metaphor message
                var fCollMetaphor = (files.length == 1) ? `is now ${files.length} file` : `are now ${files.length} files`
                console.log(`There ${fCollMetaphor} saved in uploads.`)
            })
        })
        .catch(() => console.log(`The file `,clc.red(shortName),` could not be copied to the destination drive.`))
}

//uploads.info()

