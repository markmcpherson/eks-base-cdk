import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { CfnWorkspace } from 'aws-cdk-lib/aws-aps';

export class EksStack {
    public readonly stack: blueprints.EksBlueprint;
    public readonly clusterInfo: blueprints.ClusterInfo;

    constructor(scope: Construct, props?: cdk.StackProps) {

        const ampWorkspaceName = "blueprints-amp-workspace";
        const ampWorkspace: CfnWorkspace = blueprints.getNamedResource(ampWorkspaceName);

        const addOns: Array<blueprints.ClusterAddOn> = [
            new blueprints.addons.MetricsServerAddOn(),
            new blueprints.addons.ClusterAutoScalerAddOn(),
            new blueprints.addons.AwsLoadBalancerControllerAddOn(),
            new blueprints.addons.VpcCniAddOn(),
            new blueprints.addons.CoreDnsAddOn(),
            new blueprints.addons.KubeProxyAddOn(),
            new blueprints.addons.CertManagerAddOn(),
            new blueprints.addons.AdotCollectorAddOn(),
            new blueprints.addons.KubeStateMetricsAddOn(),
            new blueprints.addons.PrometheusNodeExporterAddOn(),
            new blueprints.addons.AmpAddOn({
                ampPrometheusEndpoint: ampWorkspace.attrPrometheusEndpoint,
                deploymentMode: blueprints.DeploymentMode.DEPLOYMENT,
                namespace: 'default',
                name: 'adot-collector-amp'
            })
        ];

        this.stack = blueprints.EksBlueprint.builder()
            .account(props?.env?.account)
            .region(props?.env?.region)
            .version('auto')
            .addOns(...addOns)
            .useDefaultSecretEncryption(true) // set to false to turn secret encryption off (non-production/demo cases)
            .resourceProvider(ampWorkspaceName, new blueprints.CreateAmpProvider(ampWorkspaceName, ampWorkspaceName, [
                {
                    key: 'Name',
                    value: 'Sample-AMP-Workspace',
                },
                {
                    key: 'Environment',
                    value: 'Development',
                },
                {
                    key: 'Owner',
                    value: 'mark',
                }
            ]))
            .build(scope, 'eks-blueprint', props);
        
        this.clusterInfo = this.stack.getClusterInfo();
    }
}
