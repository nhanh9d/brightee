import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LeadModule } from './lead/lead.module';
import { dbConfig } from './config/db.config';

//check if this is production or development
const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: !isProduction,
      introspection: !isProduction,
    }),
    TypeOrmModule.forRoot(dbConfig),
    LeadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
