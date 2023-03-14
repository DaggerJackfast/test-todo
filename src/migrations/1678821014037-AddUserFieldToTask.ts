import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserFieldToTask1678821014037 implements MigrationInterface {
  name = 'AddUserFieldToTask1678821014037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ADD "userId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userId"`);
  }
}
