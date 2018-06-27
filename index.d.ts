import { ModuleWithServices } from '@rxdi/core';
import { EthereumConfig } from './ethereum.config';
export declare class EthereumModule {
    static forRoot(config: EthereumConfig): ModuleWithServices;
}
export * from './ethereum.config';
export * from './web3.injection';
export * from './web3.typings';
export * from './helpers';
