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
    public class ReportModel
    {
        public string FormID { get; set; }

        [DisplayName("Report Type ")]
        public string ReportType { get; set; }

        [DisplayName("From Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? FromDate { get; set; }

        [DisplayName("To Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ToDate { get; set; }

        [DisplayName("Store")]
        public string StoreID { get; set; }

        [DisplayName("Year")]
        public int Year { get; set; }

        [DisplayName("Month")]
        public int Month { get; set; }
        
        public string SearchBy { get; set; }

        [DisplayName("Beneficiary")]
        public string BeneficiaryID { get; set; }

        [NotMapped]
        public SelectList StoreList { get; set; }

        [NotMapped]
        public SelectList BeneficiaryList { get; set; }
    }
}