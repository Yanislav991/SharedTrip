using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SharedTrip.Data;
using SharedTrip.Data.Model;
using SharedTrip.Hubs;
using SharedTrip.Infrastucture;
using SharedTrip.Services;
using SharedTrip.Services.Contracts;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SharedTripDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddSignalR();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddTransient<ITripsService, TripService>();
builder.Services.AddTransient<INewsService, NewsService>();
builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddIdentity<User, IdentityRole>(x =>
{
    x.Password.RequireDigit = false;
    x.Password.RequiredLength = 6;
    x.Password.RequireNonAlphanumeric = false;
    x.Password.RequireUppercase = false;
    x.Password.RequireLowercase = false;
})
    .AddEntityFrameworkStores<SharedTripDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = configuration["JWT:ValidAudience"],
            ValidIssuer = configuration["JWT:ValidIssuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
        };
    });

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", b =>
{
    b.AllowAnyMethod()
      .AllowAnyHeader()
      .WithOrigins("http://localhost:4200")
      .AllowCredentials();
}));
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endPoints =>
{
    endPoints.MapControllers();
    endPoints.MapHub<ChatHub>("/chat");
});

app.PrepareDataBase();
app.Run();
