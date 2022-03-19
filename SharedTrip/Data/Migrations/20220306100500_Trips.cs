using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SharedTrip.Data.Migrations
{
    public partial class Trips : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartPoint = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    EndPoint = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FreeSeats = table.Column<int>(type: "int", nullable: false),
                    PlaceForLuggage = table.Column<bool>(type: "bit", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CarImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trips_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TripUser",
                columns: table => new
                {
                    PassengersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TripsParticipatedId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripUser", x => new { x.PassengersId, x.TripsParticipatedId });
                    table.ForeignKey(
                        name: "FK_TripUser_AspNetUsers_PassengersId",
                        column: x => x.PassengersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TripUser_Trips_TripsParticipatedId",
                        column: x => x.TripsParticipatedId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trips_UserId",
                table: "Trips",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TripUser_TripsParticipatedId",
                table: "TripUser",
                column: "TripsParticipatedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TripUser");

            migrationBuilder.DropTable(
                name: "Trips");
        }
    }
}
