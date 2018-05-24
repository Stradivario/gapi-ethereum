import { Service } from '@gapi/core';

@Service()
export class GapiEthereumConfig {
    rpc: string = 'http://localhost';
    port: number | string = 8545;
    contracts: Array<{contract: any; abi: any}>
}