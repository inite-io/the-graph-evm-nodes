#!/bin/bash

set -e

# !!! this script won't work because the graph fail to deplot to
# aurora-testnet w/ or w/o startBlock
# need to ask the graph support about it
# mainnet works fine with node creation

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0xB154e9F0EA0509DBF4c8bf40a93886ddBb0FA435/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/25362952/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/mumbai/" ./subgraph.yaml