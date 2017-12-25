using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class ConstituencyModel
    {
        public int ID { get; set; }
        [Required]
        public string Constituency { get; set; }
        public string Description { get; set; }
    }
}