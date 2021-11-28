import puppeteer from 'puppeteer'
import { AssetStore } from './asset-store';
import { DisplayManager } from './display-manager';

export class GreenScreen {
	private displayManager: DisplayManager;
	private assetStore: AssetStore;

	constructor(){
		this.displayManager = new DisplayManager('http://localhost:3000/asset1/index.html');
		this.assetStore = new AssetStore({
			assetStoreUrl: `http://3.105.228.88:4200`,
			assetStoragePath: `C:\Users\Administrator\Documents`
		});
	}

	async start(){
		await this.assetStore.init()
		await this.displayManager.init()
	}

}
