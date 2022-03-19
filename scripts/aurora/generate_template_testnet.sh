#!/bin/bash

set -e

# !!! this script won't work because the graph fail to deplot to
# aurora-testnet w/ or w/o startBlock
# need to ask the graph support about it
# mainnet works fine with node creation

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0xA1f8149E794b1Ca34a1cA6cbd9e735f48c494bc2/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/83441542/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/aurora-testnet/" ./subgraph.yaml