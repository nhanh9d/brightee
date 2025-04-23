import { MigrationInterface, QueryRunner } from "typeorm";

export class SetEmailUnique1745404779078 implements MigrationInterface {
    name = 'SetEmailUnique1745404779078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" ADD CONSTRAINT "UQ_82927bc307d97fe09c616cd3f58" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lead" DROP CONSTRAINT "UQ_82927bc307d97fe09c616cd3f58"`);
    }

}
