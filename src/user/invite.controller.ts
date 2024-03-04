import {
  Controller,
  Post,
  Body,
  //   HttpException,
  //   HttpStatus,
} from '@nestjs/common';
import { InviteService } from './invite.service';
// import { InviteDocument } from './models/invite.schema';
import { CreateInviteDto } from './Dto/invite.dto';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}
  @Post()
  async createInvite(@Body() createInviteDto: CreateInviteDto) {
    return this.inviteService.createInvite(createInviteDto);
  }
}
