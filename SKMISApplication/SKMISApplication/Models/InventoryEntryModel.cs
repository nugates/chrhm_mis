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
    public class InventoryEntryModel
    {
        public int ID { get; set; }

        [DisplayName("Item Name")]
        [Required]
        public int? ItemID { get; set; }

        [DisplayName("Item Name")]
        public string ItemName { get; set; }

        [DisplayName("Quantity")]
        [Required]
        public decimal? Quantity { get; set; }

        [DisplayName("Quantity")]
        public string QuantityView { get; set; }

        [DisplayName("Vehicle No")]
        public string VehicleNo { get; set; }

        [DisplayName("Store Name")]
        public int? StoreID { get; set; }

        [DisplayName("Store Name")]
        public string StoreName { get; set; }

        [DisplayName("Entry Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        [Required]
        public DateTime? EntryDate { get; set; }

        [DisplayName("Challan No")]
        public string ChallanNo { get; set; }

        [DisplayName("Invoice No")]
        [Required]
        public string InvoiceNo { get; set; }

        [DisplayName("Note")]
        public string Note { get; set; }

        public DateTime? DatetimeView { get; set; }

        [NotMapped]
        public SelectList ItemList { get; set; }

        [NotMapped]
        public SelectList StoreList { get; set; }
    }
}