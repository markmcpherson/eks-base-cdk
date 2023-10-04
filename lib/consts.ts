// Modify these values for your own environment/deployment

import { ArnPrincipal } from "aws-cdk-lib/aws-iam";

export class Constants {
    public static readonly accountId = '123456789012';
    public static readonly region = ' us-east-1';       // us-east-1
    public static readonly cdkQualifier = 'eksdev';

    public static readonly clusterName = 'eks-dev-cluster';

    // this hosted zone must already exist in Route53
    public static readonly externalDNSDomainName = 'example.com'; 

    public static readonly devTeamPrincipals = [
        new ArnPrincipal('arn:aws:iam::123456789012:user/dev-user'),  
    ]

    public static readonly adminTeamPrincipals = [
        new ArnPrincipal('arn:aws:iam::123456789012:user/admin-user'),  
    ]
}
