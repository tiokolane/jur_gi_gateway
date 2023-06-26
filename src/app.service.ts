import { HttpService } from '@nestjs/axios';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { error } from 'console';
import { map } from 'rxjs/operators';
import { GlobalConfig } from './config/constants';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_AUTH') private readonly clientServiceA: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  pingServiceA() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
  async login(payload) {
    try {
      const response = await this.httpService
        .post(GlobalConfig.globalVar + '/auth/login', payload)
        .toPromise();
      if (
        response == null ||
        response == undefined ||
        response.data == null ||
        response.data == undefined
      ) {
        return null;
      }

      return await response.data;
    } catch (error) {
      console.log('error ', error);
      throw new HttpException(error.response.data, error.response.status);
    }
  }
  async register(payload) {
    try {
      const response = await this.httpService
        .post(GlobalConfig.globalVar + '/auth/register', payload)
        .toPromise();
      if (
        response == null ||
        response == undefined ||
        response.data == null ||
        response.data == undefined
      ) {
        return null;
      }

      return await response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
