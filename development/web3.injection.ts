import { InjectionToken } from '@gapi/core';
import { Eth, Utils, Provider, Providers, HttpProvider } from './web3.typings';

export const Web3Token = new InjectionToken('GAPI_WEB3_TOKEN');
export const Web3ProviderToken = new InjectionToken('GAPI_WEB3_PROVIDER_TOKEN');

export interface Web3Token {
    eth: Eth;
    utils: Utils;
    providers: Providers;
    setProvider(provider: Provider): void;
}

export interface Web3ProviderToken extends HttpProvider {}
