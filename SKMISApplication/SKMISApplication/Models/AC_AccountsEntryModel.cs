using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Models
{
    public class AC_AccountsEntryModel
    {
        public long ID { get; set; }
        public long? BeneficiaryID { get; set; }
        public long? CtgItemID { get; set; }
        public int? UnitID { get; set; }
        public int? VendorID { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Rate { get; set; }
        public decimal? Amount { get; set; }
        public string Remarks { get; set; }
        public DateTime? EntryDate { get; set; }
        [NotMapped]
        public  SelectList AC_CategoryItemList { get; set; }
        [NotMapped]
        public SelectList UnitList { get; set; }
        [NotMapped]
        public SelectList VendorList { get; set; }



        public string ConstituencyName { get; set; }
        public int ConstituencyID { get; set; }
        [DisplayName("Allotment No")]
        public string AllotmentNo { get; set; }

        [DisplayName("Beneficiary")]
        public string BeneficiaryName { get; set; }

        public string GPU { get; set; }
        public string Distance { get; set; }

    }
}