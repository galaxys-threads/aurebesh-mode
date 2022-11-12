import '@kyberbits/prism'
import '../agent/agent.css'
import './popup.css'
import {
	DatabankFonts,
	DatabankGetSettings,
	DatabankSaveSettings,
} from '../lib/databank'

const fontSelector = document.querySelector(
	'#font-selector',
) as HTMLSelectElement
const activatedSelector = document.querySelector(
	'#activated',
) as HTMLInputElement

for (const font of DatabankFonts) {
	const option = document.createElement('option')
	option.innerHTML = font
	option.value = font
	fontSelector.appendChild(option)
}

function saveSettings() {
	DatabankSaveSettings(
		{
			Activated: activatedSelector.checked,
			FontFamily: fontSelector.value,
		},
		() => {
			// alert("Options where saved")
		},
	)
}

function restoreSettings() {
	DatabankGetSettings((savedSettings) => {
		fontSelector.value = savedSettings.FontFamily
		activatedSelector.checked = savedSettings.Activated
	})
}

fontSelector.addEventListener('change', saveSettings)
activatedSelector.addEventListener('change', saveSettings)
document.addEventListener('DOMContentLoaded', restoreSettings)
