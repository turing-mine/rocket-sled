
'use strict'

const express = require('express')
var resourceApp = express()

require('dotenv').config()

const envPort = process.env.PORT
const getPort = require('get-port')
var portHarbor = () => ([envPort, 8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 8088])

const modID = module.id
const modPack = require('../package.json')

const os = require('os')
const netInf = os.networkInterfaces()

var ipADDR = "localhost"
var ipFamily = "IPv?"
var ipNetworks = ['wlan0', 'v4-rmnet_data1', 'rmnet_ipa0', 'rmnet_data2', 'rmnet_data1', 'rmnet_data0', 'r_rmnet_data0', 'rmnet2', 'rmnet1', 'rmnet0', 'p2p0', 'lo', 'epdg0', 'en1', 'en0', 'dummy0']

function getIpPort(item){
    if (typeof netInf[item] !== 'undefined'){
        if (typeof netInf[item][0] !== 'undefined'){
            if (netInf[item][0].family === 'IPv4'){
                ipADDR = netInf[item][0].address
                ipFamily = netInf[item][0].family
                //console.log(`${item}[0]`)
                //console.log(netInf[item][0])
            }
        }
        if (ipADDR === 'localhost'){
            if (typeof netInf[item][1] !== 'undefined'){
                if (netInf[item][1].family === 'IPv4'){
                    ipADDR = netInf[item][1].address
                    ipFamily = netInf[item][1].family
                    //console.log(`${item}[1]`)
                    //console.log(netInf[item][1])
                }
            }
        }
    }
}

do {
    getIpPort(ipNetworks.shift())
} while(ipADDR === 'localhost')

const serverIpAddr = ipADDR

var xtemplate = require('../rdns/dendrites/url_receptor')

var appRoot = './templates/index.html'
var cheeseRoot = './templates/camera.html'
var buenoRoot = './templates/bueno.html'

var appMeta = {"Content-Type": "text/html"}

var resourceServer
(async () => {
    //express helpers
    resourceApp.use('/css', express.static('./resources/css'))
    resourceApp.use('/js', express.static('./resources/js'))
    resourceApp.use('/assets', express.static('./assets'))
    resourceApp.use('/uploads', express.static('./uploads'))
    resourceApp.use('/upload', function(req, res, next){xtemplate.xUpload(req, res, buenoRoot, appMeta, serverIpAddr, portAvail)})
    resourceApp.use('/photonic', function(req, res, next){xtemplate.xForm(req, res, cheeseRoot, appMeta, serverIpAddr, portAvail)})
    resourceApp.use('/', function(req, res, next){xtemplate.xRoot(req, res, appRoot, appMeta, serverIpAddr, portAvail)})
    try {
        var portAvail = await getPort({port: portHarbor()})
        resourceServer = await resourceApp.listen(portAvail)
        console.log(`[${modPack.name}]: The resource server is listening to port ${portAvail}.`)
    }
    catch(err) {
        console.log(`[${modPack.name}]: The resource server is unable to listen to a preferred port.`)
        try {
            portAvail = await getPort({port: portHarbor().slice(1)})
            resourceServer = await resourceApp.listen(portAvail)
            console.log(`[${modPack.name}]: The resource server is listening to port ${portAvail}.`)
        }
        catch(err) {
            console.log(`: The resource server is unable to listen to any preferred port.`)
        }
    }
})()

process.on('SIGINT', () => {
    resourceServer.close(() => {
        console.log(`[${modPack.name}]: The static resource server has terminated.`)
    })
})

