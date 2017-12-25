using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class SyncModelInventory
    {
        public int? ItemID { get; set; }
        public int? StoreID { get; set; }
        public string VehicleNo { get; set; }
        public decimal Quantity { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public string InvoiceNo { get; set; }
        public string ChallanNo { get; set; }
        public string Note { get; set; }
        public int? CreatedBy { get; set; }

    }
    public class SyncModelItemAllocation
    {
        public Int64? BeneficiaryID { get; set; }
        public int? ItemID { get; set; }
        public decimal Quantity { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? ConstituencyID { get; set; }
        public string VehicleNo { get; set; }
        public string OrderPlaceBy { get; set; }
        public string ChallanNo { get; set; }
        public bool IsActive { get; set; }
    }
    public class SyncModelBeneficiary
    {
        public string AllotmentNo { get; set; }
        public string BeneficiaryName { get; set; }
        public Int64? MobileNo { get; set; }
        public Int64? AadharNo { get; set; }
        public string WardName { get; set; }
        public int? ConstituencyID { get; set; }
        public int? BlockID { get; set; }
        public string GPUName { get; set; }
        public int? ADCID { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public string FormID { get; set; }
    }
}