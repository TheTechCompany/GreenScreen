import puppeteer, { Browser, Page } from 'puppeteer'

export class DisplayManager {
	private browser?: Browser;

	private page?: Page;

	private baseUrl = 'https://hexhive.io'

	constructor(defaultUrl?: string){
		this.baseUrl = defaultUrl || this.baseUrl
	}

	async init(){
		this.browser = await puppeteer.launch({
			headless: false,
			ignoreDefaultArgs: ['--enable-automation'],
			defaultViewport: {
				width: 1920, //1080
				height: 1080 //1920
			},
			args: ['--kiosk', '--disable-infobars']
		})

		this.page = await this.browser?.newPage()

		await this.page?.goto(this.baseUrl)
	}

	async play(id: string){
		await this.page?.goto(`http://localhost:3000/${id}`)
	}
}