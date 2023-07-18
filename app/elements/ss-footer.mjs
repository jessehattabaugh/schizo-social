/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html }) {
	return html`<style>
			footer {
				font-size: smaller;
				padding: 0.5em;
				text-align: center;
			}
			footer a:not(:first-of-type()):before {
				content: '•';
			}
		</style>
		<footer>
			<a href="https://mas.to/@schizanon">schizanon</a> &copy; 2023
			<a href="/terms">Terms of Service</a>
		</footer>`;
}
