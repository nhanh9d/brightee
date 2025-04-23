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
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new Error('Lead not found');
    }

    return lead;
  }

  async create(lead: LeadInput): Promise<Lead> {
    const existingLead = await this.leadRepository.findOne({ where: { email: lead.email } });
    if (existingLead) {
      throw new Error('Lead with this email already exists');
    }

    return this.leadRepository.save({ ...lead, createdAt: new Date() });
  }
}
