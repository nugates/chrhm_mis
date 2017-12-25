using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class AC_CategoryModel
    {
        public long ID { get; set; }
        [Required]
        public string Category { get; set; }
        public string Description { get; set; }
    }
}