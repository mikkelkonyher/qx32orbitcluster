import loadingSoundFile from '../assets/audio/LoadingSound.mp3';

let audioInstance: HTMLAudioElement | null = null;

export const playLoadingSound = () => {
  console.log('playLoadingSound called');
  console.log('Audio file path:', loadingSoundFile);
  
  // Stop any currently playing audio
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }

  // Create and play new audio instance
  audioInstance = new Audio(loadingSoundFile);
  audioInstance.volume = 0.3; // Adjust volume as needed
  
  console.log('Audio instance created, attempting to play...');
  
  audioInstance.play()
    .then(() => {
      console.log('Audio playback started successfully');
    })
    .catch(err => {
      console.error('Audio playback failed:', err);
    });
};

export const stopLoadingSound = () => {
  console.log('stopLoadingSound called');
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
    audioInstance = null;
  }
};
