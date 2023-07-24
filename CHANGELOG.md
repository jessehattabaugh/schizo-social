# Change Log

## July 24th 2023

Multi-account authorization works!! It was quite a lot of work, but I think it was worth it! I want managing multiple accounts at the same time to be one of the trademark features of this app. Currently you can just view the home and public timelines of all your accounts together, and page forward and backward through them at the same time.

There are some improvements left to make; duplicates are being displayed #17, and occasionally when paging there are errors with fetching the timelines. I am using Promise.all which means that if any of the fetches fail they all fail. So I should probably use Promise.allSettled and handle the errors in indivuidual accounts somehow. #22

Also I implemented theme color because it seemed like it'd be easy and it pretty much was.

## July 17th 2023

I implemented a detail page for statuses, and used the multi-page ViewTransition API to transition to it. The CSS is still janky so the transitions aren't smooth, so I'll need to figure out what's going on there. I also implemented a fullscreen view of attachment images, these use single page View Transitions and are similarly janky. Oh and I fixed reblogs.

None of that was important though, just busy work. I need to get back to implementing multi-account.

## May 18th 2023

I kinda lost interest in this project. I tried to implement @enhance/element but it didn't feel right. It seemed like maybe the server wasn't the right place to do all this.

I've since created a few more Fediverse accounts, and now I think I want to make this an app for checking multiple ActivityPub accounts with one feed.

First thing I need to do is figure out why I can't login with my Calckey.social account.

Then I need a way to manage multiple logins simultaneously. Currently, the oauth access_token of the server you authenticate with is essentially your login token. This is stored in your session and sticks with you thanks to a cookie. I'll need to refactor so that it can contain multiple tokens.

Lastly, I still have to deal with updating feeds, but if I'm not going to do it on the client side --especially if I'm going to be streaming multiple feeds--I think I will need to implement a web socket connection to stream the items in.

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

