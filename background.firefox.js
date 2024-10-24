// Format date to yyyy-mm-dd hhmmss
function getFormattedDate() {
  const d = new Date();
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} ${d
    .getHours()
    .toString()
    .padStart(2, "0")}${d.getMinutes().toString().padStart(2, "0")}${d
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
}

function base64ToBlob(base64Url, format) {
  // Decode base64 data from URL
  const byteCharacters = atob(base64Url.split(",")[1]);
  // Create Uint8Array to hold binary data
  const byteArray = new Uint8Array(byteCharacters.length);
  // Populate Uint8Array with ASCII codes of characters
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }
  // Return Blob created from Uint8Array
  return new Blob([byteArray], { type: `image/${format}` });
}

// Listener for action click or shortcut
chrome.action.onClicked.addListener(async (tab) => {
  // Check URL
  if (!tab.url) {
    return;
  }
  const url = new URL(tab.url);
  if (
    (url.hostname !== "universe.flyff.com" &&
      url.hostname !== "www.universe.flyff.com") ||
    url.pathname !== "/play"
  ) {
    return;
  }

  // Get settings from storage
  const settings = await chrome.storage.local.get({
    format: "jpeg",
    quality: 75,
    history: false,
  });

  // Get image from current tab
  const image = await chrome.tabs.captureVisibleTab(tab.windowId, {
    format: settings.format,
    quality: settings.quality,
  });
  if (!image) {
    return;
  }

  // Create blob url from image
  const blobUrl = URL.createObjectURL(base64ToBlob(image, settings.format));

  let downloadId;
  const onDownloadChanged = async (delta) => {
    if (
      delta.state &&
      delta.state.current === "complete" &&
      delta.id === downloadId
    ) {
      // Remove downloads listener
      chrome.downloads.onChanged.removeListener(onDownloadChanged);

      // Remove from downloads history
      if (!settings.history) {
        await chrome.downloads.erase({ id: downloadId });
      }

      // Remove blob url
      URL.revokeObjectURL(blobUrl);
    }
  };

  // Add downloads listener
  chrome.downloads.onChanged.addListener(onDownloadChanged);

  // Download image
  downloadId = await chrome.downloads.download({
    url: blobUrl,
    filename: `Flyff Universe - Screenshots/flyff ${getFormattedDate()}.${
      settings.format
    }`, // flyff yyyy-mm-dd hhmmss.jpeg|png
    saveAs: false,
  });
});
