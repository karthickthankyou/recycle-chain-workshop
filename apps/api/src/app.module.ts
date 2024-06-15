import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './common/prisma/prisma.module'
import { ListenerModule } from './listener/listener.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ManufacturersModule } from './models/manufacturers/manufacturers.module'
import { ProductItemsModule } from './models/product-items/product-items.module'
import { ProductsModule } from './models/products/products.module'
import { ToxicItemsModule } from './models/toxic-items/toxic-items.module'
import { TransactionsModule } from './models/transactions/transactions.module'
import { ResyncModule } from './resync/resync.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
    }),
    PrismaModule,
    ListenerModule,
    ResyncModule,

    ManufacturersModule,
    ProductItemsModule,
    ProductsModule,
    ToxicItemsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
