using Microsoft.Reporting.WebForms;
using SKMISApplication.Models;
using System;
using System.Collections;
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
    public partial class EStoreRpt : System.Web.UI.Page
    {
        DataSet ds = new DataSet();
        string storeid = string.Empty;
        DateTime startdate = DateTime.Now;
        DateTime enddate = DateTime.Now;
        DBFunctions dbf = new DBFunctions();
        Hashtable ht = new Hashtable();
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                storeid = Server.UrlDecode(Request.QueryString["storeid"]);
                startdate = Convert.ToDateTime(Server.UrlDecode(Request.QueryString["startdate"]));
                enddate = Convert.ToDateTime(Server.UrlDecode(Request.QueryString["enddate"]));
                LoadReport();
            }

        }
        public void LoadReport()
        {
            if (storeid != "")
            {
                ht.Clear();
                ht.Add("@store", storeid);
                ht.Add("@fromdate", startdate.ToString("yyyy/MM/dd"));
                ht.Add("@todate", enddate.ToString("yyyy/MM/dd"));
                ds = dbf.SysFetchDataInDataSet("[EstoreReport]", ht);

                //SqlConnection con = new SqlConnection("Data Source=.;Initial Catalog=SKMIS_DEMO1;User ID=sa;Password=sa@123;");
                //con.Open();
                //SqlCommand cmd = new SqlCommand("EstoreReport", con);
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@store", storeid);
                //cmd.Parameters.AddWithValue("@fromdate", startdate.ToString("yyyy/MM/dd"));
                //cmd.Parameters.AddWithValue("@todate", enddate.ToString("yyyy/MM/dd"));
                //SqlDataAdapter sda = new SqlDataAdapter(cmd);
                //DataTable dt = new DataTable();
                //sda.Fill(dt);

                //DataTable table = new DataTable();
                //table.Columns.Add("BeneficiaryID", typeof(string));
                //table.Columns.Add("BeneficiaryName", typeof(string));
                //table.Columns.Add("ItemName", typeof(string));
                //table.Columns.Add("Quantity", typeof(string));
                //table.Columns.Add("IssueDate", typeof(string));
                //table.Columns.Add("Constituency", typeof(string));
                //table.Columns.Add("VehicleNo", typeof(string));
                //table.Columns.Add("OrderPlaceBy", typeof(string));
                //table.Columns.Add("ChallanNo", typeof(string));
                //table.Columns.Add("StoreName", typeof(string));
                //for (int i = 0; i < dt.Rows.Count; i++)
                //{
                //    table.Rows.Add(dt.Rows[i][0], dt.Rows[i][1], dt.Rows[i][2], dt.Rows[i][3], dt.Rows[i][4], dt.Rows[i][5], dt.Rows[i][6], dt.Rows[i][7], dt.Rows[i][8], dt.Rows[i][9]);
                //}

                string rptDate = DateTime.Now.ToString("MM-dd-yyyy-HH-mm-ss");
                string Rptname = "Estore_Report_" + rptDate;
                estoreRpt.LocalReport.DisplayName = Rptname;
                estoreRpt.ProcessingMode = ProcessingMode.Local;
                estoreRpt.LocalReport.ReportPath = Server.MapPath("rptEstore.rdlc");
                ReportParameter StartDate = new ReportParameter("StartDate", startdate.ToString("dd/MM/yyyy"));
                ReportParameter EndDate = new ReportParameter("EndDate", enddate.ToString("dd/MM/yyyy"));
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ReportParameter StoreName = new ReportParameter("StoreName", ds.Tables[0].Rows[0]["StoreName"].ToString());
                    estoreRpt.LocalReport.SetParameters(new ReportParameter[] { StartDate, EndDate, StoreName });
                }
                else
                {
                    ReportParameter StoreName = new ReportParameter("StoreName", "");
                    estoreRpt.LocalReport.SetParameters(new ReportParameter[] { StartDate, EndDate, StoreName });
                }
                

                
                estoreRpt.LocalReport.DataSources.Clear();
                ReportDataSource datasource = new ReportDataSource("EStoreDS", ds.Tables[0]);
                estoreRpt.LocalReport.DataSources.Add(datasource);
                estoreRpt.LocalReport.Refresh();
            }
        }
    }
}