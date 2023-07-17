export declare interface Attachment {
	type: string;
	url: string;
	description: string;
	preview_url: string;
}
export declare interface AppsResponse {
	client_id?: string;
	client_secret?: string;
	id?: string;
	vapid_key?: string;
}
export declare interface Status {
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
export declare interface TokenResponse {
	access_token?: string;
	error?: string;
	error_description?: string;
}
export declare interface VerifyResponse {
	name?: string;
	website?: string;
	vapid_key?: string;
}
