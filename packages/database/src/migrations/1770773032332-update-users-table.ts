import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUsersTable1770773032332 implements MigrationInterface {
  name = 'UpdateUsersTable1770773032332'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"')
    await queryRunner.query('ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()')
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "created_by"')
    await queryRunner.query('ALTER TABLE "users" ADD "created_by" uuid NOT NULL')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "updated_by"')
    await queryRunner.query('ALTER TABLE "users" ADD "updated_by" uuid NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "updated_by"')
    await queryRunner.query('ALTER TABLE "users" ADD "updated_by" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "created_by"')
    await queryRunner.query('ALTER TABLE "users" ADD "created_by" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"')
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"')
    await queryRunner.query('ALTER TABLE "users" ADD "id" SERIAL NOT NULL')
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")')
  }
}
