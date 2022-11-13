import '@kyberbits/prism'
import '../agent/agent.css'
import './popup.css'
import {
	DatabankFonts,
	DatabankGetSettings,
	DatabankSaveSettings,
} from '../lib/databank'
import browser from '../lib/browser'

const fontSelector = document.querySelector(
	'#font-selector',
) as HTMLSelectElement
const activatedSelector = document.querySelector(
	'#activated',
) as HTMLInputElement
const onlySelectedDomainsCheckbox = document.querySelector(
	'#onlySelectedDomains',
) as HTMLInputElement

const selectedDomainsContainer = document.querySelector(
	'#selected-domains',
) as HTMLDivElement
const addCurrentDomainButton = document.querySelector(
	'#add-current-domain',
) as HTMLDivElement

for (const font of DatabankFonts) {
	const option = document.createElement('option')
	option.innerHTML = font
	option.value = font
	fontSelector.appendChild(option)
}

function addDomain(host: string): void {
	const tr = document.createElement('tr')
	const td = document.createElement('td')
	td.setAttribute('data-host', host)
	const button = document.createElement('button')
	button.addEventListener('click', () => {
		tr.remove()
		saveSettings()
	})
	button.innerHTML = 'Remove'
	const span = document.createElement('span')
	span.innerHTML = host

	tr.appendChild(td)
	td.appendChild(button)
	td.appendChild(span)

	selectedDomainsContainer.appendChild(tr)
}

function saveSettings() {
	let selectedDomains = [] as string[]
	selectedDomainsContainer.querySelectorAll('td').forEach((item) => {
		selectedDomains.push(item.getAttribute('data-host'))
	})

	DatabankSaveSettings({
		Activated: activatedSelector.checked,
		FontFamily: fontSelector.value,
		OnlySelectedDomains: onlySelectedDomainsCheckbox.checked,
		SelectedDomains: selectedDomains,
	})
}

function restoreSettings() {
	DatabankGetSettings((savedSettings) => {
		fontSelector.value = savedSettings.FontFamily
		activatedSelector.checked = savedSettings.Activated
		onlySelectedDomainsCheckbox.checked = savedSettings.OnlySelectedDomains
		let uniqueValues = [] as string[]
		savedSettings.SelectedDomains.forEach((host) => {
			if (uniqueValues.includes(host)) {
				return
			}

			addDomain(host)
			uniqueValues.push(host)
		})
	})
}

fontSelector.addEventListener('change', saveSettings)
activatedSelector.addEventListener('change', saveSettings)
onlySelectedDomainsCheckbox.addEventListener('change', saveSettings)
addCurrentDomainButton.addEventListener('click', () => {
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		const url = new URL(tabs[0].url)
		const host = url.host
		DatabankGetSettings((settings) => {
			if (settings.SelectedDomains.includes(host)) {
				return
			}

			addDomain(host)
			saveSettings()
		})
	})
})
document.addEventListener('DOMContentLoaded', restoreSettings)
