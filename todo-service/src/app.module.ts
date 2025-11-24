import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from './modules/common/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    TodoModule,
  ],
})
export class AppModule {}
