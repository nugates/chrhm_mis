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
    public partial class EstoreSummaryReport : System.Web.UI.Page
    {
        DataSet ds = new DataSet();
        string FormID = string.Empty;
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                FormID = Server.UrlDecode(Request.QueryString["Data"]);
                LoadReport();
            }
          
        }
        public void LoadReport()
        {
            BeneficiaryEntry beneficiaryID = (from ce in db.BeneficiaryEntries
                          where ce.FormID == FormID && ce.IsActive == true
                          select ce).ToList().FirstOrDefault();

            List<ItemAllocationModel> result = new List<ItemAllocationModel>();

            var res = (from ge in db.ItemAllocations
                       where ge.BeneficiaryID == beneficiaryID.ID && ge.IsActive == true
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

            ReportParameter AllotmentNo = new ReportParameter("AllotmentNo", beneficiaryID.AllotmentNo);
            ReportParameter Form_ID = new ReportParameter("FormID", beneficiaryID.FormID);
            ReportParameter BeneficiaryName = new ReportParameter("BeneficiaryName", beneficiaryID.BeneficiaryName);
            ReportParameter Constituency = new ReportParameter("Constituency", beneficiaryID.ConstituencyMaster.Constituency);
            
            estoresummaryRpt.LocalReport.SetParameters(new ReportParameter[] { AllotmentNo, Form_ID, BeneficiaryName, Constituency });

            estoresummaryRpt.LocalReport.DataSources.Clear();
            ReportDataSource datasource = new ReportDataSource("EstoreSummaryDS", table);
            estoresummaryRpt.LocalReport.DataSources.Add(datasource);
            estoresummaryRpt.LocalReport.Refresh();




            //ReportViewer1.ProcessingMode = ProcessingMode.Local;
            //ReportViewer1.LocalReport.ReportPath = Server.MapPath("rptEstoreSummary.rdlc");
            //ReportViewer1.LocalReport.Refresh();

        }

        //protected void btnestoreRpt_Click(object sender, EventArgs e)
        //{
        //    FormID = txtformid.Value;
        //    //string rptDate = DateTime.Now.ToString("MM-dd-yyyy-HH-mm-ss");
        //    //string Rptname = "EstoreSummary_Report_" + rptDate;
        //    ////estoresummaryRpt.ServerReport.DisplayName = Rptname;
        //    //estoresummaryRpt.LocalReport.DisplayName = Rptname;
        //    //estoresummaryRpt.ProcessingMode = ProcessingMode.Local;
        //    //estoresummaryRpt.LocalReport.ReportPath = Server.MapPath("rptEstoreSummary.rdlc");
        //    //estoresummaryRpt.LocalReport.Refresh();
        //    LoadReport();
        //}
    }
}