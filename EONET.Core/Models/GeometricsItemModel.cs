using EONET.Core.Enums;
using System;

namespace EONET.Core.Models
{
    public class GeometricsItemModel
    {
        public DateTime Date { get; set; }

        public GeometricsTypeEnum Type { get; set; }

        public object Coordinates { get; set; }
    }
}
