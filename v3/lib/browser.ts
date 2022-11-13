function getBrowserInstance(): typeof chrome {
	const browserInstance = window.chrome || (window as any)['browser']
	return browserInstance
}

const browser = getBrowserInstance()

export default browser
