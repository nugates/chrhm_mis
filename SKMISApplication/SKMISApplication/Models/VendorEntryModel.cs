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
        [Display(Name = "Vendor Name")]
        public string VendorName { get; set; }

        [Required]
        [Display(Name = "Address")]
        public string VendorAddress { get; set; }
        
        public string City { get; set; }
        public string Country { get; set; }
        public string State { get; set; }

        [Display(Name = "Pin Code")]
        public Nullable<long> PinCode { get; set; }

        [Required]
        [Display(Name = "Mobile No")]
        public Nullable<long> MobileNo { get; set; }

        [Display(Name = "Phone No")]
        public Nullable<long> PhoneNo { get; set; }
        public Nullable<long> Fax { get; set; }
        public string Email { get; set; }

        [Display(Name = "Website URL")]
        public string Website { get; set; }

        [Display(Name = "Note")]
        public string Misc { get; set; }
    }
}