import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc } from "./constructs/vpc";
import { Ec2Instance } from "./constructs/ec2-instance";
import { Aurora } from "./constructs/aurora";

export class AuroraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, "Vpc");

    // Aurora
    const aurora = new Aurora(this, "Aurora", {
      vpc: vpc.vpc,
      securityGroup: vpc.dbServerSg,
    });

    // EC2 Instance
    new Ec2Instance(this, "Ec2 Instance A", {
      vpc: vpc.vpc,
      securityGroup: vpc.dbClientSg,
    });
  }
}
