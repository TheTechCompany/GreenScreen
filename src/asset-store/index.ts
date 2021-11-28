import { IPFS, create } from 'ipfs';
import { AssetStoreServer } from './server';

export class AssetStore {
	private node?: IPFS;

	private server: AssetStoreServer;

	constructor(){
		this.server = new AssetStoreServer();
	}

	async init(){
		await this.server.start()
		this.node = await create({
			repo: './ipfs-repo',
		})
	}

	pull(hash: string){
		this.node?.get(hash)
	}
}