import { Test, TestingModule } from '@nestjs/testing';
import { LeadLogController } from './lead_log.controller';
import { LeadLogService } from './lead_log.service';

describe('LeadLogController', () => {
  let controller: LeadLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadLogController],
      providers: [LeadLogService],
    }).compile();

    controller = module.get<LeadLogController>(LeadLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
