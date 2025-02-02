import { Rpc } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../../react-query";
import { useQuery } from "@tanstack/react-query";
import { QueryStore } from "../../../../mobx";
import { GetNodeInfoRequest, GetNodeInfoResponse, GetSyncingRequest, GetSyncingResponse, GetLatestBlockRequest, GetLatestBlockResponse, GetBlockByHeightRequest, GetBlockByHeightResponse, GetLatestValidatorSetRequest, GetLatestValidatorSetResponse, GetValidatorSetByHeightRequest, GetValidatorSetByHeightResponse } from "./query";
/** Service defines the gRPC querier service for tendermint queries. */
export interface Service {
  /** GetNodeInfo queries the current node info. */
  getNodeInfo(request?: GetNodeInfoRequest): Promise<GetNodeInfoResponse>;
  /** GetSyncing queries node syncing. */
  getSyncing(request?: GetSyncingRequest): Promise<GetSyncingResponse>;
  /** GetLatestBlock returns the latest block. */
  getLatestBlock(request?: GetLatestBlockRequest): Promise<GetLatestBlockResponse>;
  /** GetBlockByHeight queries block for given height. */
  getBlockByHeight(request: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse>;
  /** GetLatestValidatorSet queries latest validator-set. */
  getLatestValidatorSet(request?: GetLatestValidatorSetRequest): Promise<GetLatestValidatorSetResponse>;
  /** GetValidatorSetByHeight queries validator-set at a given height. */
  getValidatorSetByHeight(request: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse>;
}
export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.getNodeInfo = this.getNodeInfo.bind(this);
    this.getSyncing = this.getSyncing.bind(this);
    this.getLatestBlock = this.getLatestBlock.bind(this);
    this.getBlockByHeight = this.getBlockByHeight.bind(this);
    this.getLatestValidatorSet = this.getLatestValidatorSet.bind(this);
    this.getValidatorSetByHeight = this.getValidatorSetByHeight.bind(this);
  }
  getNodeInfo(request: GetNodeInfoRequest = {}): Promise<GetNodeInfoResponse> {
    const data = GetNodeInfoRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetNodeInfo", data);
    return promise.then(data => GetNodeInfoResponse.decode(new _m0.Reader(data)));
  }
  getSyncing(request: GetSyncingRequest = {}): Promise<GetSyncingResponse> {
    const data = GetSyncingRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetSyncing", data);
    return promise.then(data => GetSyncingResponse.decode(new _m0.Reader(data)));
  }
  getLatestBlock(request: GetLatestBlockRequest = {}): Promise<GetLatestBlockResponse> {
    const data = GetLatestBlockRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetLatestBlock", data);
    return promise.then(data => GetLatestBlockResponse.decode(new _m0.Reader(data)));
  }
  getBlockByHeight(request: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse> {
    const data = GetBlockByHeightRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetBlockByHeight", data);
    return promise.then(data => GetBlockByHeightResponse.decode(new _m0.Reader(data)));
  }
  getLatestValidatorSet(request: GetLatestValidatorSetRequest = {
    pagination: undefined
  }): Promise<GetLatestValidatorSetResponse> {
    const data = GetLatestValidatorSetRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetLatestValidatorSet", data);
    return promise.then(data => GetLatestValidatorSetResponse.decode(new _m0.Reader(data)));
  }
  getValidatorSetByHeight(request: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse> {
    const data = GetValidatorSetByHeightRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetValidatorSetByHeight", data);
    return promise.then(data => GetValidatorSetByHeightResponse.decode(new _m0.Reader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new ServiceClientImpl(rpc);
  return {
    getNodeInfo(request?: GetNodeInfoRequest): Promise<GetNodeInfoResponse> {
      return queryService.getNodeInfo(request);
    },
    getSyncing(request?: GetSyncingRequest): Promise<GetSyncingResponse> {
      return queryService.getSyncing(request);
    },
    getLatestBlock(request?: GetLatestBlockRequest): Promise<GetLatestBlockResponse> {
      return queryService.getLatestBlock(request);
    },
    getBlockByHeight(request: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse> {
      return queryService.getBlockByHeight(request);
    },
    getLatestValidatorSet(request?: GetLatestValidatorSetRequest): Promise<GetLatestValidatorSetResponse> {
      return queryService.getLatestValidatorSet(request);
    },
    getValidatorSetByHeight(request: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse> {
      return queryService.getValidatorSetByHeight(request);
    }
  };
};
export interface UseGetNodeInfoQuery<TData> extends ReactQueryParams<GetNodeInfoResponse, TData> {
  request?: GetNodeInfoRequest;
}
export interface UseGetSyncingQuery<TData> extends ReactQueryParams<GetSyncingResponse, TData> {
  request?: GetSyncingRequest;
}
export interface UseGetLatestBlockQuery<TData> extends ReactQueryParams<GetLatestBlockResponse, TData> {
  request?: GetLatestBlockRequest;
}
export interface UseGetBlockByHeightQuery<TData> extends ReactQueryParams<GetBlockByHeightResponse, TData> {
  request: GetBlockByHeightRequest;
}
export interface UseGetLatestValidatorSetQuery<TData> extends ReactQueryParams<GetLatestValidatorSetResponse, TData> {
  request?: GetLatestValidatorSetRequest;
}
export interface UseGetValidatorSetByHeightQuery<TData> extends ReactQueryParams<GetValidatorSetByHeightResponse, TData> {
  request: GetValidatorSetByHeightRequest;
}
const _queryClients: WeakMap<ProtobufRpcClient, ServiceClientImpl> = new WeakMap();
const getQueryService = (rpc: ProtobufRpcClient | undefined): ServiceClientImpl | undefined => {
  if (!rpc) return;
  if (_queryClients.has(rpc)) {
    return _queryClients.get(rpc);
  }
  const queryService = new ServiceClientImpl(rpc);
  _queryClients.set(rpc, queryService);
  return queryService;
};
export const createRpcQueryHooks = (rpc: ProtobufRpcClient | undefined) => {
  const queryService = getQueryService(rpc);
  const useGetNodeInfo = <TData = GetNodeInfoResponse,>({
    request,
    options
  }: UseGetNodeInfoQuery<TData>) => {
    return useQuery<GetNodeInfoResponse, Error, TData>(["getNodeInfoQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getNodeInfo(request);
    }, options);
  };
  const useGetSyncing = <TData = GetSyncingResponse,>({
    request,
    options
  }: UseGetSyncingQuery<TData>) => {
    return useQuery<GetSyncingResponse, Error, TData>(["getSyncingQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getSyncing(request);
    }, options);
  };
  const useGetLatestBlock = <TData = GetLatestBlockResponse,>({
    request,
    options
  }: UseGetLatestBlockQuery<TData>) => {
    return useQuery<GetLatestBlockResponse, Error, TData>(["getLatestBlockQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getLatestBlock(request);
    }, options);
  };
  const useGetBlockByHeight = <TData = GetBlockByHeightResponse,>({
    request,
    options
  }: UseGetBlockByHeightQuery<TData>) => {
    return useQuery<GetBlockByHeightResponse, Error, TData>(["getBlockByHeightQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getBlockByHeight(request);
    }, options);
  };
  const useGetLatestValidatorSet = <TData = GetLatestValidatorSetResponse,>({
    request,
    options
  }: UseGetLatestValidatorSetQuery<TData>) => {
    return useQuery<GetLatestValidatorSetResponse, Error, TData>(["getLatestValidatorSetQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getLatestValidatorSet(request);
    }, options);
  };
  const useGetValidatorSetByHeight = <TData = GetValidatorSetByHeightResponse,>({
    request,
    options
  }: UseGetValidatorSetByHeightQuery<TData>) => {
    return useQuery<GetValidatorSetByHeightResponse, Error, TData>(["getValidatorSetByHeightQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getValidatorSetByHeight(request);
    }, options);
  };
  return {
    /** GetNodeInfo queries the current node info. */useGetNodeInfo,
    /** GetSyncing queries node syncing. */useGetSyncing,
    /** GetLatestBlock returns the latest block. */useGetLatestBlock,
    /** GetBlockByHeight queries block for given height. */useGetBlockByHeight,
    /** GetLatestValidatorSet queries latest validator-set. */useGetLatestValidatorSet,
    /** GetValidatorSetByHeight queries validator-set at a given height. */useGetValidatorSetByHeight
  };
};
export const createRpcQueryMobxStores = (rpc: ProtobufRpcClient | undefined) => {
  const queryService = getQueryService(rpc);
  class QueryGetNodeInfoStore {
    store = new QueryStore<GetNodeInfoRequest, GetNodeInfoResponse>(queryService?.getNodeInfo);
    getNodeInfo(request: GetNodeInfoRequest) {
      return this.store.getData(request);
    }
  }
  class QueryGetSyncingStore {
    store = new QueryStore<GetSyncingRequest, GetSyncingResponse>(queryService?.getSyncing);
    getSyncing(request: GetSyncingRequest) {
      return this.store.getData(request);
    }
  }
  class QueryGetLatestBlockStore {
    store = new QueryStore<GetLatestBlockRequest, GetLatestBlockResponse>(queryService?.getLatestBlock);
    getLatestBlock(request: GetLatestBlockRequest) {
      return this.store.getData(request);
    }
  }
  class QueryGetBlockByHeightStore {
    store = new QueryStore<GetBlockByHeightRequest, GetBlockByHeightResponse>(queryService?.getBlockByHeight);
    getBlockByHeight(request: GetBlockByHeightRequest) {
      return this.store.getData(request);
    }
  }
  class QueryGetLatestValidatorSetStore {
    store = new QueryStore<GetLatestValidatorSetRequest, GetLatestValidatorSetResponse>(queryService?.getLatestValidatorSet);
    getLatestValidatorSet(request: GetLatestValidatorSetRequest) {
      return this.store.getData(request);
    }
  }
  class QueryGetValidatorSetByHeightStore {
    store = new QueryStore<GetValidatorSetByHeightRequest, GetValidatorSetByHeightResponse>(queryService?.getValidatorSetByHeight);
    getValidatorSetByHeight(request: GetValidatorSetByHeightRequest) {
      return this.store.getData(request);
    }
  }
  return {
    /** GetNodeInfo queries the current node info. */QueryGetNodeInfoStore,
    /** GetSyncing queries node syncing. */QueryGetSyncingStore,
    /** GetLatestBlock returns the latest block. */QueryGetLatestBlockStore,
    /** GetBlockByHeight queries block for given height. */QueryGetBlockByHeightStore,
    /** GetLatestValidatorSet queries latest validator-set. */QueryGetLatestValidatorSetStore,
    /** GetValidatorSetByHeight queries validator-set at a given height. */QueryGetValidatorSetByHeightStore
  };
};