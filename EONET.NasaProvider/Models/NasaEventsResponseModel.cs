using EONET.Core.Models;
using System.Collections.Generic;

namespace EONET.NasaProvider.Models
{
    internal class NasaEventsResponseModel : NasaResponseModelBase
    {
        public IEnumerable<EventModel> Events { get; set; }
    }
}
