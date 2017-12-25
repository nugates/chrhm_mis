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
    public partial class StockRpt : System.Web.UI.Page
    {
        DataSet ds = new DataSet();
        string storeid = string.Empty;
        DBFunctions dbf = new DBFunctions();
        Hashtable ht = new Hashtable();
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                storeid = Server.UrlDecode(Request.QueryString["storeid"]);
                LoadReport();
            }
        }
        public void LoadReport()
        {
            if (storeid != "")
            {
                ht.Clear();
                ht.Add("@storID", storeid);
                ds = dbf.SysFetchDataInDataSet("[ExtraItemsIssuedStoreWise]", ht);
                string rptDate = DateTime.Now.ToString("MM-dd-yyyy-HH-mm-ss");
                string Rptname = "Stock" + rptDate;
                estoreExtraRpt.LocalReport.DisplayName = Rptname;
                estoreExtraRpt.ProcessingMode = ProcessingMode.Local;
                estoreExtraRpt.LocalReport.ReportPath = Server.MapPath("rptStock.rdlc");
                
                estoreExtraRpt.LocalReport.DataSources.Clear();
                ReportDataSource datasource = new ReportDataSource("StockDataDS", ds.Tables[0]);
                estoreExtraRpt.LocalReport.DataSources.Add(datasource);
                estoreExtraRpt.LocalReport.Refresh();
            }
        }
    }
}