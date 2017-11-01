using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class VendorEntryModel
    {
        public long VendorId { get; set; }
        [Required]
        public string VendorName { get; set; }
        public string VendorAddress { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}