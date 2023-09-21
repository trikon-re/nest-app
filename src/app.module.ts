import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver } from '@nestjs/apollo';
// import { join } from 'path';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AccesspointModule } from './accesspoint/accesspoint.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { AwsModule } from './aws/aws.module';
import { MediaModule } from './media/media.module';
import { LeadStatusModule } from './lead_status/lead_status.module';
import { LeadsModule } from './leads/leads.module';
import { AssetsModule } from './assets/assets.module';
import { LeadLogModule } from './lead_log/lead_log.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   playground: true,
    //   autoSchemaFile: join(process.cwd(), 'src/graph.schema.gql'), // Automatically Generate GraphQL File
    //   definitions: {
    //     path: join(process.cwd(), 'src/graph.interface.ts'),
    //     // additionalHeader: '/* eslint-disable prettier/prettier */',
    //   },
    //   // typePaths: ['./**/*.graphql'], // Manually Read GraphQL File
    // }),
    DatabaseModule,
    EmployeesModule,
    AuthModule,
    SessionsModule,
    AccesspointModule,
    RolesModule,
    PermissionsModule,
    AwsModule,
    MediaModule,
    LeadStatusModule,
    LeadsModule,
    AssetsModule,
    LeadLogModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
