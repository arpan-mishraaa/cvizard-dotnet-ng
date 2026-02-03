using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server_Side.Data;
using Server_Side.Services;
using System.Text;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// ------------------------
// Database Connection
// ------------------------
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);

// ------------------------
// JWT Authentication
// ------------------------
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["Jwt:Key"]
                    ?? throw new InvalidOperationException("JWT Key not configured")
                )
            )
        };
    });

// ------------------------
// Dependency Injection – Services
// ------------------------
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IResumeService, ResumeService>();
builder.Services.AddScoped<IGeminiService, GeminiService>();
builder.Services.AddScoped<IJobDescriptionService, JobDescriptionService>();
builder.Services.AddScoped<IAnalysisService, AnalysisService>();
builder.Services.AddScoped<ILatexOutputService, LatexOutputService>();

// ------------------------
// CORS Configuration
// ------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ------------------------
// Controllers & Swagger
// ------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --------------------------------------------------
// ✅ AIVEN MYSQL CONNECTION TEST (TEMPORARY)
// --------------------------------------------------
try
{
    using var conn = new MySqlConnection(
        builder.Configuration.GetConnectionString("DefaultConnection")
    );
    conn.Open();
    Console.WriteLine("✅ Connected to Aiven MySQL");
}
catch (Exception ex)
{
    Console.WriteLine("❌ Failed to connect to Aiven MySQL");
    Console.WriteLine(ex.Message);
    throw; // stop app if DB is not reachable
}

// ------------------------
// Middleware Pipeline
// ------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
