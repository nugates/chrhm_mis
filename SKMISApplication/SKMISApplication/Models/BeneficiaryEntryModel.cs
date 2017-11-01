using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class BeneficiaryEntryModel
    {
        public long BeneficiaryId { get; set; }
        [Required]
        public string BeneficiaryName { get; set; }
        public string ConstituencyName { get; set; }
        public string VillageName { get; set; }
        public int? WardNo { get; set; }
        public int? HouseNo { get; set; }
    }
}