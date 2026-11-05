import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './transacao.schema';

@Injectable()
export class TransacoesService {
  constructor(@InjectModel(Transacao.name) private transacaoModel: Model<TransacaoDocument>) {}

  async create(transacaoDto: any): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(transacaoDto);
    return novaTransacao.save();
  }

  async findAll() {
    const historico = await this.transacaoModel.find().exec();
    
    let saldoTotal = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    historico.forEach(t => {
      if (t.tipo === 'receita') {
        saldoTotal += t.valor;
      } else if (t.tipo === 'despesa') {
        saldoTotal -= t.valor;
        totalDespesas += t.valor;
        if (!t.consumoConsciente) {
          totalGastoImpulso += t.valor;
        }
      }
    });

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso
      }
    };
  }
}
