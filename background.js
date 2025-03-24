chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: enablePiPMode
  });
});

function enablePiPMode() {
  const videos = document.getElementsByTagName('video');
  if (videos.length > 0) {
    const video = videos[0];
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      video.requestPictureInPicture();
    }
  } else {
    alert('No video found on this page!');
  }
} 