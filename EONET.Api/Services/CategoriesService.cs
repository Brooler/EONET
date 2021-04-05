using EONET.Api.Interfaces;
using EONET.Core.Interfaces;
using EONET.Core.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EONET.Api.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly ICategoriesProvider _categoriesProvider;
        private readonly ILogger<CategoriesService> _logger;

        public CategoriesService(ICategoriesProvider categoriesProvider, ILogger<CategoriesService> logger)
        {
            _categoriesProvider = categoriesProvider;
            _logger = logger;
        }

        public async Task<IEnumerable<CategoryModel>> GetCategories()
        {
            try 
            {
                return await _categoriesProvider.GetCategories();
            }
            catch(Exception ex)
            {
                _logger.LogError("GetCategories Error: {@exception}", ex);
                throw;
            }
        }
    }
}
