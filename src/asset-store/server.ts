import express, {Express} from 'express'
import path from 'path';

export class AssetStoreServer {
	private app : Express;

	constructor(){
		this.app = express()
		this.app.use(express.static(`C:\\Users\\Administrator\\Documents\\`))
	}

	start(){
		this.app.listen(3000, () => {
			console.log("Asset Store Serving on 3000")
		})
	}
}