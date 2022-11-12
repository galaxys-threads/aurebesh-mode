function getBrowserInstance(): typeof chrome {
    // Get extension api Chrome or Firefox
    const browserInstance = window.chrome || (window as any)['browser'];
    return browserInstance;
}

const browser = getBrowserInstance()

export default browser
