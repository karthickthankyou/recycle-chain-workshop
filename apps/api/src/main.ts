import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Recycle Chain | Karthick Ragavendran')
    .setDescription(
      `The Recycle Chain API.
<h2>Looking for the graphql api?</h2>
Go to <a href="/graphql" target="_blank">/graphql</a>.
Or,
You might also need to use the <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql&document=query manufacturers{manufacturers{ id }}
">Apollo explorer</a> for a greater experience.

      `,
    )
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Recycle Chain API',
  })
  await app.listen(port, '0.0.0.0')
}
bootstrap()
