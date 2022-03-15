import { bigInt, BigInt } from "@graphprotocol/graph-ts"
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
    token.creator = event.params.to.toString();
    token.token_id = event.params.tokenId;

    // when new token generated creator is owner
    token.owner = token.creator;
    // initially token is on sale
    token.on_sale = true;
  
    let tokenContract = BSCTestNet.bind(event.address);
    // let tokenContract = BSCTestNet.bind(event.address);
    // let some = new BigInt(0);
    // token.price = tokenContract.getItemInfo(some)[0].price;
  }
  token.save();

  let user = User.load(event.params.to.toString());
  if (!user) {
    user = new User(event.params.to.toString());
    user.save();
  }

}

export function handlebuyed(event: buyed): void { }
