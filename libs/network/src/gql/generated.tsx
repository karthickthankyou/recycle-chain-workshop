import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any }
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
}

export type Manufacturer = {
  __typename?: 'Manufacturer'
  contact: Scalars['String']['output']
  getCountPerStatus: Scalars['Float']['output']
  id: Scalars['String']['output']
  location: Scalars['String']['output']
  name: Scalars['String']['output']
  products: Array<Product>
  productsCount: Scalars['Float']['output']
  timestamp: Scalars['DateTime']['output']
  totalCount: Scalars['Float']['output']
}

export type ManufacturerGetCountPerStatusArgs = {
  status: ProductStatus
}

export type ManufacturerOrderByWithRelationInput = {
  contact?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  location?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  products?: InputMaybe<ProductOrderByRelationAggregateInput>
  timestamp?: InputMaybe<SortOrder>
}

export type ManufacturerRelationFilter = {
  is?: InputMaybe<ManufacturerWhereInput>
  isNot?: InputMaybe<ManufacturerWhereInput>
}

export enum ManufacturerScalarFieldEnum {
  Contact = 'contact',
  Id = 'id',
  Location = 'location',
  Name = 'name',
  Timestamp = 'timestamp',
}

export type ManufacturerWhereInput = {
  AND?: InputMaybe<Array<ManufacturerWhereInput>>
  NOT?: InputMaybe<Array<ManufacturerWhereInput>>
  OR?: InputMaybe<Array<ManufacturerWhereInput>>
  contact?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  location?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  products?: InputMaybe<ProductListRelationFilter>
  timestamp?: InputMaybe<DateTimeFilter>
}

export type ManufacturerWhereUniqueInput = {
  id: Scalars['String']['input']
}

export type Product = {
  __typename?: 'Product'
  getCountPerStatus: Scalars['Float']['output']
  id: Scalars['String']['output']
  manufacturer: Manufacturer
  manufacturerId: Scalars['String']['output']
  name: Scalars['String']['output']
  productItems: Array<ProductItem>
  timestamp: Scalars['DateTime']['output']
  totalCount: Scalars['Float']['output']
  toxicItems: Array<ToxicItem>
}

export type ProductGetCountPerStatusArgs = {
  status: ProductStatus
}

export type ProductItem = {
  __typename?: 'ProductItem'
  id: Scalars['String']['output']
  product: Product
  productId: Scalars['String']['output']
  status: ProductStatus
  timestamp: Scalars['DateTime']['output']
  transactions: Array<Transaction>
}

export type ProductItemListRelationFilter = {
  every?: InputMaybe<ProductItemWhereInput>
  none?: InputMaybe<ProductItemWhereInput>
  some?: InputMaybe<ProductItemWhereInput>
}

export type ProductItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ProductItemOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>
  product?: InputMaybe<ProductOrderByWithRelationInput>
  productId?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  transactions?: InputMaybe<TransactionOrderByRelationAggregateInput>
}

export type ProductItemRelationFilter = {
  is?: InputMaybe<ProductItemWhereInput>
  isNot?: InputMaybe<ProductItemWhereInput>
}

export enum ProductItemScalarFieldEnum {
  Id = 'id',
  ProductId = 'productId',
  Status = 'status',
  Timestamp = 'timestamp',
}

export type ProductItemWhereInput = {
  AND?: InputMaybe<Array<ProductItemWhereInput>>
  NOT?: InputMaybe<Array<ProductItemWhereInput>>
  OR?: InputMaybe<Array<ProductItemWhereInput>>
  id?: InputMaybe<StringFilter>
  product?: InputMaybe<ProductRelationFilter>
  productId?: InputMaybe<StringFilter>
  status?: InputMaybe<ProductStatus>
  timestamp?: InputMaybe<DateTimeFilter>
  transactions?: InputMaybe<TransactionListRelationFilter>
}

export type ProductItemWhereUniqueInput = {
  id: Scalars['String']['input']
}

export type ProductListRelationFilter = {
  every?: InputMaybe<ProductWhereInput>
  none?: InputMaybe<ProductWhereInput>
  some?: InputMaybe<ProductWhereInput>
}

export type ProductOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ProductOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>
  manufacturer?: InputMaybe<ManufacturerOrderByWithRelationInput>
  manufacturerId?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  productItems?: InputMaybe<ProductItemOrderByRelationAggregateInput>
  timestamp?: InputMaybe<SortOrder>
  toxicItems?: InputMaybe<ToxicItemOrderByRelationAggregateInput>
}

