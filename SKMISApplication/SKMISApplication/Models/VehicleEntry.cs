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
    
    public partial class VehicleEntry
    {
        public long VehicleId { get; set; }
        public string VehicleNo { get; set; }
        public string VechileMake { get; set; }
        public Nullable<int> ModelYear { get; set; }
        public string Model { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string FuelType { get; set; }
        public Nullable<long> VendorID { get; set; }
        public string PlateNo { get; set; }
        public string InsuranceName { get; set; }
        public string PolicyNo { get; set; }
        public Nullable<System.DateTime> InsuranceExpiry { get; set; }
        public string VehicleColour { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
    
        public virtual VendorEntry VendorEntry { get; set; }
    }
}
