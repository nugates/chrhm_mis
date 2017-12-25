using SKMISApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Controllers
{
    public class LoginController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        // GET: Login
        public ActionResult Index()
        {
            System.Web.HttpContext.Current.Session["UID"] = null;
            System.Web.HttpContext.Current.Session["Userid"] = null;
            System.Web.HttpContext.Current.Session["CompanyID"] = null;
            System.Web.HttpContext.Current.Session["UserType"] = null;
            System.Web.HttpContext.Current.Session["StoreID"] = null;
            return View();
        }

        public ActionResult Dashboard()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View();
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "Adminsync")
            {
                myView.MasterName = "~/Views/Shared/_LayoutAdminsync.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }
        public ActionResult AdminsyncDashboard()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            var myView = View();
            myView.MasterName = "~/Views/Shared/_LayoutAdminsync.cshtml";            
            return myView;
        }
        

       [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(LoginModel model)
        {
            if (model.USER_ID == "super_admin" && model.Password == "super_admin")
            {
                System.Web.HttpContext.Current.Session["UID"] = "0";
                System.Web.HttpContext.Current.Session["Userid"] = "0";
                System.Web.HttpContext.Current.Session["CompanyID"] = "0";
                System.Web.HttpContext.Current.Session["UserType"] = "SAdmin";
                System.Web.HttpContext.Current.Session["StoreID"] = "0";
                return RedirectToAction("Dashboard");
            }
            else if (model.USER_ID == "adminsync" && model.Password == "adminsync@123")
            {
                System.Web.HttpContext.Current.Session["UID"] = "0";
                System.Web.HttpContext.Current.Session["Userid"] = "0";
                System.Web.HttpContext.Current.Session["CompanyID"] = "0";
                System.Web.HttpContext.Current.Session["UserType"] = "Adminsync";
                System.Web.HttpContext.Current.Session["StoreID"] = "0";
                return RedirectToAction("AdminsyncDashboard");
            }
            else
            {
                var result = (from ce in db.UserMasters
                              where ce.UserID == model.USER_ID && ce.Password == model.Password
                              select ce).ToList();

                if (result.Count() > 0)
                {
                    System.Web.HttpContext.Current.Session["UID"] = result.Select(a => a.ID).FirstOrDefault();
                    System.Web.HttpContext.Current.Session["Userid"] = result.Select(a => a.UserID).FirstOrDefault();
                    System.Web.HttpContext.Current.Session["CompanyID"] = result.Select(a => a.CompanyID).FirstOrDefault();
                    System.Web.HttpContext.Current.Session["UserType"] = result.Select(a => a.UserType).FirstOrDefault();
                    System.Web.HttpContext.Current.Session["StoreID"] = result.Select(a => a.StoreID).FirstOrDefault();
                    return RedirectToAction("Dashboard");
                }
            }
            return View();
        }
    }
}