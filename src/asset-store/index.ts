import { IPFS, create } from 'ipfs';
import { AssetStoreServer } from './server';
import axios from 'axios';
import { promises } from 'fs';
import tar from 'tar';

export interface AssetStoreConfiguration {
	assetStoreUrl?: string;
	assetStoragePath?: string;
}

export class AssetStore {
	private node?: IPFS;

	private server: AssetStoreServer;

	private assetStoreUrl?: string; //URL to get asset manifest from

	private assetStoragePath?: string; //Storage path to store assets

	private manifest : {
		id?: string,
		name?: string,
		assetFolder: string
	}[] = []

	constructor(opts: AssetStoreConfiguration){
		this.assetStoreUrl = opts.assetStoreUrl
		this.assetStoragePath = opts.assetStoragePath || '/tmp/'

		this.server = new AssetStoreServer();
	}

	async pullAll(){
		await Promise.all(this.manifest.map(async (manifestItem) => {
			console.log(`Pulling ${manifestItem.name}`)
			const data = await this.pull(manifestItem.assetFolder)
			if(!data) return;
			await promises.writeFile(`${this.assetStoragePath}/${manifestItem.id}`, data)

			await tar.x({
				file: `${this.assetStoragePath}/${manifestItem.id}`,
				cwd: this.assetStoragePath,
			})
			console.log(`Pulled ${manifestItem.name}`)

		}))
	}

	async loadManifest(){
		const resp = await axios.get(`${this.assetStoreUrl}/distribute`)
		this.manifest = resp.data.campaigns;
	}

	async init(){
		await this.server.start()
		this.node = await create({
			repo: './ipfs-repo',
		})

		await this.loadManifest()
		await this.pullAll()
	}

	async pull(hash: string){
		const pull = this.node?.get(hash)
		if(!pull) return;
		let ret = [];
		for await (const chunk of pull){
			ret.push(chunk)
		}
		return Buffer.concat(ret)
	}
}