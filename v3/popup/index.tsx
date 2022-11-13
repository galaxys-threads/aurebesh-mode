import '@kyberbits/prism'
import '../agent/agent.css'
import './index.css'
import { createRoot } from 'react-dom/client'
import { DatabankGetSettings, DatabankSaveSettings } from '../lib/databank'
import Popup from './Popup'

const container = document.getElementById('app')
const root = createRoot(container)
DatabankGetSettings((initialSettings) => {
	root.render(
		<Popup
			initialSettings={initialSettings}
			newSettingsSetter={(newSettings) => {
				DatabankSaveSettings(newSettings)
			}}
		/>,
	)
})
