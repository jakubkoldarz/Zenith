import { IsEnum, isEnum } from 'class-validator';
import { UserDto } from './user.dto';

export class UserWithRoleDto extends UserDto {
  @IsEnum(['Owner', 'Editor', 'Viewer'], {
    message: 'role must be a valid enum value',
  })
  role: 'Owner' | 'Editor' | 'Viewer';
}
