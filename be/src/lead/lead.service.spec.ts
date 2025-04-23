import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { Service } from './service.enum';
import { Lead } from './lead.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockLeadRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
});

describe('LeadService', () => {
  let service: LeadService;
  let leadRepository: jest.Mocked<Repository<Lead>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadService, {
        provide: getRepositoryToken(Lead),
        useFactory: mockLeadRepository
      }],
    }).compile();

    service = module.get<LeadService>(LeadService);
    leadRepository = module.get(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a lead', async () => {
    const expectedLead: Lead = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+1234567890',
      postcode: '12345',
      services: [Service.Delivery, Service.PickUp],
      createdAt: new Date(),
    };

    leadRepository.create.mockReturnValue(expectedLead);
    leadRepository.save.mockResolvedValue(expectedLead);

    const result = await service.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+1234567890',
      postcode: '12345',
      services: [Service.Delivery, Service.PickUp],
    });

    expect(result).toEqual(expectedLead);
  });

  it('should find a lead by id', async () => {
    const expectedLead: Lead = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+1234567890',
      postcode: '12345',
      services: [Service.Delivery, Service.PickUp],
      createdAt: new Date(),
    };

    leadRepository.findOne.mockResolvedValue(expectedLead);

    const result = await service.findOne(1);

    expect(result).toEqual(expectedLead);
  });

  it('should find all leads', async () => {
    const expectedLeads: Lead[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '+1234567890',
        postcode: '12345',
        services: [Service.Delivery, Service.PickUp],
        createdAt: new Date(),
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        mobile: '+1234567890',
        postcode: '12345',
        services: [Service.Delivery, Service.PickUp],
        createdAt: new Date(),
      },
    ];

    leadRepository.find.mockResolvedValue(expectedLeads);

    const result = await service.findAll();

    expect(result).toEqual(expectedLeads);
  });

  it('should throw an error if the lead is not found', async () => {
    leadRepository.findOne.mockRejectedValue(new Error('Lead not found'));

    await expect(service.findOne(1)).rejects.toThrow('Lead not found');
  });

  it('should not create a lead if the email is already in use', async () => {
    leadRepository.findOne.mockRejectedValue(new Error('Lead with this email already exists'));

    await expect(service.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+1234567890',
      postcode: '12345',
      services: [Service.Delivery, Service.PickUp],
    })).rejects.toThrow('Lead with this email already exists');
  });
});
