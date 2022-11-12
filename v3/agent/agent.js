import {fonts} from "../fonts"

const styleSheet = document.createElement("style")
document.head.appendChild(styleSheet)

function changeFontFamily(fontFamily) {
    let styles = ""
    if (fontFamily !== fonts[0]) {
        styles = `
            * {
                font-family: "${fontFamily}" !important;
            }
        `
    }

    styleSheet.innerHTML = styles
}

chrome.storage.sync.get({
    fontFamily: fonts[0],
}, function(savedSettings) {
    changeFontFamily(savedSettings.fontFamily)
});
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") {
        return
    }

    const changedItems = Object.keys(changes);

    for (const item of changedItems) {
        if (item !== "fontFamily") {
            return
        }

        changeFontFamily(changes[item].newValue)
    }
});
