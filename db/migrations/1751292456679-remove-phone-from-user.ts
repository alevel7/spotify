import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhoneFromUser1751292456679 implements MigrationInterface {
    name = 'RemovePhoneFromUser1751292456679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
