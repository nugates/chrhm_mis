using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class InventoryEntryModel
    {
        public long ItemId { get; set; }
        [Required]
        public string ItemName { get; set; }
        [Required]
        public int? Limit { get; set; }
    }
}