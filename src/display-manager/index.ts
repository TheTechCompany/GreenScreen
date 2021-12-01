import puppeteer, { Browser, Page } from 'puppeteer'
import analytics from '../analytics';
import { TelemetryService } from '../telemetry';

export class DisplayManager {
	private browser?: Browser;

	private page?: Page;

	private baseUrl = 'https://hexhive.io'

	public currentAsset: string | undefined = undefined;

	private telemtry: TelemetryService;

	private startTime?: number;

	constructor(telemtry: TelemetryService, defaultUrl?: string){
		this.baseUrl = defaultUrl || this.baseUrl
		this.telemtry = telemtry
	}

	async init(){
		this.browser = await puppeteer.launch({
			headless: false,
			ignoreDefaultArgs: ['--enable-automation'],
			defaultViewport: {
				width: 1080, //1080
				height: 1920 //1920
			},
			args: ['--kiosk', '--disable-infobars']
		})

		this.page = await this.browser?.newPage()
		try{
			await this.page?.goto(this.baseUrl)

		}catch(e){

		}
	}

	async play(id: string){
		try{
			if(this.startTime){
				const time = Date.now() - this.startTime
				await this.telemtry.sendEvent({event: 'campaign-play', properties: {time, id}, source: 'display-manager'})
			}
			this.currentAsset = id;
			this.startTime = Date.now()
			await this.page?.goto(`http://localhost:3000/${id}`)
			await this.page?.addScriptTag({content: analytics})
	
		}catch(e){

		}
	}
}