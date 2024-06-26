//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SKMISApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ItemAllocation
    {
        public int ID { get; set; }
        public Nullable<long> BeneficiaryID { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public Nullable<System.DateTime> IssueDate { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> ConstituencyID { get; set; }
        public string VehicleNo { get; set; }
        public string OrderPlaceBy { get; set; }
        public string ChallanNo { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsSyncFromCloud { get; set; }
        public Nullable<bool> IsSyncToCloud { get; set; }
    
        public virtual ConstituencyMaster ConstituencyMaster { get; set; }
        public virtual ItemMaster ItemMaster { get; set; }
    }
}
