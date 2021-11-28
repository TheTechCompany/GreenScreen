import puppeteer from 'puppeteer'

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		ignoreDefaultArgs: ['--enable-automation'],
		defaultViewport: {
			width: 1920, //1080
			height: 1080 //1920
		},
		args: ['--kiosk', '--disable-infobars']
	})

	const page = await browser.newPage()

	await page.goto('https://hexhive.io')
})()