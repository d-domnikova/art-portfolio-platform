using DAL.Repositories;
using DAL.Context;
using BLL.Services.Interfaces;
using BLL.Services;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace art_portfolio_webAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddCors(
                options => {
                    options.AddPolicy(MyAllowSpecificOrigins,
                policy => {
                    policy.WithOrigins("http://localhost:5173")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                });
            });

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IPostRepository, PostRepository>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<ICommentRepository, CommentRepository>();
            builder.Services.AddScoped<ICommissionSlotRepository, CommissionSlotRepository>();
            builder.Services.AddScoped<ILikedPostRepository, LikedPostRepository>();
            builder.Services.AddScoped<IShopItemRepository, ShopItemRepository>();
            builder.Services.AddScoped<IShopTypeRepository, ShopTypeRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

            builder.Services.AddScoped<IUserService, UserService>(); 
            builder.Services.AddScoped<IPostService, PostService>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();
            builder.Services.AddScoped<ICommentService, CommentService>();
            builder.Services.AddScoped<ICommissionSlotService, CommissionSlotService>();
            builder.Services.AddScoped<ILikedPostService, LikedPostService>();
            builder.Services.AddScoped<IShopItemService, ShopItemService>();
            builder.Services.AddScoped<IShopTypeService, ShopTypeService>();

            builder.Services.AddControllers();

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "ArtFocus API", Version = "v1" });
            }); ;

            builder.Services.AddDbContext<PlatformContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(MyAllowSpecificOrigins);

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();

        }
    }
}
