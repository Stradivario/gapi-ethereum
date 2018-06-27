import { InjectionToken } from '@rxdi/core';
import { Eth, Utils, Provider, Providers, HttpProvider } from './web3.typings';
export declare const Web3Token: InjectionToken<{}>;
export declare const Web3ProviderToken: InjectionToken<{}>;
export interface Web3Token {
    eth: Eth;
    utils: Utils;
    providers: Providers;
    setProvider(provider: Provider): void;
}
export interface Web3ProviderToken extends HttpProvider {
}
