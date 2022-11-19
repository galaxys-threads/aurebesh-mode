function getBrowserInstance(): typeof chrome {
	const browserInstance = chrome || (browser as any)
	return browserInstance
}

const browser = getBrowserInstance()

export default browser
