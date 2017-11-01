using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class DriverEntryModel
    {
        public long DriverId { get; set; }
        [Required]
        public string DriverName { get; set; }
        public long? DriverContactNumber { get; set; }
    }
}