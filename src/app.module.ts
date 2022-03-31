import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AgeModule } from './Modules/age.module';
import { AuthModule } from './Modules/auth.module';
import { PetModule } from './Modules/pet.module';
import { PhotoModule } from './Modules/photo.module';
import { RaceModule } from './Modules/race.module';
import { ShelterModule } from './Modules/shelter.module';
import { TypeModule } from './Modules/type.module';
import { UserModule } from './Modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
    useFactory: async () =>
    Object.assign(await getConnectionOptions(), {
      autoLoadEntities: true,
    }),
  }), UserModule, ShelterModule, PetModule, PhotoModule, AuthModule, RaceModule, TypeModule, AgeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
