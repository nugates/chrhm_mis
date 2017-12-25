using SKMISApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Controllers
{
    public class ReportsController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        // GET: Reports
        public ActionResult Index()
        {
            //if (System.Web.HttpContext.Current.Session["UserType"] == null)
            //{
            //    return RedirectToAction("Index", "Login");
            //}
            ReportModel rmodel = new ReportModel();
            rmodel.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    StoreName = a.StoreName
                                }).ToList(), "ID", "StoreName");
            rmodel.BeneficiaryList = new SelectList(db.BeneficiaryEntries.Where(a => a.IsActive == true).Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    BeneficiaryName = a.BeneficiaryName
                                }).ToList(), "ID", "BeneficiaryName");

            rmodel.FromDate = DateTime.Now;
            rmodel.ToDate = DateTime.Now;
            return View(rmodel);
        }
        [HttpPost]
        public async Task<ActionResult> Index(ReportModel _report)
        {
            if (_report.ReportType != null)
            {
                string _fromdate = "";
                string _todate = "";
                if (_report.ReportType == "Extra Item Store Wise")
                {
                    string _storeid = _report.StoreID;
                    if (_report.SearchBy == "By Date")
                    {
                        _fromdate = Convert.ToDateTime(_report.FromDate).ToString("dd/MM/yyyy");
                        _todate = Convert.ToDateTime(_report.ToDate).ToString("dd/MM/yyyy");
                    }
                    if (_report.SearchBy == "By Month")
                    {
                        var startDate = new DateTime(_report.Year, _report.Month, 1);
                        var endDate = startDate.AddMonths(1).AddDays(-1);
                        _fromdate = Convert.ToDateTime(startDate).ToString("dd/MM/yyyy");
                        _todate = Convert.ToDateTime(endDate).ToString("dd/MM/yyyy");
                    }

                    return Redirect(String.Format("~/ReportsView/EstoreWiseExtraItem.aspx?storeid={0}&startdate={1}&enddate={2}", _storeid, _fromdate, _todate));
                }
                if (_report.ReportType == "E. Store")
                {
                    string _storeid = _report.StoreID;
                    if (_report.SearchBy == "By Date")
                    {
                        _fromdate = Convert.ToDateTime(_report.FromDate).ToString("dd/MM/yyyy");
                        _todate = Convert.ToDateTime(_report.ToDate).ToString("dd/MM/yyyy");
                    }
                    if (_report.SearchBy == "By Month")
                    {
                        var startDate = new DateTime(_report.Year, _report.Month, 1);
                        var endDate = startDate.AddMonths(1).AddDays(-1);
                        _fromdate = Convert.ToDateTime(startDate).ToString("dd/MM/yyyy");
                        _todate = Convert.ToDateTime(endDate).ToString("dd/MM/yyyy");
                    }

                    return Redirect(String.Format("~/ReportsView/EstoreRpt.aspx?storeid={0}&startdate={1}&enddate={2}", _storeid, _fromdate, _todate));
                }
                if (_report.ReportType == "Stock Report")
                {
                    string _storeid = _report.StoreID;
                    return Redirect(String.Format("~/ReportsView/StockRpt.aspx?storeid={0}", _storeid));
                }
                if (_report.ReportType == "Inventory")
                {
                    string _storeid = _report.StoreID;
                    if (_report.SearchBy == "By Date")
                    {
                        _fromdate = Convert.ToDateTime(_report.FromDate).ToString("dd/MM/yyyy");
                        _todate = Convert.ToDateTime(_report.ToDate).ToString("dd/MM/yyyy");
                    }
                    if (_report.SearchBy == "By Month")
                    {
                        var startDate = new DateTime(_report.Year, _report.Month, 1);
                        var endDate = startDate.AddMonths(1).AddDays(-1);
                        _fromdate = Convert.ToDateTime(startDate).ToString("dd/MM/yyyy");
                        _todate = Convert.ToDateTime(endDate).ToString("dd/MM/yyyy");
                    }

                    return Redirect(String.Format("~/ReportsView/InventoryRpt.aspx?storeid={0}&startdate={1}&enddate={2}", _storeid, _fromdate, _todate));
                }
                if (_report.ReportType == "Beneficiary Wise")
                {
                    if (_report.BeneficiaryID != null)
                    {
                        long beneficiaryID = Convert.ToInt64(_report.BeneficiaryID);

                        BeneficiaryEntry benificiary = (from ce in db.BeneficiaryEntries
                                                        where ce.ID == beneficiaryID && ce.IsActive == true
                                                        select ce).ToList().FirstOrDefault();


                        if (_report.SearchBy == "By Date")
                        {
                            _fromdate = Convert.ToDateTime(_report.FromDate).ToString("dd/MM/yyyy");
                            _todate = Convert.ToDateTime(_report.ToDate).ToString("dd/MM/yyyy");
                        }
                        if (_report.SearchBy == "By Month")
                        {
                            var startDate = new DateTime(_report.Year, _report.Month, 1);
                            var endDate = startDate.AddMonths(1).AddDays(-1);
                            _fromdate = Convert.ToDateTime(startDate).ToString("dd/MM/yyyy");
                            _todate = Convert.ToDateTime(endDate).ToString("dd/MM/yyyy");
                        }
                        if (_report.SearchBy == "Total Summary")
                        {
                            return Redirect("~/ReportsView/EstoreSummaryReport.aspx?Data=" + benificiary.FormID);
                        }
                        if (_report.SearchBy == "Date wise Summary")
                        {
                            _fromdate = Convert.ToDateTime(_report.FromDate).ToString("dd/MM/yyyy");
                            _todate = Convert.ToDateTime(_report.ToDate).ToString("dd/MM/yyyy");
                            return Redirect(String.Format("~/ReportsView/BeneficiaryDateWiseRpt.aspx?beneficiaryID={0}&startdate={1}&enddate={2}", beneficiaryID, _fromdate, _todate));
                        }
                        else
                        {
                            //var startDate = new DateTime(_report.Year, _report.Month, 1);
                            //var endDate = startDate.AddMonths(1).AddDays(-1);
                            //_fromdate = Convert.ToDateTime(startDate).ToString("dd/MM/yyyy");
                            //_todate = Convert.ToDateTime(endDate).ToString("dd/MM/yyyy");
                            return Redirect(String.Format("~/ReportsView/BeneficiaryMonthWiseDetails.aspx?beneficiaryID={0}&startdate={1}&enddate={2}", beneficiaryID, _fromdate, _todate));
                        }
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Please select beneficiary");
                    }
                    //return Redirect(String.Format("~/ReportsView/BeneficiaryDateWiseRpt.aspx?beneficiaryID={0}&startdate={1}&enddate={2}", beneficiaryID, _fromdate, _todate));
                    //return Redirect(String.Format("~/ReportsView/BeneficiaryMonthWiseDetails.aspx?beneficiaryID={0}&startdate={1}&enddate={2}", beneficiaryID, _fromdate, _todate));
                }
                if (_report.ReportType == "E. Store Summary Report")
                {
                    string _forid = _report.FormID;
                    return Redirect("~/ReportsView/EstoreSummaryReport.aspx?Data=" + _forid);
                }
                else if (_report.ReportType == "E. Store Detail Report")
                {
                    string _forid = _report.FormID;
                    return Redirect("~/ReportsView/EstoreDetailReport.aspx?Data=" + _forid);
                }
                else
                {
                    ReportModel rmodel = new ReportModel();
                    rmodel.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                        new
                                        {
                                            ID = a.ID,
                                            StoreName = a.StoreName
                                        }).ToList(), "ID", "StoreName");
                    rmodel.BeneficiaryList = new SelectList(db.BeneficiaryEntries.Where(a => a.IsActive == true).Select(a =>
                                        new
                                        {
                                            ID = a.ID,
                                            BeneficiaryName = a.BeneficiaryName
                                        }).ToList(), "ID", "BeneficiaryName");

                    rmodel.FromDate = DateTime.Now;
                    rmodel.ToDate = DateTime.Now;
                    return View(rmodel);
                }
            }
            else
            {
                ReportModel rmodel = new ReportModel();
                rmodel.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                    new
                                    {
                                        ID = a.ID,
                                        StoreName = a.StoreName
                                    }).ToList(), "ID", "StoreName");
                rmodel.BeneficiaryList = new SelectList(db.BeneficiaryEntries.Where(a => a.IsActive == true).Select(a =>
                                    new
                                    {
                                        ID = a.ID,
                                        BeneficiaryName = a.BeneficiaryName
                                    }).ToList(), "ID", "BeneficiaryName");

                rmodel.FromDate = DateTime.Now;
                rmodel.ToDate = DateTime.Now;
                return View(rmodel);
            }
        }
    }
}