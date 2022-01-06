import contract from "./abis/OpenMarket.json";
const deployedNetwork = contract.networks["3"];

export const address = deployedNetwork.address;
export const abi = contract.abi;