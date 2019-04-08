<template>
  <div>
    <textarea v-model="code" v-if="!isPlaying"/>

    <div v-if="isPlaying">
      <div class="real-time-notes" v-for="(line, index) in realTimeChar" :key="index">{{line}}</div>
      <button @click="onStartOverClick">start over</button>
    </div>

    <div class="convert-button-wrapper">
      <button @click="onPlayClick" v-if="!isPlaying">make music</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-control-regex */
/* eslint-disable no-unused-expressions */
import Tone from 'tone';
import notesMap from '../utility/notesMap';

const synth = new Tone.MembraneSynth().toMaster();
const sampleCode = `ReactDOM.render(
  <h1>Hello world!</h1>,
  document.getElementById('root')
);`;

export default {
  data() {
    return {
      code: sampleCode,
      isPlaying: false,
      realTimeChar: [''],
      notes: [],
      charsToPlay: [],
    };
  },
  methods: {
    async onPlayClick() {
      this.isPlaying = true;
      await this.convertCode();
      this.playMusic(this.notes, this.charsToPlay);
    },
    convertCode() {
      return new Promise((resolve) => {
        const linesOfCode = this.code.split(/\r\n|\n|\r/);

        linesOfCode.forEach((line) => {
          line.trim().split('').forEach((char) => {
            this.notes.push(notesMap(char.charCodeAt(0)));
            this.charsToPlay.push(char);
          });

          this.notes.push(notesMap(32));
          this.charsToPlay.push(null);
        });
        resolve();
      });
    },
    playMusic(notes, charsToPlay) {
      const synthPart = new Tone.Sequence(((time, note) => {
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
    },
  },
};
</script>

<style scoped lang="scss">
textarea {
  width: 70vw;
  height: 50vh;
  outline: none;
}

button {
  margin: 0 auto;
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

.real-time-notes {
  max-width: 70vw;
  white-space: pre-wrap;
  text-align: center;
  margin: 0 auto;
}
</style>
