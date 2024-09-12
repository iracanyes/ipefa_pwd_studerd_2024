import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Response {
    return Response.json({ message: 'Hello World!' });
  }
}
