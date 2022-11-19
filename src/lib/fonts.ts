import fontStyles from 'bundle-text:./fonts.txt'
import browser from './browser'

export function embedFonts(): void {
	const styleSheet = document.createElement('style')
	styleSheet.textContent = (fontStyles as string).replaceAll(
		`'media`,
		`'${browser.runtime.getURL('media')}`,
	)
	document.head.appendChild(styleSheet)
}
