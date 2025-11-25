using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zenith.Migrations
{
    /// <inheritdoc />
    public partial class RevokeAccessProcedure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
                CREATE OR REPLACE PROCEDURE ""RevokeAccess""(
                    p_project_id INT,
                    p_user_id INT
                )   
                LANGUAGE plpgsql
                AS $$
                BEGIN
                    DELETE FROM ""ProjectMemberships""
                    WHERE ""ProjectId"" = p_project_id AND ""UserId"" = p_user_id;
                END;
                $$;
            ";

            migrationBuilder.Sql(sql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP PROCEDURE IF EXISTS ""RevokeAccess"";");
        }
    }
}
