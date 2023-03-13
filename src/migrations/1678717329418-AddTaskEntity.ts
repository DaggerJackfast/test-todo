import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskEntity1678717329418 implements MigrationInterface {
  name = 'AddTaskEntity1678717329418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('in_working', 'archived', 'done')`);
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'in_working', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
  }
}
