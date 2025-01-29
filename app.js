/**
 * @file deploys this site
 * @see https://docs.aws.amazon.com/cdk/api/v2/
 */

import {App, RemovalPolicy, Stack} from 'aws-cdk-lib';
import { Bucket, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

/**
 * A stack that deploys a website to an S3 bucket.
 * @extends Stack
 * @param {import('constructs').Construct} scope The parent construct.
 * @param {string} id An identifier for this construct.
 * @param {import('aws-cdk-lib').StackProps} [props] Stack properties.
 */
class WWWStack extends Stack {
	constructor(scope, id, props) {
		super(scope, id, props);

		// Create an S3 bucket that hosts a website
		const destinationBucket = new Bucket(this, 'WWWBucket', {
			autoDeleteObjects: true,
			blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
			publicReadAccess: true,
			removalPolicy: RemovalPolicy.DESTROY,
			websiteIndexDocument: 'index.html',
		});

		// Deploy files in ./www to the bucket
		new BucketDeployment(this, 'WWWDeployment', {
			sources: [Source.asset('./www')],
			destinationBucket,
		});
	}
}

// Create the CDK app and stack
const app = new App();
new WWWStack(app, 'WWWStack');
