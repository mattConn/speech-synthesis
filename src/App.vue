<script setup>
import { ref } from 'vue'
const synth = window.speechSynthesis;

const availableVoices = window.speechSynthesis.getVoices();

const recentMessages = ref([]);

const currentVoice = ref(null);
const currentVoiceURI = ref('')

const speakMessage = (message) => {
  const utterThis = new SpeechSynthesisUtterance(message);
  console.log("VOICE", utterThis.voice)
  if (currentVoice.value) utterThis.voice = currentVoice.value;

  synth.speak(utterThis)
}

const handleVoiceSelect = () => {
  currentVoice.value = availableVoices.find(voice => voice.voiceURI === currentVoiceURI.value)
  speakMessage("Selected voice");
}

const handleRecentMessageClick = (message) => {
  speakMessage(message);
  return;
  recentMessages.value = recentMessages.value.filter(msg => message !== msg);
  recentMessages.value.unshift(message);
}

const handleRemoveRecentMessageClick = (message) => {
  console.log("REMOVE")
  recentMessages.value = recentMessages.value.filter(msg => message !== msg);
}

const messageToSpeak = ref('');

const handleSpeakBtnClick = () => {
  speakMessage(messageToSpeak.value);
}

const handleSaveBtnClick = () => {
  recentMessages.value.unshift(messageToSpeak.value);
}

const handleClearBtnClick = () => {
  messageToSpeak.value = "";
}

const handleSpeakAndSaveBtnClick = () => {
  handleSpeakBtnClick();
  handleSaveBtnClick();
}

</script>

<template>
  <div class="wrapper">
    <textarea rows="4" v-model="messageToSpeak" @keydown.enter="handleSpeakBtnClick">
    </textarea>
    <span>Current voice:</span>
    <select class="available-voices-select" @change="handleVoiceSelect" v-model="currentVoiceURI">
      <option v-for="voice in availableVoices" :value="voice.voiceURI">
        {{ voice.name }} - {{ voice.lang }}
      </option>
    </select> 
    <div class="button-ctn">
      <div tabindex="0" class="button speak-btn" @click="handleSpeakAndSaveBtnClick">
        Speak and save
      </div>
      <div tabindex="0" class="button speak-btn" @click="handleSpeakBtnClick">
        Speak
      </div>
      <div tabindex="0  " class="button" @click="handleSaveBtnClick">
        Save
      </div>
      <div tabindex="0  " class="button" @click="handleClearBtnClick">
        Clear
      </div>
    </div>
    <div class="recent-messages-ctn">
      <div class="recent-message-btn" tabindex="0"
      v-for="(message, index) in recentMessages">
        <span @click="handleRecentMessageClick(message, index)">{{ message }}</span>
        <div @click="handleRemoveRecentMessageClick(message)">Remove</div>
    </div>
    </div>
  </div>
</template>

<style scoped>
span, select {
  margin-right: 10px;
  font-size: 24px;
  font-family: sans-serif;
}

textarea {
  font-size: 32px;
  width: 100%;
}

.button-ctn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.button {
  border-radius: 3px;
  text-align: center;
  color: white;
  padding: 1em;
  margin: 0 10px;
  font-size: 32px;
  font-family: sans-serif;
  /* border: solid 1px rgb(200, 200, 200); */
  cursor: pointer;
  background-color: rgb(101, 95, 160);
}

.speak-btn {
  background-color: rgb(101, 95, 160);
  color: white;
  border: none;
}

.recent-messages-ctn {
    height: 80vh;
    overflow: scroll;
    margin: 10px 0;
}

.recent-message-btn {
  display: flex;
  justify-content: space-between;
  border: solid 1px black;
  color: black;
  padding: 1em;
  font-size: 32px;
  font-family: sans-serif;
  cursor: pointer;
}
</style>
