import axios from "axios";
import { TelemetryEvent } from "./event";

export interface TelemetryServiceOpts {
	appName: string;
	appVersion?: string;
	url: string;
}

export class TelemetryService {

	private opts: TelemetryServiceOpts;

	constructor(opts: TelemetryServiceOpts){
		this.opts = opts;

	}

	async sendEvent(event: TelemetryEvent){
		console.log(event);

		await axios.post(`${this.opts.url}/api/telemetry`, {...event, timestamp: Date.now()});
	}
}