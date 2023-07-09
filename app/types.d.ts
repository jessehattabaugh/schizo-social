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
