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

const handleRecentMessageClick = (message, index) => {
  speakMessage(message);
  recentMessages.value = recentMessages.value.filter(msg => message !== msg);
  recentMessages.value.unshift(message);
}

const messageToSpeak = ref('')

const handleSpeakBtnClick = () => {
  if (!messageToSpeak.value.trim()) return;

  speakMessage(messageToSpeak.value);
  recentMessages.value.unshift(messageToSpeak.value)
  messageToSpeak.value = ""
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
    <div tabindex="0" class="speak-btn" @click="handleSpeakBtnClick">
      Speak
    </div>
    <div class="recent-messages-ctn">
      <div class="recent-message-btn" tabindex="0"
      v-for="(message, index) in recentMessages" @click="handleRecentMessageClick(message, index)">
        {{ message }}
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

.speak-btn {
  text-align: center;
  border: solid 1px black;
  color: white;
  padding: 1em;
  font-size: 32px;
  font-family: sans-serif;
  background-color: rgb(101, 95, 160);
  cursor: pointer;
}

.recent-messages-ctn {
    height: 80vh;
    overflow: scroll;
}


.recent-message-btn {
  border: solid 1px black;
  color: black;
  padding: 1em;
  font-size: 32px;
  font-family: sans-serif;
  cursor: pointer;
}
</style>
