﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SKMISEntities2 : DbContext
    {
        public SKMISEntities2()
            : base("name=SKMISEntities2")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<BeneficiaryDocument> BeneficiaryDocuments { get; set; }
        public virtual DbSet<BeneficiaryEntry> BeneficiaryEntries { get; set; }
        public virtual DbSet<BeneficiaryEntry_old> BeneficiaryEntry_old { get; set; }
        public virtual DbSet<CasteMaster> CasteMasters { get; set; }
        public virtual DbSet<ConstituencyMaster> ConstituencyMasters { get; set; }
        public virtual DbSet<DisabilityMaster> DisabilityMasters { get; set; }
        public virtual DbSet<DriverEntry> DriverEntries { get; set; }
        public virtual DbSet<EmployeeEntry> EmployeeEntries { get; set; }
        public virtual DbSet<InventoryEntry> InventoryEntries { get; set; }
        public virtual DbSet<OccupationMaster> OccupationMasters { get; set; }
        public virtual DbSet<QualificationMaster> QualificationMasters { get; set; }
        public virtual DbSet<VehicleEntry> VehicleEntries { get; set; }
        public virtual DbSet<VendorEntry> VendorEntries { get; set; }
        public virtual DbSet<WardMaster> WardMasters { get; set; }
    }
}
