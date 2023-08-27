import { Test, TestingModule } from '@nestjs/testing';
import { LeadStatusController } from './lead_status.controller';
import { LeadStatusService } from './lead_status.service';

describe('LeadStatusController', () => {
  let controller: LeadStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadStatusController],
      providers: [LeadStatusService],
    }).compile();

    controller = module.get<LeadStatusController>(LeadStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
