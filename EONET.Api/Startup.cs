using EONET.Api.Interfaces;
using EONET.Api.Services;
using EONET.Core.Interfaces;
using EONET.NasaProvider.Provider;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EONET.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => {
                    options.AddDefaultPolicy(builder =>
                    {
                        builder.AllowAnyOrigin();
                    });
                });
            services.AddControllers();

            services.AddTransient<IEventsService, EventsService>();
            services.AddTransient<ICategoriesService, CategoriesService>();
            services.AddHttpClient<IEventsProvider, NasaEventsProvider>(client =>
            {
                client.BaseAddress = new Uri(Configuration["NasaProvider:BaseUrl"]);
            });
            services.AddHttpClient<ICategoriesProvider, NasaEventsProvider>(client =>
            {
                client.BaseAddress = new Uri(Configuration["NasaProvider:BaseUrl"]);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
