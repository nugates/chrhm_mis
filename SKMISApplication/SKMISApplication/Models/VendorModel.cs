using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Models
{
    public class VendorModel
    {
        public int ID { get; set; }

        [Required]
        [DisplayName("Name")]
        public string Name { get; set; }
        
        [DisplayName("Address")]
        public string Address { get; set; }

        [Required]
        [DisplayName("Phone")]
        public string Phone { get; set; }

        [Required]
        [DisplayName("Vendor Type")]
        public int? VendorTypeID { get; set; }

        [DisplayName("Vendor Type")]
        public string VendorType { get; set; }

        [DisplayName("A/C Name")]
        public string ACName { get; set; }

        [DisplayName("A/C Number")]
        public string ACNumber { get; set; }

        [DisplayName("Bank Name")]
        public string BankName { get; set; }

        [DisplayName("IFSC Code")]
        public string IFSC { get; set; }

        [DisplayName("Pan Card")]
        public string PanCard { get; set; }

        public string DocumentPath { get; set; }

        [DisplayName("Branch Name")]
        public string BranchName { get; set; }

        [NotMapped]
        public SelectList VendorTypeList { get; set; }

    }
}