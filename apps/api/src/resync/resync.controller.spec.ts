import { Test, TestingModule } from '@nestjs/testing'
import { ResyncController } from './resync.controller'

describe('ResyncController', () => {
  let controller: ResyncController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResyncController],
    }).compile()

    controller = module.get<ResyncController>(ResyncController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
