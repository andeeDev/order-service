export enum BidsErrorTypes {
    BidsFetchAllError = 'BidsFetchAllError',
    BidsCreateError = 'BidsCreateError',
}
export enum AuctionProductsErrorTypes {
    FetchAllAuctionProductsError = 'FetchAllAuctionProductsError',
    FetchOneAuctionProductError = 'FetchOneAuctionProductError',
    CreateOneAuctionProductError = 'CreateOneAuctionProductError',
}
export enum CategoryErrorTypes {
    GetProductsByCategoryError = 'GetProductsByCategoryError',
    GetAllCategoriesError = 'GetAllCategoriesError',
}

export enum OrderErrorTypes {
    FetchAllOrdersError = 'FetchAllOrdersError',
    DeleteOrderError = 'DeleteOrderError',
    CreateOrderError = 'CreateOrderError',
}
export enum ProductErrorTypes {
    FetchAllProductsError = 'FetchAllProductsError',
    FetchOneProductsError = 'FetchOneProductsError',
    CreateProductsError = 'CreateProductsError',
    UpdateProductsError = 'UpdateProductsError',
    DeleteProductsError = 'DeleteProductsError',
}

export enum GenericErrorTypes {
    GenericError = 'GenericError',
}
const ErrorCombined: any = {
    ...GenericErrorTypes,
    ...OrderErrorTypes,
    ...CategoryErrorTypes,
    ...AuctionProductsErrorTypes,
    ...BidsErrorTypes,
    ...ProductErrorTypes,
}

export type ErrorType = typeof ErrorCombined;
