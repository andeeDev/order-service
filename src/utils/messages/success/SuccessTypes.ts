export enum BidsSuccessTypes {
    BidsFetchAllSuccess = 'BidsFetchAllSuccess',
    BidsCreateSuccess = 'BidsCreateSuccess',
}
export enum AuctionProductsSuccessTypes {
    FetchAllAuctionProductsSuccess = 'FetchAllAuctionProductsSuccess',
    FetchOneAuctionProductSuccess = 'FetchOneAuctionProductSuccess',
    CreateAuctionProductSuccess = 'CreateAuctionProductSuccess',
}
export enum CategorySuccessTypes {
    GetProductsByCategorySuccess = 'GetProductsByCategorySuccess',
    GetAllCategoriesSuccess = 'GetAllCategoriesSuccess',
}
export enum OrderSuccessTypes {
    FetchAllOrdersSuccess = 'FetchAllOrdersSuccess',
    DeleteOrderSuccess = 'DeleteOrderSuccess',
    CreateOrderSuccess = 'CreateOrderSuccess',
}

export enum ProductSuccessTypes {
    FetchAllProductsSuccess = 'FetchAllProductsSuccess',
    FetchOneProductsSuccess = 'FetchOneProductsSuccess',
    CreateProductsSuccess = 'CreateProductsSuccess',
    UpdateProductsSuccess = 'UpdateProductsSuccess',
    DeleteProductsSuccess = 'DeleteProductsSuccess',
}
const SuccessCombined: any = {
    ...BidsSuccessTypes,
    ...AuctionProductsSuccessTypes,
    ...CategorySuccessTypes,
    ...OrderSuccessTypes,
    ...ProductSuccessTypes,
};

export type SuccessType = typeof SuccessCombined;
