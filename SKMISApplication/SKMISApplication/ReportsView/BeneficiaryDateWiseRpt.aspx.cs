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
    public partial class BeneficiaryDateWiseRpt : System.Web.UI.Page
    {
        DataSet ds = new DataSet();
        string beneficiaryID = string.Empty;
        DateTime startdate = DateTime.Now;
        DateTime enddate = DateTime.Now;
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                beneficiaryID = Server.UrlDecode(Request.QueryString["beneficiaryID"]);
                startdate = Convert.ToDateTime(Server.UrlDecode(Request.QueryString["startdate"]));
                enddate = Convert.ToDateTime(Server.UrlDecode(Request.QueryString["enddate"]));
                LoadReport();
            }

        }
        public void LoadReport()
        {

            List<ItemAllocationModel> result = new List<ItemAllocationModel>();
            long bid = Convert.ToInt64(beneficiaryID);

            BeneficiaryEntry beneficiary = (from ce in db.BeneficiaryEntries
                                              where ce.ID == bid && ce.IsActive == true
                                              select ce).ToList().FirstOrDefault();

            var res = (from ge in db.ItemAllocations
                       where ge.BeneficiaryID == bid && ge.IsActive == true
                       && ge.IssueDate >= startdate && ge.IssueDate <= enddate
                       group ge by ge.ItemID into b
                       select new { ItemID = b.Key, ItemName = b.Select(d => d.ItemMaster.ItemName), Allocated = b.Select(d => d.ItemMaster.Limit).FirstOrDefault(), TotalQuantity = b.Sum(d => d.Quantity), Due = ((b.Select(s => s.ItemMaster.Limit).FirstOrDefault()) - b.Sum(d => d.Quantity)) });

            foreach (var r in res)
            {
                ItemAllocationModel im = new ItemAllocationModel();
                im.ItemID = (int)r.ItemID;
                im.ItemName = r.ItemName.FirstOrDefault();
                im.TotalQty = r.TotalQuantity.ToString();
                im.QtyDue = r.Due.ToString();
                im.Limit = r.Allocated.ToString();
                result.Add(im);
            }

            DataTable table = new DataTable();
            table.Columns.Add("ItemName", typeof(string));
            table.Columns.Add("Allocated", typeof(string));
            table.Columns.Add("TotalIssued", typeof(string));
            table.Columns.Add("Remaining", typeof(string));
            foreach (ItemAllocationModel iam in result)
            {
                table.Rows.Add(iam.ItemName, iam.Limit, iam.TotalQty, iam.QtyDue);
            }

            string rptDate = DateTime.Now.ToString("MM-dd-yyyy-HH-mm-ss");
            string Rptname = "EstoreSummary_Report_" + rptDate;
            //estoresummaryRpt.ServerReport.DisplayName = Rptname;
            estoresummaryRpt.LocalReport.DisplayName = Rptname;
            estoresummaryRpt.ProcessingMode = ProcessingMode.Local;
            estoresummaryRpt.LocalReport.ReportPath = Server.MapPath("rptEstoreSummary.rdlc");

            ReportParameter AllotmentNo = new ReportParameter("AllotmentNo", beneficiary.AllotmentNo);
            ReportParameter Form_ID = new ReportParameter("FormID", beneficiary.FormID);
            ReportParameter BeneficiaryName = new ReportParameter("BeneficiaryName", beneficiary.BeneficiaryName);
            ReportParameter Constituency = new ReportParameter("Constituency", beneficiary.ConstituencyMaster.Constituency);

            estoresummaryRpt.LocalReport.SetParameters(new ReportParameter[] { AllotmentNo, Form_ID, BeneficiaryName, Constituency });

            estoresummaryRpt.LocalReport.DataSources.Clear();
            ReportDataSource datasource = new ReportDataSource("EstoreSummaryDS", table);
            estoresummaryRpt.LocalReport.DataSources.Add(datasource);
            estoresummaryRpt.LocalReport.Refresh();
            

        }
    }
}