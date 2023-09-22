import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { Constants } from './consts';

class DevTeam extends blueprints.ApplicationTeam {
    constructor() {
        super({
            name: 'dev-team',
            users: Constants.devTeamPrincipals,
        })
    }
}

class AdminTeam extends blueprints.PlatformTeam {
    constructor() {
        super({
            name: 'admin-team',
            users: Constants.adminTeamPrincipals
        })
    }
}

export class EksStack {
    public readonly stack: blueprints.EksBlueprint;
    public readonly clusterInfo: blueprints.ClusterInfo;

    constructor(scope: Construct, props?: cdk.StackProps) {
        this.stack = blueprints.ObservabilityBuilder.builder()
            .account(props?.env?.account)
            .region(props?.env?.region)
            .version('auto')
            .enableMixedPatternAddOns()
            .addOns(...[
                new blueprints.addons.ClusterAutoScalerAddOn(),
                new blueprints.addons.EbsCsiDriverAddOn(),
                new blueprints.addons.EfsCsiDriverAddOn(),
                new blueprints.addons.ExternalDnsAddOn({
                    hostedZoneResources: ['HostedZone1']
                }),
                new blueprints.addons.CloudWatchLogsAddon({
                    logGroupPrefix: `/aws/eks/${Constants.clusterName}`,
                    logRetentionDays: 30
                }),
                new blueprints.addons.VpcCniAddOn(),
                new blueprints.addons.CloudWatchAdotAddOn({
                    deploymentMode: blueprints.cloudWatchDeploymentMode.DEPLOYMENT,
                    namespace: 'default',
                    name: 'adot-collector-cloudwatch',
                    metricsNameSelectors: ['apiserver_request_.*', 'container_memory_.*', 'container_threads', 'otelcol_process_.*'],
                }),
                new blueprints.addons.XrayAdotAddOn(),
            ])
            .useDefaultSecretEncryption(true) 
            .resourceProvider('HostedZone1', new blueprints.LookupHostedZoneProvider(Constants.externalDNSDomainName))
            .teams(...[
                new AdminTeam(),
                new DevTeam()
            ])
            .build(scope, Constants.clusterName, props);

        this.clusterInfo = this.stack.getClusterInfo();

    }
}
