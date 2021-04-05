using EONET.Core.Models;
using System.Collections.Generic;

namespace EONET.NasaProvider.Models
{
    internal class NasaEventsResponseModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Link { get; set; }

        public IEnumerable<EventModel> Events { get; set; }
    }
}
