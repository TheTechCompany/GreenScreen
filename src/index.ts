import puppeteer from 'puppeteer'

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--kiosk']
	})

	const page = await browser.newPage()

	await page.goto('https://hexhive.io')
})()