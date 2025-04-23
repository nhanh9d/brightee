import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './lead.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadResolver } from './lead.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadService, LeadResolver],
  exports: [LeadService],
})
export class LeadModule {}
