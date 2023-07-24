import { client_name } from './constants.mjs';

/** @type {import('./types').ThemedHeadFn} */
export default function Head(arg0) {
	const { req } = arg0;
	const { path, themeColor = '#ff0000' } = req;

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="view-transition" content="same-origin" />

		<title>${client_name}/${path}</title>
		<meta name="description" content="mastodon client with a focus on performance" />
		<meta name="theme-color" content="#000000" />

		<link rel="icon" href="/_public/logo.svg" />
		<link rel="icon" type="image/png" sizes="32x32" href="/_public/logo32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/_public/logo16.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="/_public/logo180.png" />
		<link rel="stylesheet" href="/_public/main.css" />
		<link rel="manifest" href="/_public/manifest.json" />

		<script async type="module" src="/_public/browser/async.mjs"></script>
		<style>
			:root {
				--theme-color: ${themeColor}
			}
		</style>
	</head>
</html>`;
}
