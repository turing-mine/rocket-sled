
'use strict';

const parsedUrl = new URL(window.location.href);
var parsedTitle;
var parsedGreeting;

var imgHeight;
var imgWidth;

document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };

function imgMatrix(imgExif){
    if (typeof imgExif != 'undefined'){
        var imgExifData = imgExif.getAll();
        var imgOrientation = imgExifData["Orientation"];
        //console.log("image exif data: ", imgExifData);
        var cameraMake = imgExifData["Make"];
        var cameraModel = imgExifData["Model"];
        if (typeof cameraMake != 'undefined'){
            cameraMake = cameraMake.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            if (cameraMake == 'Lg Electronics') cameraMake = 'LG Electronics';
            var cameraStatus = ' (' + cameraMake + ') ';
            if (typeof cameraModel != 'undefined'){
                cameraStatus = ' (' + cameraMake + ' - ' + cameraModel + ') ';
            }
            $('span[data-metaphor="camera-status"]').text(cameraStatus);
            $('span[data-metaphor="uploadPretext"]').text('');
        }
        if (typeof imgOrientation != 'undefined'){
            var imgRotate = 'orientation-' + imgOrientation;
            $('img[data-metaphor="photons"]').addClass(imgRotate);
        }
    }
    else {
        //console.log("no exif data");
    }
    imgAdjust();   
}

function imgAdjust(){
    imgHeight = $("#imgOut")[0].clientHeight;
    imgWidth = $("#imgOut")[0].clientWidth;
    if ($("#imgOut").hasClass('orientation-right-top')){
        /*****/
        $("#imgOut")[0].style.height = imgWidth + "px";
        //$("#imgOut")[0].style.width = imgHeight + "px";
        $("#imgOut")[0].style.width = "auto";
        /*****/
        var marginAdjust = (($("#imgOut")[0].clientWidth - $("#imgOut")[0].clientHeight) / 2);
        $("#imgOut")[0].style.marginTop = marginAdjust + "px";
        $("#imgOut")[0].style.marginLeft = -1 * marginAdjust + "px";
        /*****/
        $("#preview-section")[0].style.height = $("#imgOut")[0].clientWidth + "px";
        /*****/
    }
    else {
        try{
            $("#preview-section")[0].style.height = $("#imgOut")[0].clientHeight + "px";
        }
        catch{
            //console.log('There is no preview-section to adjust style "height"');
        }
    }                    
}

function addPhoto(){
    document.location = '/photonic';
}

function fullScreen(){
    var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
    if (!isFullscreen){
        this.requestFullscreen();
        switch(true){
            case ($(this).hasClass('rotate-6')):
                screen.orientation.lock('landscape-primary').catch(function(error) {
                    //console.log('desktop does not have fullscreen orientation feature...');
                });
                break;
            case (imgWidth > imgHeight):
                screen.orientation.lock('landscape-primary').catch(function(error) {
                    //console.log('desktop does not have fullscreen orientation feature...');
                });
                break;
            default: 
                screen.orientation.lock('portrait-primary').catch(function(error) {
                    //console.log('desktop does not have fullscreen orientation feature...');
                });
                break;
        }                        
    }
    else{
        document.cancelFullScreen();
    }
}


$('a.nav-item').on("click",function(){
    $('button.navbar-toggler').click();
});

$('[data-metaphor="portal_header"]').on("click",function(){
    $('button.navbar-toggler').click();
});

