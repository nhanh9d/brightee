import { Query, Resolver, Mutation, Args } from "@nestjs/graphql";
import { Lead } from "./lead.entity";
import { LeadService } from "./lead.service";
import { LeadInput } from "./lead.dto";
@Resolver(() => Lead)
export class LeadResolver {
  constructor(private readonly leadService: LeadService) {}

  @Query(() => [Lead], { name: 'leads' })
  async getLeads(): Promise<Lead[]> {
    return this.leadService.findAll();
  }

  @Query(() => Lead, { name: 'lead' })
  async getLead(@Args('id') id: number): Promise<Lead> {
    return this.leadService.findOne(id);
  }

  @Mutation(() => Lead, { name: 'addLead' })
  async createLead(@Args('lead') lead: LeadInput): Promise<Lead> {
    return this.leadService.create(lead);
  }
}
