using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class EmployeeEntryModel
    {
        public long EmployeeId { get; set; }
        [Required]
        public string EmployeeName { get; set; }
        [Required]
        public int? StoreId { get; set; }
        public bool? IsPresent { get; set; }
    }
}