window.addEventListener('DOMContentLoaded', init);

function init() {
  const smilingPic = 'assets/images/smiling.png';
  const talkingPic = 'assets/images/talking.png';
  const synthsis = window.speechSynthesis;
  const voiceSelect = document.getElementById('voice-select');
  const button = document.querySelector('button');
  const textToSpeak = document.getElementById('text-to-speak');
  const imgElement = document.querySelector('img');


  function saveVoice() {
    const audios = synthsis.getVoices();
    voiceSelect.innerHTML = '';

    for (const audio of audios) {
      const option = document.createElement('option');
      option.textContent = audio.name + ' (' + audio.lang + ')';
      option.setAttribute('lang', audio.lang);
      option.setAttribute('name', audio.name);
      voiceSelect.appendChild(option);
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

    imgElement.src = talkingPic;
    synthsis.speak(newValue);
    newValue.onend = () => {
      imgElement.src = smilingPic;
    };
  });
}