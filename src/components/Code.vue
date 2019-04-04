
<template>
  <div>
    <textarea v-model="code" v-if="!isPlaying"/>
    <div v-if="isPlaying" class="real-time-notes">{{realTimeNotes}}</div>
    <div class="convert-button-wrapper">
      <button @click="convertCode" v-if="!isPlaying">make music</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-control-regex */
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
      realTimeNotes: '',
    };
  },
  methods: {
    convertCode() {
      this.isPlaying = true;
      const notes = [];
      const linesOfCode = this.code.split(/\r\n|\n|\r/);

      linesOfCode.forEach((item) => {
        const line = item.trim().split('');
        line.forEach(char => notes.push(notesMap(char.charCodeAt(0))));
        notes.push(null);
      });

      const synthPart = new Tone.Sequence(((time, note) => {
        this.realTimeNotes += ` ${note}`;
        synth.triggerAttackRelease(note, time);
      }), notes, '8n');

      synthPart.loop = 0;
      synthPart.start();
      Tone.Transport.start();
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
