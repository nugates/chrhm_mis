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
    
    public partial class ItemMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ItemMaster()
        {
            this.InventoryMasters = new HashSet<InventoryMaster>();
            this.ItemAllocations = new HashSet<ItemAllocation>();
        }
    
        public int ID { get; set; }
        public Nullable<int> ItemCode { get; set; }
        public string ItemName { get; set; }
        public Nullable<decimal> Limit { get; set; }
        public Nullable<int> UnitID { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InventoryMaster> InventoryMasters { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ItemAllocation> ItemAllocations { get; set; }
        public virtual UnitMaster UnitMaster { get; set; }
    }
}
