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

        [Display(Name ="Name")]
        public string DriverName { get; set; }
        [Display(Name = "Personal No")]
        public Nullable<long> DriverContactNumber { get; set; }
        [Display(Name = "Work M.No")]
        public Nullable<long> WorkContactNumber { get; set; }
        [Display(Name = "Email ID")]
        public string EmailID { get; set; }
        [Display(Name = "Upload D.L.")]
        public string ImagePath { get; set; }
        [Display(Name = "License")]
        public string LicenseNo { get; set; }

        [Display(Name = "L. Issue State")]
        public string LicenseState { get; set; }

        [Display(Name = "L. Expiry Date")]
        //[DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? LicenseExpiryDate { get; set; }

        [Display(Name = "D.O.B.")]
        //[DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? DOB { get; set; }

        [Display(Name = "Alt. M.No")]
        public Nullable<long> AlternateContactNo { get; set; }
        [Display(Name = "Address")]
        public string DriverAddress { get; set; }
        public string City { get; set; }
        public string Pin { get; set; }
        [Display(Name = "Notes")]
        public string Misc { get; set; }
    }
}