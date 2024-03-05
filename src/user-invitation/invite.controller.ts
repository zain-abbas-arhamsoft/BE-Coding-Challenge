import { Controller, Post } from '@nestjs/common';
import { InviteService } from './invite.service';
import { Response, Request } from '@nestjs/common';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}
  @Post()
  async createInvite(@Request() request, @Response() response) {
    return this.inviteService.createInvite(request, response);
  }
}
