// import enhance from '@enhance/element';
// import SSTimeline from '../elements/ss-timeline.mjs';

// enhance('ss-timeline', {
// 	connected() {
// 		console.debug('⌚');
// 		// setTimeout refresh the timeline
// 	},
// 	render: SSTimeline,
// });

if ('serviceWorker' in navigator) {
	window.addEventListener('load', async () => {
		try {
			await navigator.serviceWorker.register('sw', {
				scope: '/',
			});
			console.debug('👨‍🏭® service worker registered');
		} catch (exception) {
			console.error('👨‍🏭⚠ service worker failed', exception);
		}
	});
}

console.debug('🦥 async scripts loaded');
