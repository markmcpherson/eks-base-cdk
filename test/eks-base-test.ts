import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { EksStack } from '../lib/eks-stack';

const stackProps: cdk.StackProps = {
    env: { 
      region: process.env.CDK_DEPLOY_REGION,
      account: process.env.CDK_DEPLOY_ACCOUNT
    }
  }
  
// example test. To run these tests, uncomment this file along with the
// example resource in lib/personio-sre-stack.ts
test('EKS Created', () => {
   const app = new cdk.App();
   // WHEN
   const stack = new EksStack(app, stackProps).stack;
   // THEN
   const template = Template.fromStack(stack);

   template.hasResourceProperties('Custom::AWSCDK-EKS-Cluster', {
   VisibilityTimeout: 3600
   });
});
