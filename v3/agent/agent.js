const styleSheet = document.createElement("style")
document.head.appendChild(styleSheet)

function changeFontFamily(fontFamily) {
    let styles = ""
    if (fontFamily !== "Site Default") {
        styles = `
            * {
                font-family: "${fontFamily}" !important;
            }
        `
    }

    styleSheet.innerHTML = styles
}

chrome.storage.sync.get({
    fontFamily: 'Site Default',
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
