let lastState = '';

const checkVideoState = () => {
  const video = document.querySelector('video');
  if (video) {
    video.addEventListener('pause', () => {
      browser.runtime.sendMessage({state: 'paused'});
    });

    video.addEventListener('play', () => {
      browser.runtime.sendMessage({state: 'playing'});
    });
  }
};

checkVideoState();

browser.runtime.onMessage.addListener((message) => {
  const video = document.querySelector('video');
  if (video) {
    if (message.state === 'playing' && !video.paused) {
      video.pause();
    } else if (message.state === 'paused' && video.paused) {
      video.play();
    }
  }
});

