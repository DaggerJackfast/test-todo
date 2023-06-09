import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { makeDir } from '../lib/utils';

const getSSLMode = (databaseSsl: boolean): object | boolean => {
  return databaseSsl ? { rejectUnauthorized: false } : false;
};

const getIsDevMode = (mode: string): boolean => {
  return mode === 'development';
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    const migrationsDir = `${__dirname}/../migrations`;
    await makeDir(migrationsDir);
    const databaseSsl = configService.get('DATABASE_SSL') === 'true';
    const sslMode = getSSLMode(databaseSsl);
    const isDevMode = getIsDevMode(configService.get('NODE_ENV'));
    return {
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      port: parseInt(configService.get('DATABASE_PORT'), 10),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      autoLoadEntities: true,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrations: [`${migrationsDir}/*{.ts,.js}`],
      synchronize: false,
      logging: isDevMode,
      ssl: sslMode,
    };
  },
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
};

export const getDataSource = (): DataSource => {
  return new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
    synchronize: false,
    dropSchema: false,
    logging: getIsDevMode(process.env.NODE_ENV),
    ssl: getSSLMode(process.env.DATABASE_SSL === 'true'),
  });
};
