CDK_DEPLOY_ACCOUNT="994583469796"
CDK_DEPLOY_REGION="eu-west-2"
CDK_QUALIFIER="ekscdk"

cdk synth
cdk bootstrap --qualifier $CDK_QUALIFIER -toolkit-stack-name "CDKToolkit-$CDK_QUALIFIER"



