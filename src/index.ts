import puppeteer from 'puppeteer'
import { AssetStore } from './asset-store';
import { DisplayManager } from './display-manager';

export class GreenScreen {
	private displayManager: DisplayManager;
	private assetStore: AssetStore;

	private running: boolean = false;

	constructor(){
		this.displayManager = new DisplayManager();
		this.assetStore = new AssetStore({
			assetStoreUrl: `http://3.105.228.88:4200`,
			assetStoragePath: `C:\\Users\\Administrator\\Documents\\`
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
