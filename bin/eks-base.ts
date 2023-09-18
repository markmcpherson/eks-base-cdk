#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EksStack } from '../lib/eks-stack';

const app = new cdk.App();

const stackProps: cdk.StackProps = {
  env: { 
    region: process.env.CDK_DEPLOY_REGION,
    account: process.env.CDK_DEPLOY_ACCOUNT
  },
  synthesizer: new cdk.DefaultStackSynthesizer({
    qualifier: process.env.CDK_QUALIFIER,
  })  
}

// probably an eks cluster would already exist, but creating one here anyway as an example
const eksStack = new EksStack(app, stackProps);


