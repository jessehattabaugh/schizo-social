export interface Account {
	avatar: string;
	display_name: string;
	header: string;
	note: string;
	url: string;
	username: string;
}

export type Authorization = { access_token: string; host: string };

export type Authorizations = Authorization[];

export interface Attachment {
	description: string;
	preview_url: string;
	type: string;
	url: string;
}

/** @see https://docs.joinmastodon.org/methods/apps/#create */
export interface AppsResponse {
	client_id?: string;
	client_secret?: string;
	id?: string;
	vapid_key?: string;
}

/** @see https://docs.joinmastodon.org/entities/Status/ */
export interface Status {
	account: Account;
	application: any;
	authorizations?: Authorizations;
	content: string;
	created_at: string;
	created: number;
	emojis: Emoji[];
	id: string;
	media_attachments: Attachment[];
	mentions: Mention[];
	reblog?: Status;
	sensitive: boolean;
	spoiler_text: string;
	tags: Tag[];
	uri: string;
	url: string;
	visibility: string;
}

export type Statuses = Status[];
export type StatusMap = { [id: string]: Status };
export type StatusIds = string[];

/** @see https://docs.joinmastodon.org/methods/oauth/#token */
export interface TokenResponse {
	access_token?: string;
	error?: string;
	error_description?: string;
}

/** @see https://docs.joinmastodon.org/methods/apps/#verify_credentials */
export interface VerifyResponse {
	error?: string;
	name?: string;
	vapid_key?: string;
	website?: string;
}

/** @see https://docs.joinmastodon.org/methods/timelines/ */
export type TimelineResponse = Status[];
