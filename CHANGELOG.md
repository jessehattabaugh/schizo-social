# Change Log

## January 26th 2023

Creating the "from" query and linking to it was easy!

But taking over in the client turns out to be more difficult. KJ says I can create my own client side store, fetch the same data from the api and pass it in to initialize it, then in my event handlers I can manipulate that store (fetch the next page of statuses and append them say) and have the component update.

I don't like the idea of refetching the data for the statuses that are already in the DOM, but perfect is the enemy of good enough.

## January 22nd 2023

Refactored the `ss-timeline` component to separate the ss-status into it's own component. This organizes the code, but will also allow me to register the `ss-status` as a client side custom element so that additional statuses can be added to the timeline later. I used an attributes called `status_id` to pass a key that I use to look up the status in the `ss-status` componentent. If I want this component to load statuses that are not in the store I will need to teach this component to load the statuses from somewhere else if I want them to be able to render statuses that are loaded after the initial `state.store` is loaded.

I've decided to simply add a button that allows me to load the next page of statuses. So I will need to augment the `get()` handler for the timeline to take a param that adds the query param to the mastodon call to only return statuses since the last one in the store. Then I can use that same handler to fetch more statuses. Shared render code, shared data fetch code! All I gotta do is add a little client side logic!

I do feel like the ss-status component will need further refactoring to organize what's becoming a messy stylesheet. The attachments section clearly needs to be componentized as it's only going to get more complex.

## January 14th 2023

I took the OAuth login code I wrote and deployed it to schizo.social. Then I made a page that displays `statuses` stored in `state.store`. Finally I created an /api/home get() handler that queries the mastodon host for the user's home feed. That worked so I made it display images and stuff.

Problems
- Only image attachments are displayed.
- Reblogs seem to require special handling.
- All the images load at once which is janky, could lazy load instead.
- Using the highest resolution images which is probably unecessary for mobile viewports.
- need to set alt tags and width/height on image tags to prevent jank

The biggest limitation is that there's no infinite scrolling. Refreshing the page will cause another get() call so you get an updated feed each time. I believe I can add a query param to this get() and pass the id of the last status in order to query the next page of statuses.

