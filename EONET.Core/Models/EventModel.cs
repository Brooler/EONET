using EONET.Core.Enums;
using System;
using System.Collections.Generic;

namespace EONET.Core.Models
{
    public class EventModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Link { get; set; }

        public List<CategoryItemModel> Categories { get; set; }

        public List<SourceItemModel> Sources { get; set; }

        public List<GeometricsItemModel> Geometrics { get; set; }
    }

    public class CategoryItemModel
    {
        public string Id { get; set; }

        public string Title { get; set; }
    }

    public class SourceItemModel
    {
        public string Id { get; set; }

        public string Url { get; set; }
    }

    public class GeometricsItemModel
    {
        public DateTime Date { get; set; }

        public GeometricsTypeEnum Type { get; set; }

        public double[] Coordinates { get; set; }
    }
}
