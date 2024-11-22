import { Module } from '@nestjs/common';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AxiosHttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000, // Set request timeout
        maxRedirects: 5,
      }),
    }),
  ],
  exports: [AxiosHttpModule],
})
export class HttpModule {}
