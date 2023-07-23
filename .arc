@app
schizo-social

@aws
architecture arm64
region us-east-1
runtime nodejs18.x

@plugins
enhance/arc-plugin-enhance

@static
compression true
fingerprint true

@tables
apps
	client_id String
	client_secret String
	encrypt true
	host *String
	id String
	PointInTimeRecovery true
	scope **String
	vapid_key String
