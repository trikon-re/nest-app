import { Test, TestingModule } from '@nestjs/testing';
import { LeadLogService } from './lead_log.service';

describe('LeadLogService', () => {
  let service: LeadLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadLogService],
    }).compile();

    service = module.get<LeadLogService>(LeadLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
