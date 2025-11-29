using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zenith.Migrations
{
    /// <inheritdoc />
    public partial class ChangedTaskItemAndRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Tasks", 
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS ""AssignRoleToUser"";");

            migrationBuilder.Sql(@"
                ALTER TABLE ""ProjectMemberships""
                ALTER COLUMN ""Role"" TYPE integer
                USING CASE 
                    WHEN ""Role"" = 'Viewer' THEN 0
                    WHEN ""Role"" = 'Editor' THEN 1
                    WHEN ""Role"" = 'Owner'  THEN 2
                    ELSE 0 
                END::integer;
            ");

             migrationBuilder.Sql(@"
                CREATE OR REPLACE PROCEDURE ""AssignRoleToUser""(
                    p_project_id INT,
                    p_user_id INT,
                    p_role_int INT
                )
                LANGUAGE plpgsql
                AS $$
                BEGIN
                    INSERT INTO ""ProjectMemberships"" (""ProjectId"", ""UserId"", ""Role"")
                    VALUES (p_project_id, p_user_id, p_role_int)
                    ON CONFLICT (""ProjectId"", ""UserId"")
                    DO UPDATE SET ""Role"" = p_role_int;
                END;
                $$;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Tasks");

            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS ""AssignRoleToUser"";");

            migrationBuilder.Sql(@"
                ALTER TABLE ""ProjectMemberships""
                ALTER COLUMN ""Role"" TYPE text
                USING CASE 
                    WHEN ""Role"" = 0 THEN 'Viewer'
                    WHEN ""Role"" = 1 THEN 'Editor'
                    WHEN ""Role"" = 2 THEN 'Owner'
                    ELSE 'Viewer'
                END;
            ");
        }
    }
}
