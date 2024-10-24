const resetButton = document.getElementById("resetButton");
const formatSelect = document.getElementById("formatSelect");
const qualitySection = document.getElementById("qualitySection");
const qualityRange = document.getElementById("qualityRange");
const qualityNumber = document.getElementById("qualityNumber");
const shortcutKbd = document.getElementById("shortcutKbd");
const shortcutButton = document.getElementById("shortcutButton");
const historyCheckbox = document.getElementById("historyCheckbox");

// Get UI language
document.documentElement.lang = chrome.i18n.getUILanguage();

// Get i18n messages
document.querySelectorAll("[data-i18n]").forEach((el) => {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
});
document
  .querySelector("img[data-i18n-donate]")
  .setAttribute("alt", chrome.i18n.getMessage("donate"));

// Reset defaults
resetButton.addEventListener("click", () => {
  formatSelect.value = "jpeg";
  qualityRange.value = 75;
  qualityNumber.value = 75;
  qualitySection.style.display = "";
  historyCheckbox.checked = false;
  chrome.storage.local.clear();
});

function checkQualityDisplay() {
  qualitySection.style.display = formatSelect.value === "png" ? "none" : "";
}

// Format select
formatSelect.addEventListener("change", () => {
  checkQualityDisplay();
  saveOptions();
});

// Quality input range
qualityRange.addEventListener("input", () => {
  qualityNumber.value = qualityRange.value;
});
qualityRange.addEventListener("change", () => {
  saveOptions();
});

// Quality input number
qualityNumber.addEventListener("change", () => {
  if (qualityNumber.value < 0) {
    qualityNumber.value = 0;
  } else if (qualityNumber.value > 100) {
    qualityNumber.value = 100;
  }
  qualityRange.value = qualityNumber.value;
  saveOptions();
});

// Open extensions shortcuts page
shortcutButton.addEventListener("click", () => {
  chrome.tabs.update({ url: "chrome://extensions/shortcuts" });
});

// History checkbox
historyCheckbox.addEventListener("change", () => {
  saveOptions();
});

// Save options
function saveOptions() {
  chrome.storage.local.set({
    format: formatSelect.value,
    quality: parseInt(qualityNumber.value),
    history: historyCheckbox.checked,
  });
}

// Load saved settings
chrome.storage.local
  .get({ format: "jpeg", quality: 75, history: false })
  .then((settings) => {
    formatSelect.value = settings.format;
    qualityRange.value = settings.quality;
    qualityNumber.value = settings.quality;
    checkQualityDisplay();
    historyCheckbox.checked = settings.history;
  });

// Get shortcut keys
chrome.commands.getAll((commands) => {
  shortcutKbd.textContent =
    commands[0].shortcut || chrome.i18n.getMessage("notset");
});
