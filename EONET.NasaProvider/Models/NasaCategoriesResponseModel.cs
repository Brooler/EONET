using EONET.Core.Models;
using System.Collections.Generic;

namespace EONET.NasaProvider.Models
{
    internal class NasaCategoriesResponseModel : NasaResponseModelBase
    {
        public IEnumerable<CategoryModel> Categories { get; set; }
    }
}
