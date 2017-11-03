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
    public class BeneficiaryEntryModel
    {
        public long BeneficiaryId { get; set; }
        //[Required]
        public string BeneficiaryName { get; set; }
        public string ConstituencyName { get; set; }
        public string VillageName { get; set; }
        public int? WardNo { get; set; }
        public int? HouseNo { get; set; }


        //--------------------------------------------------

        public long ID { get; set; }
        [Required]
        [DisplayName("Full Name")]
        public string FullName { get; set; }

        //[Required]
        [DisplayName("Date of Birth")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public Nullable<System.DateTime> DateOfBirth { get; set; }

        //[Required]
        [DisplayName("Father/Mother Name")]
        public string FatherOrMotherName { get; set; }

        //[Required]
        [DisplayName("Mobile No")]
        public Nullable<long> MobileNo { get; set; }

        //[Required]
        [DisplayName("Religion")]
        public string Religion { get; set; }

        //[Required]
        public string Category { get; set; }

        //[Required]
        [DisplayName("Employment Type")]
        public string EmploymentType { get; set; }
        
        //[Required]
        [DisplayName("Aadhar No")]
        public Nullable<long> AadharNo { get; set; }
        
        //[Required]
        [DisplayName("Gender")]
        public string Gender { get; set; }

        //[Required]
        [DisplayName("Ward Name")]
        public Nullable<long> WardID { get; set; }

        //[Required]
        [DisplayName("Maritial Status")]
        public string MaritialStatus { get; set; }

        [DisplayName("Caste")]
        public string CasteID { get; set; }

        //[Required]
        [DisplayName("Qualification")]
        public string QualificationID { get; set; }

        //[Required]
        [DisplayName("Occupation")]
        public string OccupationID { get; set; }
        
        //[Required]
        [DisplayName("Annual Income")]
        public Nullable<long> AnnualIncome { get; set; }

        [DisplayName("Constituency")]
        public Nullable<int> ConstituencyID { get; set; }

        [DisplayName("Ward")]
        public string WardName { get; set; }

        [DisplayName("Caste")]
        public string CasteName { get; set; }

        [DisplayName("Qualification")]
        public string QualificationName { get; set; }

        [DisplayName("Occupation")]
        public string OccupationName { get; set; }


        [NotMapped]
        public SelectList CasteList { get; set; }

        [NotMapped]
        public SelectList WardList { get; set; }

        [NotMapped]
        public SelectList OccupationList { get; set; }

        [NotMapped]
        public SelectList QualificationList { get; set; }
        
        [NotMapped]
        public SelectList ConstituencyList { get; set; }
    }
}