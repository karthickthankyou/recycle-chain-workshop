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
  id: Scalars['String']['output']
  location: Scalars['String']['output']
  name: Scalars['String']['output']
  products: Array<Product>
  timestamp: Scalars['DateTime']['output']
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
  id: Scalars['String']['output']
  manufacturer: Manufacturer
  manufacturerId: Scalars['String']['output']
  name: Scalars['String']['output']
  productItems: Array<ProductItem>
  timestamp: Scalars['DateTime']['output']
  totalCount: Scalars['Float']['output']
  toxicItems: Array<ToxicItem>
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
  product: Product
  productItem: ProductItem
  productItems: Array<ProductItem>
  products: Array<Product>
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

export type QueryProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>
  distinct?: InputMaybe<Array<ProductScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ProductOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Float']['input']>
  take?: InputMaybe<Scalars['Float']['input']>
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

export type ProductsQueryVariables = Exact<{ [key: string]: never }>

export type ProductsQuery = {
  __typename?: 'Query'
  products: Array<{ __typename?: 'Product'; id: string; name: string }>
}

export const namedOperations = {
  Query: {
    Products: 'Products',
  },
}

export const ProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Products' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>
