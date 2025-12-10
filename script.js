const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const whiteKeys = Array.from(document.querySelectorAll('.key.white'));
const blackKeys = Array.from(document.querySelectorAll('.key.black'));

const keys = document.querySelectorAll('.key');

keys.forEach((key) => {
  key.addEventListener('click', () => playNote(key));
  // Add pointer handlers so key highlights while pressed (mouse/touch)
  key.addEventListener('pointerdown', (e) => {
    // prevent focus/drag from interfering
    e.preventDefault();
    key.classList.add('active');
  });
  key.addEventListener('pointerup', () => {
    key.classList.remove('active');
  });
  key.addEventListener('pointercancel', () => {
    key.classList.remove('active');
  });
});

function playNote(key) {
  if (!key || !key.dataset) return;
  const noteId = key.dataset.note;
  const noteAudio = document.getElementById(noteId);
  if (!noteAudio) return;
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add('active');

  const onEnded = () => {
    key.classList.remove('active');
    noteAudio.removeEventListener('ended', onEnded);
  };
  noteAudio.addEventListener('ended', onEnded);
}

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const key = e.key.toLowerCase();
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) {
    const keyEl = whiteKeys[whiteKeyIndex];
    if (keyEl) playNote(keyEl);
  } else if (blackKeyIndex > -1) {
    const keyEl = blackKeys[blackKeyIndex];
    if (keyEl) playNote(keyEl);
  }
});

// Remove visual active state when the keyboard key is released
document.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) {
    const keyEl = whiteKeys[whiteKeyIndex];
    if (keyEl) keyEl.classList.remove('active');
  } else if (blackKeyIndex > -1) {
    const keyEl = blackKeys[blackKeyIndex];
    if (keyEl) keyEl.classList.remove('active');
  }
});
