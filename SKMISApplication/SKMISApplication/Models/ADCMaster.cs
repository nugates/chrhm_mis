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
    
    public partial class ADCMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ADCMaster()
        {
            this.BeneficiaryEntries = new HashSet<BeneficiaryEntry>();
        }
    
        public int ID { get; set; }
        public string ADC_DevSubDiv { get; set; }
        public string Description { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BeneficiaryEntry> BeneficiaryEntries { get; set; }
    }
}
