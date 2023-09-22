#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EksStack } from '../lib/eks-stack';
import { Constants } from '../lib/consts';

const app = new cdk.App();

const stackProps: cdk.StackProps = {
  env: { 
    region: Constants.region,
    account: Constants.accountId
  },
  synthesizer: new cdk.DefaultStackSynthesizer({
    qualifier: Constants.cdkQualifier,
  })  
}

// probably an eks cluster would already exist, but creating one here anyway as an example
const eksStack = new EksStack(app, stackProps);

