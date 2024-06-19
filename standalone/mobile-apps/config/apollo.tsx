import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client'
import React, { ReactNode } from 'react'

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000' + '/graphql',
    cache: new InMemoryCache(),
  })
  return <Provider client={apolloClient}>{children}</Provider>
}
