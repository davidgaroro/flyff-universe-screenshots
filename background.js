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

let activeDownloads = 0;

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

      activeDownloads--;

      // Enable download notifications
      if (activeDownloads === 0) {
        chrome.downloads.setUiOptions({ enabled: true });
      }
    }
  };

  // Add downloads listener
  chrome.downloads.onChanged.addListener(onDownloadChanged);

  // Disable download notifications
  if (activeDownloads === 0) {
    await chrome.downloads.setUiOptions({ enabled: false });
  }

  // Download image
  downloadId = await chrome.downloads.download({
    url: image, // Base64 URL
    filename: `Flyff Universe - Screenshots/flyff ${getFormattedDate()}.jpg`, // flyff yyyy-mm-dd hhmmss.jpg|png
    saveAs: false,
  });

  activeDownloads++;
});
