import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './common/prisma/prisma.module'
import { ListenerModule } from './listener/listener.module'

@Module({
  imports: [PrismaModule, ListenerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
