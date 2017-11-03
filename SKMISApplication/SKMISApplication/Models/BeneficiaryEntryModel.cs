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

        [DisplayName("Spouse Name")]
        public string SpouceName { get; set; }

        //[Required]
        [DisplayName("Aadhar No")]
        public Nullable<long> AadharNo { get; set; }

        //[Required]
        [DisplayName("Identification Type")]
        public string IdentificationType { get; set; }

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
        [DisplayName("Details")]
        public string Details { get; set; }

        //[Required]
        [DisplayName("Occupation")]
        public string OccupationID { get; set; }

        //[Required]
        [DisplayName("Disability Type")]
        public string DisabilityID { get; set; }

        //[Required]
        [DisplayName("Annual Income")]
        public Nullable<long> AnnualIncome { get; set; }

        [DisplayName("Is Family Head")]
        public bool IsFamilyHead { get; set; }

        [DisplayName("Is Voter")]
        public bool IsVoter { get; set; }

        [DisplayName("Additional Qualification")]
        public string AddlQualification { get; set; }

        [DisplayName("Physically Challenged")]
        public bool PhysicallyChallenged { get; set; }

        [DisplayName("Non Resident")]
        public bool NonResident { get; set; }

        [DisplayName("Household")]
        public Nullable<int> HouseholdID { get; set; }
        

        [NotMapped]
        public SelectList CasteList { get; set; }
        public string CasteName { get; set; }

        [NotMapped]
        public SelectList WardList { get; set; }
        [DisplayName("Ward Name")]
        public string WardName { get; set; }

        [NotMapped]
        public SelectList OccupationList { get; set; }
        public string OccupationName { get; set; }

        [NotMapped]
        public SelectList QualificationList { get; set; }
        public string QualificationName { get; set; }

        [NotMapped]
        public SelectList DisabilityList { get; set; }
        public string DisabilityName { get; set; }

        [NotMapped]
        public SelectList HouseholdList { get; set; }
        [DisplayName("Household Name")]
        public string HouseholdName { get; set; }
    }
}