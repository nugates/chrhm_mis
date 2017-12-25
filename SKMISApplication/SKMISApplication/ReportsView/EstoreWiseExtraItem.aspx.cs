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

    public partial class EstoreWiseExtraItems : System.Web.UI.Page
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
                ht.Add("@storID", storeid);
                ht.Add("@fromdate", startdate.ToString("yyyy/MM/dd"));
                ht.Add("@todate", enddate.ToString("yyyy/MM/dd"));
                ds = dbf.SysFetchDataInDataSet("[ExtraItemsIssuedStoreWise]", ht);
                

                string rptDate = DateTime.Now.ToString("MM-dd-yyyy-HH-mm-ss");
                string Rptname = "EstoreWiseExtraItem" + rptDate;
                estoreExtraRpt.LocalReport.DisplayName = Rptname;
                estoreExtraRpt.ProcessingMode = ProcessingMode.Local;
                estoreExtraRpt.LocalReport.ReportPath = Server.MapPath("EstoreWiseExtraItem.rdlc");
                ReportParameter StartDate = new ReportParameter("StartDate", startdate.ToString("dd/MM/yyyy"));
                ReportParameter EndDate = new ReportParameter("EndDate", enddate.ToString("dd/MM/yyyy"));
                estoreExtraRpt.LocalReport.SetParameters(new ReportParameter[] { StartDate, EndDate });
                //if (ds.Tables[0].Rows.Count > 0)
                //{
                //    //ReportParameter StoreName = new ReportParameter("StoreName", ds.Tables[0].Rows[0]["StoreName"].ToString());
                    
                //}
                //else
                //{
                //    ReportParameter StoreName = new ReportParameter("StoreName", "");
                //    estoreExtraRpt.LocalReport.SetParameters(new ReportParameter[] { StartDate, EndDate, StoreName });
                //}

                estoreExtraRpt.LocalReport.DataSources.Clear();
                ReportDataSource datasource = new ReportDataSource("EstoreStocksDataDS", ds.Tables[0]);
                estoreExtraRpt.LocalReport.DataSources.Add(datasource);
                estoreExtraRpt.LocalReport.Refresh();
            }
        }
    }
}