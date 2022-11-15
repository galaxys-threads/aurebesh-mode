import browser from './lib/browser'
import { DatabankGetSettings, DatabankSettings } from './lib/databank'

// Add the stylesheet to the document so we can change it later
const styleSheet = document.createElement('style')
document.head.appendChild(styleSheet)

function shouldApplyAurebeshFonts(settings: DatabankSettings): boolean {
	if (!settings.Activated) {
		return false
	}

	if (settings.OnlySelectedDomains) {
		const currentDomain = window.location.host
		if (!settings.SelectedDomains.includes(currentDomain)) {
			return false
		}
	}

	return true
}

function changeFontFamily(settings: DatabankSettings) {
	let styles = ''
	if (shouldApplyAurebeshFonts(settings)) {
		styles = `
			* {
				font-family: "${settings.FontFamily}" !important;
			}
		`
	}

	styleSheet.innerHTML = styles
}

browser.storage.onChanged.addListener((changes, area) => {
	if (area !== 'sync') {
		return
	}

	DatabankGetSettings(changeFontFamily)
})

DatabankGetSettings(changeFontFamily)
