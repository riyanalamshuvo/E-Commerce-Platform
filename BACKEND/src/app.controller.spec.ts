import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CreateAdminDto } from './admin/dto/create-admin.dto';

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(adminController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new admin', () => {
      const dto: CreateAdminDto = { name: 'John Doe', email: 'john@example.com', password: '12345' };

      const result = {
        message: 'Admin created successfully',
        data: {
          id: 1,
          ...dto,
          isActive: true,
          createdAt: new Date(),
        },
      };

      jest.spyOn(adminService, 'create').mockImplementation(() => result);

      expect(adminController.create(dto)).toEqual(result);
    });
  });
});
