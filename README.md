# eks-base-cdk
CDK to create a basic EKS cluster for use in other examples/tests

## Pre-Requisites

* NodeJS
* `npm install -g typescript cdk`
# `npm install`

## Build/Deploy
* `cdk synth`
* `cdk bootstrap --toolkit-stack-name 'CDKToolkit-<qualifier>' --qualifier <qualifier>` (once per AWS account/region. qualifier is defined in the consts.ts)
* `cdk deploy`
