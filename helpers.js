"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getContractAddress(abi) {
    return abi.networks[Object.keys(abi.networks)[0]].address;
}
exports.getContractAddress = getContractAddress;
