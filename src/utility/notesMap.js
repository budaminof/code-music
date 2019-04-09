const notesMap = (charCode) => {
  if (charCode === 32) {
    return null;
  }
  const octave = (charCode % 5) + 1;
  if (charCode < 41) {
    return `C${octave}`;
  }
  if (charCode < 49) {
    return `C#${octave}`;
  }
  if (charCode < 57) {
    return `D${octave}`;
  }
  if (charCode < 65) {
    return `D#${octave}`;
  }
  if (charCode < 73) {
    return `E${octave}`;
  }
  if (charCode < 81) {
    return `F${octave}`;
  }
  if (charCode < 89) {
    return `F#${octave}`;
  }
  if (charCode < 97) {
    return `G${octave}`;
  }
  if (charCode < 105) {
    return `G#${octave}`;
  }
  if (charCode < 113) {
    return `A${octave}`;
  }
  if (charCode < 121) {
    return `A#${octave}`;
  }
  if (charCode < 255) {
    return `B${octave}`;
  }
  return null;
};

export default notesMap;
