using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class VehicleEntryModel
    {
        public long VehicleId { get; set; }
        [Required]
        public string VehicleNo { get; set; }
        public string ConstituencyName { get; set; }
        public int? VehicleCharge { get; set; }
        [Required]
        public int? VendorId { get; set; }
    }
}