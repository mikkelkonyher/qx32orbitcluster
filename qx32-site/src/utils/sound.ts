import loadingSoundFile from '../assets/audio/LoadingSound.mp3';

let audioInstance: HTMLAudioElement | null = null;

export const playLoadingSound = () => {
  // Stop any currently playing audio
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }

  // Create and play new audio instance
  audioInstance = new Audio(loadingSoundFile);
  audioInstance.volume = 0.3; // Adjust volume as needed
  
  audioInstance.play().catch(() => {
    // Silently handle playback errors
  });
};

export const stopLoadingSound = () => {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
    audioInstance = null;
  }
};
