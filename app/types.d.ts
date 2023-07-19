export interface Attachment {
	type: string;
	url: string;
	description: string;
	preview_url: string;
}
// https://docs.joinmastodon.org/methods/apps/#create
export interface AppsResponse {
	client_id?: string;
	client_secret?: string;
	id?: string;
	vapid_key?: string;
}
export interface Status {
	created_at: string;
	id: string;
	uri: string;
	content: string;
	visibility: string;
	sensitive: boolean;
	spoiler_text: string;
	application: any;
	account: Account;
	media_attachments: Attachment[];
	mentions: Mention[];
	tags: Tag[];
	emojis: Emoji[];
	reblog?: Status;
}
// https://docs.joinmastodon.org/methods/oauth/#token
export interface TokenResponse {
	access_token?: string;
	error?: string;
	error_description?: string;
}
// https://docs.joinmastodon.org/methods/apps/#verify_credentials
export interface VerifyResponse {
	error?: string;
	name?: string;
	vapid_key?: string;
	website?: string;
}
// https://docs.joinmastodon.org/methods/timelines/
export type TimelineResponse = Status[];
