#!/bin/bash

set -e

# !!! this script won't work because the graph fail to deplot to
# aurora-testnet w/ or w/o startBlock
# need to ask the graph support about it
# mainnet works fine with node creation

# prepare template 
rm ./subgraph.yaml || true 
cp ./subgraph_template.yaml ./subgraph.yaml 
sed -i '' -e "s/{{ADDRESS}}/0x54cF9d446c364d37E9550DB083Eee8c9Be2ad69B/" ./subgraph.yaml 
sed -i '' -e "s/{{START_BLOCK}}/25829306/" ./subgraph.yaml
sed -i '' -e "s/{{CHAIN}}/matic/" ./subgraph.yaml