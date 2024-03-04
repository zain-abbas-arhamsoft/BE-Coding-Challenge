import {
  Controller,
  Post,
  Body,

} from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from '../user-invitation/Dto/invite.dto';
import {  Response } from '@nestjs/common';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}
  @Post()
  async createInvite(@Response() response ,@Body() createInviteDto: CreateInviteDto) {
    return this.inviteService.createInvite(response,createInviteDto);
  }
}
