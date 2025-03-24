// Listen for videos being added to the page
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === 'VIDEO') {
        setupPiPButton(node);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Setup PiP button for existing videos
document.querySelectorAll('video').forEach(setupPiPButton);

function setupPiPButton(video) {
  if (!video.hasAttribute('pip-enabled')) {
    video.setAttribute('pip-enabled', 'true');
    
    // Add double click event for PiP
    video.addEventListener('dblclick', async (e) => {
      e.preventDefault();
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          await video.requestPictureInPicture();
        }
      } catch (error) {
        console.error('Failed to enter Picture-in-Picture mode:', error);
      }
    });
  }
} 