
<template>
  <div>
    <textarea v-model="code" v-if="!isPlaying"/>
    {{test}}
    <div v-if="isPlaying" class="music-wrapper">
      <div class="real-time-notes">
        <div v-for="(line, index) in realTimeChar" :key="index">{{line}}</div>
      </div>
      <button @click="onStartOverClick">start over</button>
    </div>

    <div class="convert-button-wrapper">
      <button @click="onPlayClick" v-if="!isPlaying">{♪} make music</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-control-regex */
/* eslint-disable no-unused-expressions */
import Tone from 'tone';
import notesMap from '../utility/notesMap';

const synth = new Tone.MembraneSynth().toMaster();
let synthPart;
let notes = [];
let charsToPlay = [];
const sampleCode = `ReactDOM.render(
  <h1> {♪} Hello world! </h1>,
  document.getElementById('root')
);`;

export default {
  data() {
    return {
      code: sampleCode,
      isPlaying: false,
      realTimeChar: [''],
    };
  },
  methods: {
    async onPlayClick() {
      this.isPlaying = true;
      await this.convertCode();
      this.playMusic();
    },
    convertCode() {
      return new Promise((resolve) => {
        const linesOfCode = this.code.split(/\r\n|\n|\r/);

        linesOfCode.forEach((line) => {
          line.trim().split('').forEach((char) => {
            notes.push(notesMap(char.charCodeAt(0)));
            charsToPlay.push(char);
          });

          notes.push(notesMap(32));
          charsToPlay.push(null);
        });
        resolve();
      });
    },
    playMusic() {
      synthPart = new Tone.Sequence(((time, note) => {
        const charToPlay = charsToPlay.shift();
        charToPlay ? this.realTimeChar[this.realTimeChar.length - 1] += charToPlay : this.realTimeChar.push('');
        this.realTimeChar = [...this.realTimeChar];
        synth.triggerAttackRelease(note, time);
      }), notes, '8n');

      synthPart.loop = 0;
      synthPart.start();
      Tone.Transport.start();
    },
    onStartOverClick() {
      this.isPlaying = false;
      Tone.Transport.stop();
      this.reset();
    },
    reset() {
      this.realTimeChar = [''];
      notes = [];
      charsToPlay = [];
      synthPart.dispose();
    },
  },
};
</script>

<style scoped lang="scss">
textarea {
  width: 70vw;
  height: 70vh;
  outline: none;
  border-radius: 2px;
  border: 1px solid rgb(21, 21, 21);
}

button {
  margin: 20px 0 0 0;
  text-transform: uppercase;
  padding: 20px 45px;
  border-radius: 4px;
  background-color: rgb(89, 30, 89);
  color: rgb(21, 21, 21);
  font-weight: bold;
  outline: none;
  color: white;
  font-size: 1.1rem;
}

.convert-button-wrapper {
  width: 100%;
  text-align: center;
}

.music-wrapper {
  height: 90vh;
  .real-time-notes {
    max-width: 70vw;
    white-space: pre-wrap;
    text-align: left;
    margin: 0 auto;
    height: 70vh;
    overflow: auto;
  }
}
</style>
