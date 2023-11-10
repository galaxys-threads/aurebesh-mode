import { useState, useEffect } from 'react'
import browser from './browser'
import { DatabankFonts, DatabankSettings } from './databank'
type SettingsSetter = (settings: DatabankSettings) => void

interface Props {
	initialSettings: DatabankSettings
	newSettingsSetter: SettingsSetter
}

export default function App(props: Props) {
	const [activated, setActivated] = useState(props.initialSettings.Activated)
	const [onlySelectedDomains, setOnlySelectedDomains] = useState(
		props.initialSettings.OnlySelectedDomains,
	)
	const [fontFamily, setFontFamily] = useState(props.initialSettings.FontFamily)
	const [selectedDomains, setSelectedDomains] = useState(
		props.initialSettings.SelectedDomains,
	)

	useEffect(() => {
		props.newSettingsSetter({
			Activated: activated,
			FontFamily: fontFamily,
			OnlySelectedDomains: onlySelectedDomains,
			SelectedDomains: selectedDomains,
		})
	})

	const fontOptions = [] as JSX.Element[]
	DatabankFonts.forEach((font) => {
		fontOptions.push(
			<option key={font} value={font} selected={font === fontFamily}>
				{font}
			</option>,
		)
	})

	let selectedDomainsSection = <></>
	if (onlySelectedDomains) {
		let selectedDomainRows = [] as JSX.Element[]
		selectedDomains.forEach((host) => {
			selectedDomainRows.push(
				<tr>
					<td>
						<button
							onClick={() => {
								var index = selectedDomains.indexOf(host)
								if (index !== -1) {
									selectedDomains.splice(index, 1)
								}
								setSelectedDomains([...selectedDomains])
							}}
						>
							Remove
						</button>
					</td>
					<td>{host}</td>
				</tr>,
			)
		})
		selectedDomainsSection = (
			<>
				<table>
					<thead>
						<tr>
							<th colSpan={2}>Selected Sites</th>
						</tr>
					</thead>
					<tbody>{selectedDomainRows}</tbody>
				</table>
				<button
					onClick={() => {
						browser.tabs
							.query({ active: true, currentWindow: true })
							.then((tabs) => {
								const url = new URL(tabs[0].url)
								const host = url.host
								if (selectedDomains.includes(host)) {
									return
								}
								setSelectedDomains([...selectedDomains, host])
							})
					}}
				>
					Add Current Site
				</button>
			</>
		)
	}

	return (
		<main>
			<h1>
				<span className="aurebesh">Aurebesh Mode</span>
				Aurebesh Mode
			</h1>

			<label>
				<input
					onChange={() => setActivated(!activated)}
					checked={activated}
					type="checkbox"
				/>
				Enabled
			</label>
			<label>
				Font:{' '}
				<select
					onChange={(e) => {
						setFontFamily(e.target.value)
					}}
				>
					{fontOptions}
				</select>
			</label>

			<label>
				<input
					type="radio"
					onClick={() => {
						setOnlySelectedDomains(false)
					}}
					checked={!onlySelectedDomains}
				/>
				Apply to All Sites
			</label>
			<label>
				<input
					type="radio"
					onClick={() => {
						setOnlySelectedDomains(true)
					}}
					checked={onlySelectedDomains}
				/>
				Only Apply To Selected Sites
			</label>
			{selectedDomainsSection}
			<p id="branding">
				<strong>Made By:</strong>{' '}
				<a href="https://galaxysthreads.com/" target="_blank">
					Galaxy's Threads
				</a>
			</p>
		</main>
	)
}
