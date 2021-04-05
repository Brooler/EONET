using EONET.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EONET.Core.Interfaces
{
    public interface ICategoriesProvider
    {
        Task<IEnumerable<CategoryModel>> GetCategories();
    }
}
