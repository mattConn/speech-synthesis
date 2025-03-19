

console.log("TEST")

const synth = window.speechSynthesis;
console.log(window.speechSynthesis.getVoices())

const availableVoices = window.speechSynthesis.getVoices();
const currentVoice = availableVoices.find(voice => voice.voiceURI === "com.apple.eloquence.en-US.Eddy")
console.log("CURRENT VOICE", currentVoice)

const message = "Hello world"
// console.log(utterThis.voice)


const textArea = document.querySelector('textarea');
const speakBtn = document.querySelector('.speak-btn');
speakBtn.addEventListener('click', async () => {
    const utterThis = new SpeechSynthesisUtterance(textArea.value);
    // utterThis.voice = currentVoice;
    synth.speak(utterThis)
    textArea.value = ""
})