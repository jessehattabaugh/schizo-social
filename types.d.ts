import {
	EnhanceApiReq,
	EnhanceApiRes,
	EnhanceApiFn,
	EnhanceHeadFn,
	EnhanceHeadFnArg,
	EnhanceElemResult,
} from '@enhance/types';
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
	meta: { small: { aspect: number }; original: { aspect: number } };
}

/** @see https://docs.joinmastodon.org/methods/apps/#create */
export interface AppsResponse {
	client_id?: string;
	client_secret?: string;
	id?: string;
	vapid_key?: string;
}

interface FilterResult {
	filter: {
		context: string[];
		expires_at: string;
		filter_actions: string;
		id: string;
		title: string;
	};
	keyword_matches: string[];
	status_matches: string[];
}

interface FollowedTagHistory {
	accounts: string;
	uses: string;
}
interface FollowedTag {
	name: string;
	history: FollowedTagHistory[];
}

interface FollowedTagData {
	accounts: number;
	days: number;
	name: string;
	uses: number;
}
interface FollowedTagHistoryData {
	accounts: number;
	days: number;
	uses: number;
}
interface FollowedTagDataForAuths {
	authorization: Authorization;
	tags: FollowedTagData[];
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
	filtered: FilterResult[];
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

/** @see https://docs.joinmastodon.org/methods/timelines/ */
export type TimelineResponse = Status[];

/** @see https://docs.joinmastodon.org/methods/apps/#verify_credentials */
export interface VerifyResponse {
	error?: string;
	name?: string;
	vapid_key?: string;
	website?: string;
}
