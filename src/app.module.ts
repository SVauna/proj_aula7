import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [
    MongooseModule.forRoot('SUA_STRING_DE_CONEXAO_MONGODB_ATLAS'),
    TransacoesModule,
  ],
})
export class AppModule {}
