import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({ example: 'I need a SIM-only contract.' })
  @IsString()
  message: string;
}
