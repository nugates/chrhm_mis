using SKMISApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Controllers
{
    public class VendorController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        // GET: Vendor
        public ActionResult Index()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (System.Web.HttpContext.Current.Session["UserType"].ToString() == "Admin" || System.Web.HttpContext.Current.Session["UserType"].ToString() == "SAdmin")
            {
                return RedirectToAction("IndexAdmin");
            }
            var result = (from ce in db.VendorMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Name = ce.Name,
                              Phone = ce.Phone,
                              VendorType = ce.VendorType.VendorType1,
                              ACName = ce.ACName,
                              ACNumber = ce.ACNumber,
                              BankName = ce.BankName,
                              BranchName = ce.BranchName,
                              IFSC = ce.IFSC,
                              PanCard = ce.PanCard,
                              DocumentPath = ce.DocumentPath
                          }).ToList()
                          .Select(d => new VendorModel()
                          {
                              ID = d.ID,
                              Name = d.Name,
                              Phone = d.Phone,
                              VendorType = d.VendorType,
                              ACName = d.ACName,
                              ACNumber = d.ACNumber,
                              BankName = d.BankName,
                              IFSC = d.IFSC,
                              PanCard = d.PanCard,
                              DocumentPath = d.DocumentPath
                          });
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(result.ToList());
            if (usertype == "Admin" || usertype == "SAdmin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }
        
        public ActionResult IndexAdmin()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            var result = (from ce in db.VendorMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Name = ce.Name,
                              Phone = ce.Phone,
                              VendorType = ce.VendorType.VendorType1,
                              ACName = ce.ACName,
                              ACNumber = ce.ACNumber,
                              BankName = ce.BankName,
                              BranchName = ce.BranchName,
                              IFSC = ce.IFSC,
                              PanCard = ce.PanCard,
                              DocumentPath = ce.DocumentPath
                          }).ToList()
                          .Select(d => new VendorModel()
                          {
                              ID = d.ID,
                              Name = d.Name,
                              Phone = d.Phone,
                              VendorType = d.VendorType,
                              ACName = d.ACName,
                              ACNumber = d.ACNumber,
                              BankName = d.BankName,
                              IFSC = d.IFSC,
                              PanCard = d.PanCard,
                              DocumentPath = d.DocumentPath
                          });
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(result.ToList());
            if (usertype == "Admin" || usertype == "SAdmin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }
        public ActionResult Create()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            VendorModel vendor = new VendorModel();
            vendor.VendorTypeList = new SelectList(db.VendorTypes.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    VendorType = a.VendorType1
                                }).ToList(), "ID", "VendorType");
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(vendor);
            if (usertype == "Admin" || usertype == "SAdmin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }

        [HttpPost]
        public async Task<ActionResult> Create(HttpPostedFileBase file, VendorModel vendorEntry)
        {
            VendorMaster _cEntry = new VendorMaster();
            if (ModelState.IsValid)
            {
                string dbSavePath = "";
                string path = "";
                if (file != null)
                {
                    string datetime = "V" + DateTime.Now.ToString("yyyyMMddHHmmss");
                    dbSavePath = "~/Images/" + datetime + file.FileName;
                    path = Server.MapPath(dbSavePath);
                }

                _cEntry.Name = vendorEntry.Name;
                _cEntry.Address = vendorEntry.Address;
                _cEntry.Phone = vendorEntry.Phone;
                _cEntry.VendorTypeID = vendorEntry.VendorTypeID;
                _cEntry.ACName = vendorEntry.ACName;
                _cEntry.ACNumber = vendorEntry.ACNumber;
                _cEntry.BankName = vendorEntry.BankName;
                _cEntry.IFSC = vendorEntry.IFSC;
                _cEntry.PanCard = vendorEntry.PanCard;
                _cEntry.DocumentPath = dbSavePath;
                _cEntry.BranchName = vendorEntry.BranchName;
                _cEntry.IsActive = true;
                _cEntry.CreatedBy = System.Web.HttpContext.Current.Session["UID"].ToString();
                _cEntry.CreatedDate = DateTime.Now;
                db.VendorMasters.Add(_cEntry);
                if (file != null)
                {
                    file.SaveAs(path);
                }
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            vendorEntry.VendorTypeList = new SelectList(db.VendorTypes.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    VendorType = a.VendorType1
                                }).ToList(), "ID", "VendorType");
            return View(vendorEntry);
        }

        public async Task<ActionResult> Edit(long? id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            VendorModel _cEntry = new VendorModel();
            var result = (from ce in db.VendorMasters
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              Name = ce.Name,
                              ACName = ce.ACName,
                              ACNumber = ce.ACNumber,
                              Address = ce.Address,
                              BankName = ce.BankName,
                              DocumentPath = ce.DocumentPath,
                              BranchName = ce.BranchName,
                              IFSC = ce.IFSC,
                              Phone = ce.Phone,
                              VendorTypeID = ce.VendorTypeID,
                              PanCard = ce.PanCard
                          }).ToList()
             .Select(d => new VendorModel()
             {
                 ID = d.ID,
                 Name = d.Name,
                 ACName = d.ACName,
                 ACNumber = d.ACNumber,
                 Address = d.Address,
                 BankName = d.BankName,
                 DocumentPath = d.DocumentPath,
                 BranchName = d.BranchName,
                 IFSC = d.IFSC,
                 Phone = d.Phone,
                 VendorTypeID = d.VendorTypeID,
                 PanCard = d.PanCard
             });
            _cEntry = result.FirstOrDefault();

            if (_cEntry == null)
            {
                return HttpNotFound();
            }
            _cEntry.VendorTypeList = new SelectList(db.VendorTypes.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    VendorType = a.VendorType1
                                }).ToList(), "ID", "VendorType");
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(_cEntry);
            if (usertype == "Admin" || usertype == "SAdmin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }

        [HttpPost]
        public async Task<ActionResult> Edit(HttpPostedFileBase file, VendorModel vendorEntry)
        {
            if (ModelState.IsValid)
            {
                string dbSavePath = "";
                if (file != null)
                {
                    string datetime = "V" + DateTime.Now.ToString("yyyyMMddHHmmss");
                    dbSavePath = "~/Images/" + datetime + file.FileName;
                    string path = Server.MapPath(dbSavePath);
                    file.SaveAs(path);
                }
                else
                {
                    dbSavePath = vendorEntry.DocumentPath;
                }
                VendorMaster _pDetail = await db.VendorMasters.FindAsync(vendorEntry.ID);
                _pDetail.ID = vendorEntry.ID;
                _pDetail.ACName = vendorEntry.ACName;
                _pDetail.ACNumber = vendorEntry.ACNumber;
                _pDetail.Address = vendorEntry.Address;
                _pDetail.BankName = vendorEntry.BankName;
                _pDetail.DocumentPath = dbSavePath;
                _pDetail.IFSC = vendorEntry.IFSC;
                _pDetail.Name = vendorEntry.Name;
                _pDetail.Phone = vendorEntry.Phone;
                _pDetail.VendorTypeID = vendorEntry.VendorTypeID;
                _pDetail.PanCard = vendorEntry.PanCard;
                _pDetail.BranchName = vendorEntry.BranchName;
                _pDetail.IsActive = true;
                db.Entry(_pDetail).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Delete(int id)
        {
            if (id == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            VendorMaster _cEntry = await db.VendorMasters.FindAsync(id);
            _cEntry.ID = id;
            _cEntry.IsActive = false;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Download(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var fPath = db.VendorMasters.Single(a => a.ID == id).DocumentPath;
            if (fPath != null)
            {
                if (fPath != "")
                {
                    WebClient req = new WebClient();
                    HttpResponse response = System.Web.HttpContext.Current.Response;
                    response.Clear();
                    response.ClearContent();
                    response.ClearHeaders();
                    response.Buffer = true;
                    response.AddHeader("Content-Disposition", "attachment;filename=\"" + Server.MapPath(fPath) + "\"");
                    byte[] data = req.DownloadData(Server.MapPath(fPath));
                    response.BinaryWrite(data);
                    response.End();
                }
            }

            var result = (from ce in db.VendorMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Name = ce.Name,
                              Phone = ce.Phone,
                              VendorType = ce.VendorType.VendorType1,
                              ACName = ce.ACName,
                              ACNumber = ce.ACNumber,
                              BankName = ce.BankName,
                              BranchName = ce.BranchName,
                              IFSC = ce.IFSC,
                              PanCard = ce.PanCard,
                              DocumentPath = ce.DocumentPath
                          }).ToList()
                          .Select(d => new VendorModel()
                          {
                              ID = d.ID,
                              Name = d.Name,
                              Phone = d.Phone,
                              VendorType = d.VendorType,
                              ACName = d.ACName,
                              ACNumber = d.ACNumber,
                              BankName = d.BankName,
                              IFSC = d.IFSC,
                              PanCard = d.PanCard,
                              DocumentPath = d.DocumentPath
                          });
            return RedirectToAction("Index");
        }
        
    }
}