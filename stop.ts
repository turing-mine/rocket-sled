
const findP = require('find-process')
const modPack = require('./package.json')

function stopAppProcess(appProc) {
    return new Promise(resolve => {    
        findP('name', appProc)
            .then(function (list){
                if (list.length > 0){
                    process.kill(list[0].pid, 'SIGINT')
                }
            }, function (err){
                console.log(err.stack || err)
        })
        resolve('') //no msg text for now...
    })
}

//kill all related processes
(async () => {
    const [msg1, msg2] = await Promise.all([stopAppProcess('exiftool'), stopAppProcess(modPack.name)])
    console.log('All app processes have been signaled to terminate.')
})()

