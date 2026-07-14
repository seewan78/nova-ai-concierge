import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StartChatDto {
  @ApiProperty({ example: 'Help me compare broadband providers.' })
  @IsString()
  message: string;
}
