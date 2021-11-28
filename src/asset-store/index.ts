import { IPFS, create } from 'ipfs';

export class AssetStore {
	private node: IPFS;

	constructor(){

	}

	async init(){
		this.node = await create({
			repo: './ipfs-repo',
		})
	}

	pull(hash: string){
		this.node.get(hash)
	}
}