using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Models
{
    public class AC_CategoryItemModel
    {
        public long ID { get; set; }
        [Required]
        public long? CategoryID { get; set; }
        [Required]
        public string CategoryItemName { get; set; }
        public string Description { get; set; }
        public int? UnitID { get; set; }
        public string UnitName { get; set; }

        //public virtual AC_Category AC_Category { get; set; }
        [NotMapped]
        public SelectList CategoryItemList { get; set; }

        [NotMapped]
        public SelectList UnitList { get; set; }
    }
}