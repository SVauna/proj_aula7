import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  async create(@Body() createTransacaoDto: any) {
    return this.transacoesService.create(createTransacaoDto);
  }

  @Get()
  async findAll() {
    return this.transacoesService.findAll();
  }
}
