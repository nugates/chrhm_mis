using Microsoft.Reporting.WebForms;
using SKMISApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SKMISApplication.ReportsView
{
    public partial class VendorDetails : System.Web.UI.Page
    {
        DataSet ds = new DataSet();
        int ID = 0;
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ID = Convert.ToInt32(Server.UrlDecode(Request.QueryString["id"]));
                LoadReport();
            }

        }
        public void LoadReport()
        {
            var vd = (from ce in db.VendorMasters
                                where ce.ID == ID && ce.IsActive == true
                                select ce).ToList();
            List<VendorModel> result = new List<VendorModel>();
            foreach (var r in vd)
            {
                VendorModel im = new VendorModel();
                im.Name = r.Name;
                im.Address = r.Address;
                im.Phone = r.Phone;
                im.VendorType = r.VendorType.VendorType1;
                im.ACName = r.ACName;
                im.ACNumber = r.ACNumber;
                im.BankName = r.BankName;
                im.IFSC = r.IFSC;
                im.PanCard = r.PanCard;
                im.BranchName = r.BranchName;
                result.Add(im);
            }

            DataTable table = new DataTable();
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Address", typeof(string));
            table.Columns.Add("Phone", typeof(string));
            table.Columns.Add("VendorType", typeof(string));
            table.Columns.Add("ACName", typeof(string));
            table.Columns.Add("ACNumber", typeof(string));
            table.Columns.Add("BankName", typeof(string));
            table.Columns.Add("IFSC", typeof(string));
            table.Columns.Add("PanCard", typeof(string));
            table.Columns.Add("BranchName", typeof(string));
            foreach (VendorModel iam in result)
            {
                table.Rows.Add(iam.Name, iam.Address, iam.Phone, iam.VendorType, iam.ACName, iam.ACNumber, iam.BankName, iam.IFSC, iam.PanCard, iam.BranchName);
            }

            string rptDate = DateTime.Now.ToString("MM-dd-yyyy-HH-mm-ss");
            string Rptname = "VendorDetails_" + rptDate;
            //estoresummaryRpt.ServerReport.DisplayName = Rptname;
            vendordetailRpt.LocalReport.DisplayName = Rptname;
            vendordetailRpt.ProcessingMode = ProcessingMode.Local;
            vendordetailRpt.LocalReport.ReportPath = Server.MapPath("VendorDetails_rpt.rdlc");
            vendordetailRpt.LocalReport.DataSources.Clear();
            ReportDataSource datasource = new ReportDataSource("VendorDetailDS", table);
            vendordetailRpt.LocalReport.DataSources.Add(datasource);
            vendordetailRpt.LocalReport.Refresh();
        }
    }
}