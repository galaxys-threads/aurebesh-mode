import browser from '../lib/browser'

export interface DatabankSettings {
	Activated: boolean
	FontFamily: string
}

export const DatabankFonts = [
	'Aurebesh AF Canon',
	'Aurebesh AF Canon Tech',
	'Aurebesh AF Legends',
	'Aurebesh AF Legends Tech',
	'Aurebesh Red',
	'Aurebesh Code',
]

export function DatabankDefaults(): DatabankSettings {
	var defaults: DatabankSettings = {
		Activated: false,
		FontFamily: DatabankFonts[0],
	}
	return defaults
}

export function DatabankSaveSettings(
	settings: DatabankSettings,
	callback: CallableFunction,
): void {
	browser.storage.sync.set(settings, () => {
		callback()
	})
}

type GetFunc = (savedSettings: DatabankSettings) => void
export function DatabankGetSettings(callback: GetFunc): void {
	browser.storage.sync.get(
		DatabankDefaults(),
		function (savedSettings: DatabankSettings) {
			callback(savedSettings)
		},
	)
}
