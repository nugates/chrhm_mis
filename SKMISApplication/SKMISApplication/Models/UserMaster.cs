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
    
    public partial class UserMaster
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public string Password { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public string UserType { get; set; }
        public Nullable<int> StoreID { get; set; }
    }
}
