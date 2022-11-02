import {MigrationInterface, QueryRunner} from "typeorm";

export class Post1667334344413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "post" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
            )`
        )
        await queryRunner.createPrimaryKey("post", ["id"])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("post", true)
    }

}
