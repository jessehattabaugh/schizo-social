/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html }) {
	return html`<style>
			footer {
				font-size: smaller;
				padding: 0.5em;
				text-align: center;
			}
		</style>
		<footer><a href="https://mas.to/@schizanon">schizanon</a> &copy; 2023</footer>`;
}
