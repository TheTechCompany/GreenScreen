import puppeteer from 'puppeteer'
import { AssetStore } from './asset-store';
import { DisplayManager } from './display-manager';
import { TelemetryService } from './telemetry';

export class GreenScreen {
	private displayManager: DisplayManager;
	private assetStore: AssetStore;

	private telemtry: TelemetryService;

	private running: boolean = false;

	constructor(){
		this.telemtry = new TelemetryService({
			appName: 'GreenScreen',
			url: `http://3.105.228.88:4200`
		})

		this.displayManager = new DisplayManager(this.telemtry);

		this.assetStore = new AssetStore({
			displayManager: this.displayManager,
			telemtry: this.telemtry,
			assetStoreUrl: `http://3.105.228.88:4200`,
			assetStoragePath:  process.env.USERPROFILE+'\\Documents' || `C:\\Users\\Administrator\\Documents\\`
		});
	}

	async start(){
		this.running = true;
		await this.assetStore.init()
		await this.displayManager.init()
		await this.schedule()
	}

	async schedule(){
		while(this.running){
			
			const asset = this.assetStore.getNextAsset()

			if(asset?.assetFolder){
				await this.displayManager.play(asset?.assetFolder)
			}

			await new Promise((resolve) => setTimeout(resolve, 15000))

		}
	}

}
