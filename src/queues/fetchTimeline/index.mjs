// learn more about queue functions here: https://arc.codes/queues
/** @param {import('@architect/functions/types/events').ArcQueues} event */
export async function handler(event) {
	console.log(JSON.stringify(event, null, 2));
	return;
}
