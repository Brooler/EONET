using EONET.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace EONET.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categoriesService;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ICategoriesService categoriesService, ILogger<CategoriesController> logger)
        {
            _categoriesService = categoriesService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                return Ok(await _categoriesService.GetCategories());
            }
            catch (HttpRequestException httpException)
            {
                _logger.LogError("GetCategories Request Error: {@exception}", httpException);
                //TODO: Better Error Handling for failed request
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError("GetCategories Error: {@exception}", ex);
                throw;
            }
        }
    }
}
