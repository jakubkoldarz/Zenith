using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zenith.Migrations
{
    /// <inheritdoc />
    public partial class AddAssignRoleProcedure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
                CREATE OR REPLACE PROCEDURE ""AssignRoleToUser""(
                    p_project_id INT,
                    p_user_id INT,
                    p_role_name TEXT
                )   
                LANGUAGE plpgsql
                AS $$
                BEGIN
                    INSERT INTO ""ProjectMemberships"" (""ProjectId"", ""UserId"", ""Role"")
                    VALUES (p_project_id, p_user_id, p_role_name)   
                    ON CONFLICT (""ProjectId"", ""UserId"") 
                    DO UPDATE SET ""Role"" = p_role_name;
                END;
                $$;
            ";

            migrationBuilder.Sql(sql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS ""AssignRoleToUser"";");
        }
    }
}
