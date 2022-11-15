import React from 'react'
import '@kyberbits/prism'
import '../static/agent.css'
import './popup.css'
import { createRoot } from 'react-dom/client'
import { DatabankGetSettings, DatabankSaveSettings } from './lib/databank'
import PopupComponent from './lib/PopupComponent'

const container = document.getElementById('app') as HTMLDivElement
const root = createRoot(container)
DatabankGetSettings((initialSettings) => {
	root.render(
		<PopupComponent
			initialSettings={initialSettings}
			newSettingsSetter={(newSettings) => {
				DatabankSaveSettings(newSettings)
			}}
		/>,
	)
})
