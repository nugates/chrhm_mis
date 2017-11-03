using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Models
{
    public class BeneficiaryDocumentModel
    {
        public long ID { get; set; }
        [Required]
        [DisplayName("Beneficiary")]
        public string BeneficiaryName { get; set; }
        [Required]
        [DisplayName("Document Name")]
        public string DocumentName { get; set; }

        [DisplayName("Document Name")]
        public string DocumentNameGrid { get; set; }

        public long? BeneficiaryID { get; set; }

        public long? DocumentID { get; set; }
        [Required]
        [DisplayName("File Location")]
        public string FileLocation { get; set; }

        [NotMapped]
        public SelectList DocList { get; set; }
        public string DocumentTitle { get; set; }
        [NotMapped]
        public SelectList NameList { get; set; }
        public string CitizenNames { get; set; }
    }
}