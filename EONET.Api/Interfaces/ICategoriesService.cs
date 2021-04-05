using EONET.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EONET.Api.Interfaces
{
    public interface ICategoriesService
    {
        Task<IEnumerable<CategoryModel>> GetCategories();
    }
}
