const fonts = [
    'Site Default',
    'Aurebesh Code',
    'Aurebesh AF Canon',
    'Aurebesh AF Canon Tech',
    'Aurebesh AF Legends',
    'Aurebesh AF Legends Tech',
    'Aurebesh Red',
];

const fontSelector = document.querySelector("#font-selector")

for (const font of fonts) {
    const option = document.createElement('option')
    option.innerHTML = font
    option.value = font
    fontSelector.appendChild(option)
}

function saveSettings() {
    const newFont = fontSelector.value
    chrome.storage.sync.set({
        fontFamily: newFont,
    }, function() {
        // alert("Options where saved")
    });
}

function restoreSettings() {
    chrome.storage.sync.get({
        fontFamily: fonts[0],
    }, function(savedSettings) {
        fontSelector.value = savedSettings.fontFamily
    });
}

fontSelector.addEventListener('change', saveSettings)
document.addEventListener('DOMContentLoaded', restoreSettings);