export type ProductRelationFilter = {
  is?: InputMaybe<ProductWhereInput>
  isNot?: InputMaybe<ProductWhereInput>
}

export enum ProductScalarFieldEnum {
  Id = 'id',
  ManufacturerId = 'manufacturerId',
  Name = 'name',
  Timestamp = 'timestamp',
}

export enum ProductStatus {
  Manufactured = 'MANUFACTURED',
  Recycled = 'RECYCLED',
  Returned = 'RETURNED',
  Sold = 'SOLD',
}

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>
  NOT?: InputMaybe<Array<ProductWhereInput>>
  OR?: InputMaybe<Array<ProductWhereInput>>
  id?: InputMaybe<StringFilter>
  manufacturer?: InputMaybe<ManufacturerRelationFilter>
  manufacturerId?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  productItems?: InputMaybe<ProductItemListRelationFilter>
  timestamp?: InputMaybe<DateTimeFilter>
  toxicItems?: InputMaybe<ToxicItemListRelationFilter>
}

export type ProductWhereUniqueInput = {
  id: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  manufacturer: Manufacturer
  manufacturers: Array<Manufacturer>
  manufacturersCount: Scalars['Float']['output']
  product: Product
  productItem: ProductItem
  productItems: Array<ProductItem>
  productItemsCount: Scalars['Float']['output']
  products: Array<Product>
  productsCount: Scalars['Float']['output']
  toxicItem: ToxicItem
  toxicItems: Array<ToxicItem>
  transaction: Transaction
  transactions: Array<Transaction>
}

export type QueryManufacturerArgs = {
  where: ManufacturerWhereUniqueInput
}

export type QueryManufacturersArgs = {
  cursor?: InputMaybe<ManufacturerWhereUniqueInput>
  distinct?: InputMaybe<Array<ManufacturerScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ManufacturerOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  where?: InputMaybe<ManufacturerWhereInput>
}

export type QueryManufacturersCountArgs = {
  where?: InputMaybe<ManufacturerWhereInput>
}

export type QueryProductArgs = {
  where: ProductWhereUniqueInput
}

export type QueryProductItemArgs = {
  where: ProductItemWhereUniqueInput
}

export type QueryProductItemsArgs = {
  cursor?: InputMaybe<ProductItemWhereUniqueInput>
  distinct?: InputMaybe<Array<ProductItemScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ProductItemOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  where?: InputMaybe<ProductItemWhereInput>
}

export type QueryProductItemsCountArgs = {
  where?: InputMaybe<ProductItemWhereInput>
}

export type QueryProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>
  distinct?: InputMaybe<Array<ProductScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ProductOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  where?: InputMaybe<ProductWhereInput>
}

export type QueryProductsCountArgs = {
  where?: InputMaybe<ProductWhereInput>
}

export type QueryToxicItemArgs = {
  where: ToxicItemWhereUniqueInput
}

export type QueryToxicItemsArgs = {
  cursor?: InputMaybe<ToxicItemWhereUniqueInput>
  distinct?: InputMaybe<Array<ToxicItemScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ToxicItemOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  where?: InputMaybe<ToxicItemWhereInput>
}

export type QueryTransactionArgs = {
  where: TransactionWhereUniqueInput
}

