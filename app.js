var frontCamera = false;
var currentStream;

const 
    cameraView = document.querySelector("#camera-view");
    cameraDevice = document.querySelector("#camera-device");
    photoDisplay = document.querySelector("#photo-display");
    frontCammeraButton = document.querySelector("#front-camera-button");
    takePhotoButton = document.querySelector("#take-photo-button");

function cameraStart(){
    if(typeof currentStream !== 'undefined'){
        currentStream.getTracks().forEach(track=>{
            track.stop();
        })
    }
}

var constraints = {
    video: {facingMode: (frontCamera? "user" : "environment")}, audio:false
};

navigator.mediaDevices.getUserMedia(constraints).then(function(steam){
    currentStream = steam;
    cameraDevice.srcObject = steam;
}).catch(function(error){
    console.error("Error happened.", error);
})

takePhotoButton.onclick = function(){
    cameraView.width = cameraDevice.videoWidth;
    cameraView.height = cameraDevice.videoHeight;
    cameraView.getContext("2d").drawImage(cameraDevice, 0, 0);
    photoDisplay.src = cameraView.toDataURL("image/webp");
    photoDisplay.classList.add("photo-taken");
};

frontCammeraButton.onclick = function(){
    frontCamera = !frontCamera;
    if(frontCamera){
        frontCammeraButton.textContext = "Back Camera";

    }else{
        frontCammeraButton.textContext = "Front Camera";
    }
    cameraStart();
}

window.addEventListener("load", cameraStart);