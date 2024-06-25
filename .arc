@app
schizo-social

@aws
architecture arm64
region us-east-1
runtime nodejs20.x

@plugins
enhance/arc-plugin-enhance

@static
compression true
fingerprint true
prune true

@tables
apps
	encrypt true
	PointInTimeRecovery true
	id *String
	client_id String
	client_secret String
	host String
	redirect_uri String
	scope String
	vapid_key String

statuses
	encrypt true
	PointInTimeRecovery true
	id *String
	content String
	created_at String
	timeline String
	uri String

@queues
timelineFetch