export type QueryTransactionsArgs = {
  cursor?: InputMaybe<TransactionWhereUniqueInput>
  distinct?: InputMaybe<Array<TransactionScalarFieldEnum>>
  orderBy?: InputMaybe<Array<TransactionOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  where?: InputMaybe<TransactionWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<Scalars['String']['input']>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type ToxicItem = {
  __typename?: 'ToxicItem'
  id: Scalars['Float']['output']
  name: Scalars['String']['output']
  product: Product
  productId: Scalars['String']['output']
  timestamp: Scalars['DateTime']['output']
  weight: Scalars['Float']['output']
}

export type ToxicItemListRelationFilter = {
  every?: InputMaybe<ToxicItemWhereInput>
  none?: InputMaybe<ToxicItemWhereInput>
  some?: InputMaybe<ToxicItemWhereInput>
}

export type ToxicItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ToxicItemOrderByWithRelationInput = {
  Product?: InputMaybe<ProductOrderByWithRelationInput>
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  productId?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  weight?: InputMaybe<SortOrder>
}

export enum ToxicItemScalarFieldEnum {
  Id = 'id',
  Name = 'name',
  ProductId = 'productId',
  Timestamp = 'timestamp',
  Weight = 'weight',
}

export type ToxicItemWhereInput = {
  AND?: InputMaybe<Array<ToxicItemWhereInput>>
  NOT?: InputMaybe<Array<ToxicItemWhereInput>>
  OR?: InputMaybe<Array<ToxicItemWhereInput>>
  Product?: InputMaybe<ProductRelationFilter>
  id?: InputMaybe<IntFilter>
  name?: InputMaybe<StringFilter>
  productId?: InputMaybe<StringFilter>
  timestamp?: InputMaybe<DateTimeFilter>
  weight?: InputMaybe<IntFilter>
}

export type ToxicItemWhereUniqueInput = {
  id: Scalars['Float']['input']
}

export type Transaction = {
  __typename?: 'Transaction'
  id: Scalars['Float']['output']
  productItem: ProductItem
  productItemId: Scalars['String']['output']
  status: ProductStatus
  timestamp: Scalars['DateTime']['output']
}

export type TransactionListRelationFilter = {
  every?: InputMaybe<TransactionWhereInput>
  none?: InputMaybe<TransactionWhereInput>
  some?: InputMaybe<TransactionWhereInput>
}

export type TransactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type TransactionOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>
  productItem?: InputMaybe<ProductItemOrderByWithRelationInput>
  productItemId?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
}

export enum TransactionScalarFieldEnum {
  Id = 'id',
  ProductItemId = 'productItemId',
  Status = 'status',
  Timestamp = 'timestamp',
}

export type TransactionWhereInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>
  NOT?: InputMaybe<Array<TransactionWhereInput>>
  OR?: InputMaybe<Array<TransactionWhereInput>>
  id?: InputMaybe<IntFilter>
  productItem?: InputMaybe<ProductItemRelationFilter>
  productItemId?: InputMaybe<StringFilter>
  status?: InputMaybe<ProductStatus>
  timestamp?: InputMaybe<DateTimeFilter>
}

export type TransactionWhereUniqueInput = {
  id: Scalars['Float']['input']
}

export type ManufacturerFieldsFragment = {
  __typename?: 'Manufacturer'
  id: string
  name: string
  location: string
  contact: string
  timestamp: any
  totalCount: number
  productsCount: number
  soldCount: number
  returnedCount: number
  recycledCount: number
}

export type ManufacturersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  cursor?: InputMaybe<ManufacturerWhereUniqueInput>
  orderBy?: InputMaybe<
    | Array<ManufacturerOrderByWithRelationInput>
    | ManufacturerOrderByWithRelationInput
  >
  where?: InputMaybe<ManufacturerWhereInput>
}>

export type ManufacturersQuery = {
  __typename?: 'Query'
  manufacturersCount: number
  manufacturers: Array<{
    __typename?: 'Manufacturer'
    id: string
    name: string
    location: string
    contact: string
    timestamp: any
    totalCount: number
    productsCount: number
    soldCount: number
    returnedCount: number
    recycledCount: number
  }>
}

export type ManufacturerQueryVariables = Exact<{
  where: ManufacturerWhereUniqueInput
}>

export type ManufacturerQuery = {
  __typename?: 'Query'
  manufacturer: {
    __typename?: 'Manufacturer'
    id: string
    name: string
    location: string
    contact: string
    timestamp: any
    totalCount: number
    productsCount: number
    soldCount: number
    returnedCount: number
    recycledCount: number
  }
}

export type ProductsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  cursor?: InputMaybe<ProductWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<ProductOrderByWithRelationInput> | ProductOrderByWithRelationInput
  >
  where?: InputMaybe<ProductWhereInput>
  distinct?: InputMaybe<Array<ProductScalarFieldEnum> | ProductScalarFieldEnum>
}>

export type ProductsQuery = {
  __typename?: 'Query'
  productsCount: number
  products: Array<{
    __typename?: 'Product'
    id: string
    name: string
    timestamp: any
    totalCount: number
    soldCount: number
    returnedCount: number
    recycledCount: number
    manufacturer: { __typename?: 'Manufacturer'; name: string }
    toxicItems: Array<{
      __typename?: 'ToxicItem'
      id: number
      name: string
      timestamp: any
      weight: number
    }>
  }>
}

export type ProductQueryVariables = Exact<{
  where: ProductWhereUniqueInput
}>

