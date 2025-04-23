import { Injectable } from '@nestjs/common';
import { Lead } from './lead.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadInput } from './lead.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead) private leadRepository: Repository<Lead>,
  ) { }

  async findAll(): Promise<Lead[]> {
    return this.leadRepository.find();
  }

  async findOne(id: number): Promise<Lead> {
    return this.leadRepository.findOne({ where: { id } });
  }

  async create(lead: LeadInput): Promise<Lead> {
    return this.leadRepository.save({ ...lead, createdAt: new Date() });
  }
}
