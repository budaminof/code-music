const notesMap = (charCode) => {
  if (charCode === 32) {
    return null;
  }
  const octave = (charCode % 5) + 1;
  if (charCode < 11) {
    return `C${octave}`;
  }
  if (charCode < 22) {
    return `C#${octave}`;
  }
  if (charCode < 33) {
    return `D${octave}`;
  }
  if (charCode < 44) {
    return `D#${octave}`;
  }
  if (charCode < 55) {
    return `E${octave}`;
  }
  if (charCode < 66) {
    return `F${octave}`;
  }
  if (charCode < 77) {
    return `F#${octave}`;
  }
  if (charCode < 88) {
    return `G${octave}`;
  }
  if (charCode < 99) {
    return `G#${octave}`;
  }
  if (charCode < 110) {
    return `A${octave}`;
  }
  if (charCode < 121) {
    return `A#${octave}`;
  }
  if (charCode < 132) {
    return `B${octave}`;
  }
  return null;
};

export default notesMap;
