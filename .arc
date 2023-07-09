@app
schizo-social

@aws
architecture arm64
region us-east-1
runtime nodejs18.x

@plugins
enhance/arc-plugin-enhance

@static
fingerprint false

@tables
apps
	client_id String
	client_secret String
	encrypt true
	host *String
	id String
	PointInTimeRecovery true
	vapid_key String