export type ProductQuery = {
  __typename?: 'Query'
  product: {
    __typename?: 'Product'
    id: string
    name: string
    timestamp: any
    totalCount: number
    manufacturerId: string
    soldCount: number
    returnedCount: number
    recycledCount: number
    manufacturer: { __typename?: 'Manufacturer'; name: string }
    toxicItems: Array<{
      __typename?: 'ToxicItem'
      weight: number
      timestamp: any
      name: string
      id: number
    }>
  }
}

export type ProductManufacturerQueryVariables = Exact<{
  where: ProductWhereUniqueInput
}>

export type ProductManufacturerQuery = {
  __typename?: 'Query'
  product: {
    __typename?: 'Product'
    id: string
    manufacturerId: string
    manufacturer: { __typename?: 'Manufacturer'; name: string }
  }
}

export type ProductItemsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
  cursor?: InputMaybe<ProductItemWhereUniqueInput>
  orderBy?: InputMaybe<
    | Array<ProductItemOrderByWithRelationInput>
    | ProductItemOrderByWithRelationInput
  >
  where?: InputMaybe<ProductItemWhereInput>
  distinct?: InputMaybe<
    Array<ProductItemScalarFieldEnum> | ProductItemScalarFieldEnum
  >
}>

export type ProductItemsQuery = {
  __typename?: 'Query'
  productItemsCount: number
  productItems: Array<{
    __typename?: 'ProductItem'
    id: string
    status: ProductStatus
    timestamp: any
    product: { __typename?: 'Product'; name: string }
    transactions: Array<{
      __typename?: 'Transaction'
      timestamp: any
      status: ProductStatus
    }>
  }>
}

export const namedOperations = {
  Query: {
    Manufacturers: 'Manufacturers',
    Manufacturer: 'Manufacturer',
    Products: 'Products',
    Product: 'Product',
    ProductManufacturer: 'ProductManufacturer',
    ProductItems: 'ProductItems',
  },
  Fragment: {
    ManufacturerFields: 'ManufacturerFields',
  },
}
export const ManufacturerFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ManufacturerFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Manufacturer' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contact' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'soldCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'SOLD' },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'returnedCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'RETURNED' },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'recycledCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'RECYCLED' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'productsCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ManufacturerFieldsFragment, unknown>
export const ManufacturersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Manufacturers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ManufacturerWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ManufacturerOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ManufacturerWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'manufacturers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ManufacturerFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'manufacturersCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ManufacturerFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Manufacturer' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contact' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'soldCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'SOLD' },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'returnedCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'RETURNED' },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'recycledCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'RECYCLED' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'productsCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ManufacturersQuery, ManufacturersQueryVariables>
export const ManufacturerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Manufacturer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ManufacturerWhereUniqueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'manufacturer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ManufacturerFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ManufacturerFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Manufacturer' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'location' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contact' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'soldCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'SOLD' },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'returnedCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'RETURNED' },
              },
            ],
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'recycledCount' },
            name: { kind: 'Name', value: 'getCountPerStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: { kind: 'EnumValue', value: 'RECYCLED' },
              },
            ],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'productsCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ManufacturerQuery, ManufacturerQueryVariables>
export const ProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Products' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ProductOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'ProductScalarFieldEnum' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'soldCount' },
                  name: { kind: 'Name', value: 'getCountPerStatus' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'SOLD' },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'returnedCount' },
                  name: { kind: 'Name', value: 'getCountPerStatus' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'RETURNED' },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'recycledCount' },
                  name: { kind: 'Name', value: 'getCountPerStatus' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'RECYCLED' },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'toxicItems' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'productsCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>
export const ProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Product' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProductWhereUniqueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'soldCount' },
                  name: { kind: 'Name', value: 'getCountPerStatus' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'SOLD' },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'returnedCount' },
                  name: { kind: 'Name', value: 'getCountPerStatus' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'RETURNED' },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'recycledCount' },
                  name: { kind: 'Name', value: 'getCountPerStatus' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'RECYCLED' },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturerId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'toxicItems' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weight' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>
export const ProductManufacturerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProductManufacturer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProductWhereUniqueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturerId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProductManufacturerQuery,
  ProductManufacturerQueryVariables
>
export const ProductItemsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProductItems' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductItemWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ProductItemOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductItemWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'ProductItemScalarFieldEnum' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'productItems' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timestamp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'productItemsCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductItemsQuery, ProductItemsQueryVariables>
