export declare class EthereumConfig {
    rpc: string;
    port: number | string;
    contracts?: Array<{
        contract: any;
        abi: any;
    }>;
}
