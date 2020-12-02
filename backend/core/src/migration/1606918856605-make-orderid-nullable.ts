import {MigrationInterface, QueryRunner} from "typeorm";

export class makeOrderidNullable1606918856605 implements MigrationInterface {
    name = 'makeOrderidNullable1606918856605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "household_member" ALTER COLUMN "order_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "household_member" ALTER COLUMN "order_id" SET NOT NULL`);
    }

}
