# Change Log

## January 14th 2023

I took the OAuth login code I wrote and deployed it to schizo.social. Then I made a page that displays `statuses` stored in `state.store`. Finally I created an /api/home get() handler that queries the mastodon host for the user's home feed. That worked so I made it display images and stuff.

Problems
- Only image attachments are displayed.
- Reblogs seem to require special handling.
- All the images load at once which is janky, could lazy load instead.
- Using the highest resolution images which is probably unecessary for mobile viewports.
- need to set alt tags and width/height on image tags to prevent jank

The biggest limitation is that there's no infinite scrolling. Refreshing the page will cause another get() call so you get an updated feed each time. I believe I can add a query param to this get() and pass the id of the last status in order to query the next page of statuses.
