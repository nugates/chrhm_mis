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
        public long ID { get; set; }

        [Required]
        [DisplayName("Allotment No")]
        public string AllotmentNo { get; set; }

        [Required]
        [DisplayName("Form ID")]
        public string FormID { get; set; }

        [Required]
        [DisplayName("Beneficiary Name")]
        public string BeneficiaryName { get; set; }

        //[Required]
        [DisplayName("Mobile No")]
        public Nullable<long> MobileNo { get; set; }

        //[Required]
        [DisplayName("Aadhar No")]
        public Nullable<long> AadharNo { get; set; }

        //[Required]
        [DisplayName("Ward Name")]
        public Nullable<long> WardID { get; set; }

        [Required]
        [DisplayName("Constituency")]
        public Nullable<int> ConstituencyID { get; set; }

        [DisplayName("Ward")]
        public string WardName { get; set; }

        [DisplayName("Constituency")]
        public string ConstituencyName { get; set; }

        [DisplayName("ADC/Dev Sub Div")]
        public int? ADCID { get; set; }

        [DisplayName("Block")]
        public int? BlockID { get; set; }

        [DisplayName("GPU")]
        public int? GPUID { get; set; }
        [DisplayName("GPU")]

        public string GPUName { get; set; }
        [DisplayName("Block")]
        public string BlockName { get; set; }
        [DisplayName("ADC/Dev Sub Div")]
        public string ADCName { get; set; }

        [DisplayName("Total Beneficiary")]
        public int Count { get; set; }

        public string Search { get; set; }


        //----------------------------Progress report-----------------

        public bool SiteLevellingAndProtectiveWork { get; set; }
        public bool UptoPlinthSlab { get; set; }
        public bool CastingOfSlab { get; set; }
        public bool SepticTank { get; set; }
        public bool HandOver { get; set; }
        public bool BrickPlasterWork { get; set; }
        public bool DoorWindows { get; set; }
        public bool ElectrificationPlumbing { get; set; }
        public bool PaitingFinishing { get; set; }

        public string DateOfCommencement { get; set; }
        public string DateOfCompletion { get; set; }

        //-----------------------------End-----------------------------









        [NotMapped]
        public SelectList WardList { get; set; }

        [NotMapped]
        public SelectList ConstituencyList { get; set; }

        [NotMapped]
        public SelectList ADCList { get; set; }


        [NotMapped]
        public SelectList BlockList { get; set; }


        [NotMapped]
        public SelectList GPUList { get; set; }
    }

    public class BeneficiaryEntryModelView
    {
        public IEnumerable<BeneficiaryEntryModel> result { get; set; }
        public BeneficiaryEntryModel result2 { get; set; }
    }
}