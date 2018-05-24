import { Service } from '@gapi/core';

@Service()
export class GapiEthereumConfig {
    rpc: string = 'http://localhost';
    port: number | number = 8545;
}