export interface TelemetryEvent {
	event: string;
	properties?: { [key: string]: any };
	source?: string;
	timestamp?: string;
}