import { Controller, Post, HttpStatus } from '@nestjs/common';
import { InviteService } from './invite.service';
import { Response, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Invite')
@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}
  @Post()
  async createInvite(@Request() req, @Response() res) {
    try {
      const invite = await this.inviteService.createInvite(req);

      if (invite) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'Invitation resent successfully.',
          data: invite,
        });
      } else {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'Invitation sent successfully.',
          data: invite,
        });
      }
    } catch (error) {
      // Handle any errors that might occur during the invite creation process
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred while creating the invitation.',
        error: error.message,
      });
    }
  }
}
