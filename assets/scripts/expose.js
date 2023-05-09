// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  const jsConfetti = new JSConfetti();

  const volumePics = [
    'assets/icons/volume-level-0.svg',
    'assets/icons/volume-level-1.svg',
    'assets/icons/volume-level-2.svg',
    'assets/icons/volume-level-3.svg',
  ];

  const horn = {
    'party-horn': {

      sound: 'assets/media/audio/party-horn.mp3',

      image: 'assets/images/party-horn.svg',
    },

    'car-horn': {

      sound: 'assets/media/audio/car-horn.mp3',

      image: 'assets/images/car.svg',
    },

    'air-horn': {
      
      sound: 'assets/media/audio/air-horn.mp3',

      image: 'assets/images/air-horn.svg',
    },
  };

  const volume = document.getElementById('volume');

  const volumePic = document.querySelector('#volume-controls img');

  const hornSelect = document.getElementById('horn-select');

  const img = document.querySelector('img');

  const audio = document.querySelector('audio');

  const button = document.querySelector('button');


  hornSelect.addEventListener('change', (e) => {

    const value = e.target.value;

    audio.src = horn[value].sound;

    img.src = horn[value].image;

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

    audio.volume = value / 100;

    volumePic.src = volumePics[picnum];

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