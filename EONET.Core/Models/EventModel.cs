using System.Collections.Generic;

namespace EONET.Core.Models
{
    public class EventModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Link { get; set; }

        public IEnumerable<CategoryItemModel> Categories { get; set; }

        public IEnumerable<SourceItemModel> Sources { get; set; }

        public IEnumerable<GeometricsItemModel> Geometrics { get; set; }
    }
}
