import browser from '../lib/browser'
import { DatabankGetSettings, DatabankSettings } from '../lib/databank'

const styleSheet = document.createElement('style')
document.head.appendChild(styleSheet)

function changeFontFamily(settings: DatabankSettings) {
	let styles = ''
	if (settings.Activated) {
		styles = `
            * {
                font-family: "${settings.FontFamily}" !important;
            }
        `
	}

	styleSheet.innerHTML = styles
}

DatabankGetSettings(changeFontFamily)

browser.storage.onChanged.addListener((changes, area) => {
	if (area !== 'sync') {
		return
	}

	DatabankGetSettings(changeFontFamily)
})
