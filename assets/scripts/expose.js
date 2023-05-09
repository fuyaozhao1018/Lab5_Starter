// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const volumePics = [
    'assets/icons/volume-level-0.svg',
    'assets/icons/volume-level-1.svg',
    'assets/icons/volume-level-2.svg',
    'assets/icons/volume-level-3.svg',
  ];
  const hornSelect = document.getElementById('horn-select');
  const img = document.querySelector('img');
  const audio = document.querySelector('audio');
  const volume = document.getElementById('volume');
  const volumePic = document.querySelector('#volume-controls img');
  const button = document.querySelector('button');


  const horn = {
    'air-horn': {
      image: 'assets/images/air-horn.svg',
      sound: 'assets/media/audio/air-horn.mp3',
    },
    'car-horn': {
      image: 'assets/images/car.svg',
      sound: 'assets/media/audio/car-horn.mp3',
    },
    'party-horn': {
      image: 'assets/images/party-horn.svg',
      sound: 'assets/media/audio/party-horn.mp3',
    },
  };

  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    img.src = horn[value].image;
    audio.src = horn[value].sound;
  });

  volume.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    let picnum;
    if (value === 0) {
      picnum = 0;

    } else if (value < 33) {
      picnum = 1;

    } else if (value < 67) {
      picnum = 2;

    } else {
      picnum = 3;
    }

    volumePic.src = volumePics[picnum];
    audio.volume = value / 100;
  });

  button.addEventListener('click', () => {
    if (audio.src) {
      audio.play();

      if (horn.value === 'party-horn') {
        jsConfetti.addConfetti();
      }
    }
  });
}