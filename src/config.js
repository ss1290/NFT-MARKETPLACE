import contract from "./abis/OpenMarket.json";
const deployedNetwork = contract.networks["5777"];

export const address = deployedNetwork.address;
export const abi = contract.abi;