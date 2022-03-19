import { bigInt, BigInt, json, JSONValue } from "@graphprotocol/graph-ts"
import {
  BSCTestNet,
  Approval,
  ApprovalForAll,
  Transfer,
  buyed
} from "../generated/BSCTestNet/BSCTestNet"
import { NFTToken, User } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract._tokenIds(...)
  // - contract.balanceOf(...)
  // - contract.getApproved(...)
  // - contract.isApprovedForAll(...)
  // - contract.minero(...)
  // - contract.nTokenOnSale(...)
  // - contract.name(...)
  // - contract.ownerOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.tokensData(...)
  // - contract.totalSupply(...)
  // - contract.minar(...)
  // - contract.transferirNft(...)
  // - contract.quemarNft(...)
  // - contract.obtenerNfts(...)
  // - contract.obtenerPaginav1(...)
  // - contract.obtenerPaginav2(...)
  // - contract.tokensOf(...)
  // - contract.tokensOfPaginav1(...)
  // - contract.getItemInfo(...)
  // - contract.obtenerNftsbyrango(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransfer(event: Transfer): void {
  let token = NFTToken.load(event.params.tokenId.toString());
  if (!token) {
    token = new NFTToken(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.token_id = event.params.tokenId;

    // when new token generated creator is owner
    token.owner = token.creator;
    // initially token is on sale
  
    let tokenContract = BSCTestNet.bind(event.address);
    token.price = tokenContract.getItemInfo(event.params.tokenId)[0].price;
    token.json = tokenContract.getItemInfo(event.params.tokenId)[0].data;
    token.on_sale = tokenContract.getItemInfo(event.params.tokenId)[0].onSale;
    
    const data = json.fromString(tokenContract.getItemInfo(event.params.tokenId)[0].data);
    const title = data.toObject().get("title");
    if (title)  {
      token.title = title.toString();
    }

    const description = data.toObject().get("description");
    if (description) {
      token.description = description.toString();
    }

    const media = data.toObject().get("media");
    if (media) {
      token.media = media.toString();
    }

    const reference = data.toObject().get("reference");
    if (reference) {
      token.reference = reference.toString();
    }
  }
  token.save();

  if (token && event.params.from != event.params.to) {
    token.owner = event.params.to.toHexString();
  }

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }

}

export function handlebuyed(event: buyed): void {
  
}
