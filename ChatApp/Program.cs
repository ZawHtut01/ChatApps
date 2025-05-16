using ChatApp.Data;
using Microsoft.EntityFrameworkCore;
using ChatApp.Hubs; // if you put ChatHub in a folder called Hubs

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication("MyCookieAuth")
    .AddCookie("MyCookieAuth", options =>
    {
        options.LoginPath = "/Account/Login";
    });

builder.Services.AddAuthorization();

// ✅ Add SignalR
builder.Services.AddSignalR();

var app = builder.Build();

// Middleware
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// ✅ Map SignalR hub
app.MapHub<ChatHub>("/chathub");

app.MapDefaultControllerRoute();
app.Run();
