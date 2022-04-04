var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textarea").innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textarea").innerHTML = content;
    speak();
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000);
    Webcam.attach(camera);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("display").innerHTML = '<img id= "display_img" src="' + data_uri + '">';
    });
} 

function save() {
    link = document.getElementById("link");
    image = document.getElementById("display_img").src;
    link.href = image;
    link.click();
}
