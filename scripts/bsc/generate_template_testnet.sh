#!/bin/bash

set -e

# !!! this script won't work because the graph fail to deplot to
# aurora-testnet w/ or w/o startBlock
# need to ask the graph support about it
# mainnet works fine with node creation

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0xF7cAD1f9De025022BB370Bc59D9B2f4cE507771d/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/17393453/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/chapel/" ./subgraph.yaml