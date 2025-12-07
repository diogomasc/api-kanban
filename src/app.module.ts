import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BoardsModule } from './modules/boards/boards.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { PrioritiesModule } from './modules/priorities/priorities.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    DatabaseModule,
    BoardsModule,
    DepartmentsModule,
    PrioritiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
