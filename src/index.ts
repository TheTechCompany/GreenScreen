import puppeteer from 'puppeteer'
import { AssetStore } from './asset-store';
import { DisplayManager } from './display-manager';

export class GreenScreen {
	private displayManager: DisplayManager;
	private assetStore: AssetStore;

	constructor(){
		this.displayManager = new DisplayManager();
		this.assetStore = new AssetStore();
	}

	async start(){
		await this.assetStore.init()
		await this.displayManager.init()
	}

}
