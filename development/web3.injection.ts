import { InjectionToken } from '@gapi/core';
import { Eth, Utils, Provider, Providers, HttpProvider } from './web3.typings';

export const Web3InjectionToken = new InjectionToken('WEB3_TOKEN');

export interface Web3Interface {
    eth: Eth;
    utils: Utils;
    providers: Providers;
    setProvider(provider: Provider): void;
}
export interface Web3InjectionToken {
    web3: Web3Interface;
    provider: HttpProvider;
}
