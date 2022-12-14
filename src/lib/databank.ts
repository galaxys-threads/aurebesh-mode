import browser from '../lib/browser'

export interface DatabankSettings {
	Activated: boolean
	OnlySelectedDomains: boolean
	SelectedDomains: string[]
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

const DefaultFont = DatabankFonts[0]

export function DatabankDefaults(): DatabankSettings {
	var defaults: DatabankSettings = {
		Activated: false,
		OnlySelectedDomains: false,
		SelectedDomains: [],
		FontFamily: DefaultFont,
	}
	return defaults
}

export function DatabankSaveSettings(
	settings: DatabankSettings,
	callback?: CallableFunction,
): void {
	browser.storage.local.set(settings, () => {
		if (callback) {
			callback()
		}
	})
}

type GetFunc = (savedSettings: DatabankSettings) => void
export function DatabankGetSettings(callback: GetFunc): void {
	browser.storage.local.get(
		DatabankDefaults(),
		function (savedSettings: DatabankSettings | undefined) {
			if (!savedSettings) {
				savedSettings = DatabankDefaults()
			}
			callback(savedSettings)
		},
	)
}
