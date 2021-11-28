import puppeteer from 'puppeteer'

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: {
			width: 1080,
			height: 1920
		},
		args: ['--kiosk', '--disable-infobars']
	})

	const page = await browser.newPage()

	await page.goto('https://hexhive.io')
})()