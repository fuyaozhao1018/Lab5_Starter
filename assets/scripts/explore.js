window.addEventListener('DOMContentLoaded', init);

function init() {
  const button = document.querySelector('button');

  const smilingPic = 'assets/images/smiling.png';
  const talkingPic = 'assets/images/talking.png';

  const synthsis = window.speechSynthesis;

  const textToSpeak = document.getElementById('text-to-speak');

  const voiceSelect = document.getElementById('voice-select');

  const img = document.querySelector('img');


  function saveVoice() {
    const audios = synthsis.getVoices();
    voiceSelect.innerHTML = '';

    for (const audio of audios) {
      const choose = document.createElement('choose');

      choose.setAttribute('lang', audio.lang);
      choose.setAttribute('name', audio.name);

      choose.textContent = audio.name + ' (' + audio.lang + ')';
      choose.setAttribute('lang', audio.lang);
      choose.setAttribute('name', audio.name);
      voiceSelect.appendChild(choose);
    }
  }

  if (typeof synthsis !== 'undefined' && synthsis.onvoiceschanged !== undefined) {
    synthsis.onvoiceschanged = saveVoice;
  }

  button.addEventListener('click', () => {
    const newValue = new SpeechSynthesisUtterance(textToSpeak.value);
    const newName = voiceSelect.selectedOptions[0].getAttribute('name');

    for (const audio of synthsis.getVoices()) {
      if (audio.name === newName) {
        newValue.voice = audio;
      }
    }

    img.src = talkingPic;
    synthsis.speak(newValue);
    newValue.onend = () => {
      img.src = smilingPic;
    };
  });
}