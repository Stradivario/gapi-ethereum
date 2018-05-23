import { GapiModuleWithServices } from '@gapi/core';
import { GapiEthereumConfig } from './ethereum.config';
export declare class GapiEthereumModule {
    static forRoot(config: GapiEthereumConfig): GapiModuleWithServices;
}
export * from './ethereum.config';
export * from './web3.injection';
export * from './web3.typings';
export * from './helpers';
