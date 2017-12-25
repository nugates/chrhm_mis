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
    public class ItemAllocationModel
    {
        public long ID { get; set; }
        [DisplayName("Beneficiary")]
        public int BeneficiaryID { get; set; }

        [DisplayName("Item Name")]
        public int ItemID { get; set; }

        [DisplayName("Item Name")]
        public string ItemName { get; set; }

        [DisplayName("Block")]
        public int BlockID { get; set; }

        [DisplayName("ADC/Dev Sub Div")]
        public int ADCID { get; set; }

        [DisplayName("GPU")]
        public int GPUID { get; set; }

        public decimal Quantity { get; set; }
        public string ViewQuantity { get; set; }

        [DisplayName("Date of Issue")]
        public DateTime? IssueDate { get; set; }

        [DisplayName("Constituency")]
        public int ConstituencyID { get; set; }

        [DisplayName("Beneficiary")]
        public string BeneficiaryName { get; set; }

        [DisplayName("Constituency")]
        public string ConstituencyName { get; set; }
        public string PHONE { get; set; }

        [DisplayName("Aadhar No.")]
        public string AADHAR_NO { get; set; }

        [DisplayName("Unit")]
        public int UnitID { get; set; }

        [DisplayName("Allotment No")]
        public string AllotmentNo { get; set; }

        [DisplayName("Form ID")]
        public string FormID { get; set; }
        public DateTime? issuedateView { get; set; }

        [DisplayName("Vehicle No")]
        public string VehicleNo { get; set; }

        [DisplayName("Order Place By")]
        public string OrderPlaceBy { get; set; }

        [DisplayName("Challan No")]
        public string ChallanNo { get; set; }

        [DisplayName("Qty Due")]
        public string QtyDue { get; set; }

        [DisplayName("Total Qty")]
        public string TotalQty { get; set; }

        public string Limit { get; set; }

        public string UnitName { get; set; }

        public string QtyIssued { get; set; }

       

        [NotMapped]
        public SelectList ConstituencyList { get; set; }

        [NotMapped]
        public SelectList BlockList { get; set; }

        [NotMapped]
        public SelectList GPUList { get; set; }

        [NotMapped]
        public SelectList ADCList { get; set; }

        [NotMapped]
        public SelectList BeneficiaryList { get; set; }

        [NotMapped]
        public SelectList ItemList { get; set; }

        [NotMapped]
        public SelectList UnitList { get; set; }
    }

    public class ItemAllocationModel1
    {
        public int ID { get; set; }
        public string ItemName { get; set; }
        public Nullable<decimal> Limit { get; set; }
        public string QtyIssued { get; set; }

    }
}