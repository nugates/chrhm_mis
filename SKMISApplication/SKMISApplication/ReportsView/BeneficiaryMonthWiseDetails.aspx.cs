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
    public partial class BeneficiaryMonthWiseDetails : System.Web.UI.Page
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
            long bid = Convert.ToInt64(beneficiaryID);
            BeneficiaryEntry beneficiary = (from ce in db.BeneficiaryEntries
                                              where ce.ID == bid && ce.IsActive == true
                                              select ce).ToList().FirstOrDefault();

            List<ItemAllocationModel> result = new List<ItemAllocationModel>();

            var res = (from ge in db.ItemAllocations
                       where ge.BeneficiaryID == bid && ge.IsActive == true
                       && ge.IssueDate >= startdate && ge.IssueDate <= enddate
                       select ge).ToList();

            foreach (var r in res)
            {
                ItemAllocationModel im = new ItemAllocationModel();
                im.ItemID = (int)r.ItemID;
                im.ItemName = r.ItemMaster.ItemName;
                im.QtyDue = (r.ItemMaster.Limit - r.Quantity).ToString();
                im.Limit = r.ItemMaster.Limit.ToString();
                im.Quantity = (decimal)r.Quantity;
                im.IssueDate = r.IssueDate;
                im.UnitName = r.ItemMaster.UnitMaster.UnitName;
                result.Add(im);
            }

            DataTable table = new DataTable();
            table.Columns.Add("ItemName", typeof(string));
            table.Columns.Add("Quantity", typeof(decimal));
            table.Columns.Add("Limit", typeof(string));
            table.Columns.Add("IssueDate", typeof(string));
            table.Columns.Add("UnitName", typeof(string));
            foreach (ItemAllocationModel iam in result)
            {
                table.Rows.Add(iam.ItemName, iam.Quantity, iam.Limit, iam.IssueDate, iam.UnitName);
            }

            string rptDate = DateTime.Now.ToString("MM-dd-yyyy-HH-mm-ss");
            string Rptname = "EstoreDetail_Report_" + rptDate;
            //estoresummaryRpt.ServerReport.DisplayName = Rptname;
            estoredetailRpt.LocalReport.DisplayName = Rptname;
            estoredetailRpt.ProcessingMode = ProcessingMode.Local;
            estoredetailRpt.LocalReport.ReportPath = Server.MapPath("rptEstoreDetail.rdlc");

            ReportParameter AllotmentNo = new ReportParameter("AllotmentNo", beneficiary.AllotmentNo);
            ReportParameter Form_ID = new ReportParameter("FormID", beneficiary.FormID);
            ReportParameter BeneficiaryName = new ReportParameter("BeneficiaryName", beneficiary.BeneficiaryName);
            ReportParameter Constituency = new ReportParameter("Constituency", beneficiary.ConstituencyMaster.Constituency);

            estoredetailRpt.LocalReport.SetParameters(new ReportParameter[] { AllotmentNo, Form_ID, BeneficiaryName, Constituency });

            estoredetailRpt.LocalReport.DataSources.Clear();
            ReportDataSource datasource = new ReportDataSource("EstoreDetailDS", table);
            estoredetailRpt.LocalReport.DataSources.Add(datasource);
            estoredetailRpt.LocalReport.Refresh();
        }
    }
}