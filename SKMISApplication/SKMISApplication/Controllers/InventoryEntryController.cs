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
    public class InventoryEntryController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        // GET: Constituency
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
            InventoryEntryModel _cEntry = new InventoryEntryModel();
            var result = (from ce in db.InventoryMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              ChallanNo = ce.ChallanNo,
                              InvoiceNo = ce.InvoiceNo,
                              ItemName = ce.ItemMaster.ItemName,
                              Quantity = ce.Quantity + "(" + ce.ItemMaster.UnitMaster.UnitName + ")",
                              VehicleNo = ce.VehicleNo,
                              StoreName = ce.StoreMaster.StoreName,
                              EntryDate = ce.CreatedDate
                          }).ToList()
                          .Select(d => new InventoryEntryModel()
                          {
                              ID = d.ID,
                              ChallanNo = d.ChallanNo,
                              InvoiceNo = d.InvoiceNo,
                              ItemName = d.ItemName,
                              QuantityView = d.Quantity,
                              VehicleNo = d.VehicleNo,
                              StoreName = d.StoreName,
                              DatetimeView =(DateTime)d.EntryDate,
                              EntryDate = d.EntryDate
                          });
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(result.ToList().OrderByDescending(c => c.DatetimeView));
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
            InventoryEntryModel _cEntry = new InventoryEntryModel();
            IEnumerable<InventoryEntryModel> result = new List<InventoryEntryModel>();
            int uid = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
            if (uid == 0)
            {
                result = (from ce in db.InventoryMasters
                          where ce.IsActive == true
                          select ce
                          //{
                          //    ID = ce.ID,
                          //    ChallanNo = ce.ChallanNo,
                          //    InvoiceNo = ce.InvoiceNo,
                          //    ItemName = ce.ItemMaster.ItemName,
                          //    Quantity = ce.Quantity + "(" + ce.ItemMaster.UnitMaster.UnitName + ")",
                          //    VehicleNo = ce.VehicleNo,
                          //    StoreName = ce.StoreMaster.StoreName,
                          //    EntryDate = ce.CreatedDate
                          //}
                          ).ToList().OrderByDescending(k=>k.CreatedDate)
                          .Select(d => new InventoryEntryModel()
                          {
                              ID = d.ID,
                              ChallanNo = d.ChallanNo,
                              InvoiceNo = d.InvoiceNo,
                              ItemName = d.ItemMaster.ItemName,
                              QuantityView = d.Quantity + "(" + d.ItemMaster.UnitMaster.UnitName + ")",
                              VehicleNo = d.VehicleNo,
                              StoreName = d.StoreMaster.StoreName,
                              DatetimeView = (DateTime)d.CreatedDate,
                              EntryDate = d.CreatedDate
                          });
            }
            else
            {
                result = (from ce in db.InventoryMasters
                          where ce.IsActive == true
                          select ce
                          //{
                          //    ID = ce.ID,
                          //    ChallanNo = ce.ChallanNo,
                          //    InvoiceNo = ce.InvoiceNo,
                          //    ItemName = ce.ItemMaster.ItemName,
                          //    Quantity = ce.Quantity + "(" + ce.ItemMaster.UnitMaster.UnitName + ")",
                          //    VehicleNo = ce.VehicleNo,
                          //    StoreName = ce.StoreMaster.StoreName,
                          //    EntryDate = ce.CreatedDate
                          //}
                          ).ToList().OrderByDescending(a => a.CreatedDate)
                          .Select(d => new InventoryEntryModel()
                          {
                              ID = d.ID,
                              ChallanNo = d.ChallanNo,
                              InvoiceNo = d.InvoiceNo,
                              ItemName = d.ItemMaster.ItemName,
                              QuantityView = d.Quantity +  " ("+d.ItemMaster.UnitMaster.UnitName+")",
                              VehicleNo = d.VehicleNo,
                              StoreName = d.StoreMaster.StoreName,
                              DatetimeView = d.CreatedDate,
                              EntryDate = d.CreatedDate
                          }).OrderByDescending(f=>f.EntryDate).ToList();
            }
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
            InventoryEntryModel inventoryEntryModel = new InventoryEntryModel();
            inventoryEntryModel.EntryDate = DateTime.Now;
            inventoryEntryModel.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    StoreName = a.StoreName
                                }).ToList(), "ID", "StoreName");
            inventoryEntryModel.ItemList = new SelectList(db.ItemMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                                }).ToList(), "ID", "ItemName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            inventoryEntryModel.StoreID = Convert.ToInt32(System.Web.HttpContext.Current.Session["StoreID"].ToString());
            var myView = View(inventoryEntryModel);
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

        public ActionResult Create_Admin()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            InventoryEntryModel inventoryEntryModel = new InventoryEntryModel();
            inventoryEntryModel.EntryDate = DateTime.Now;
            inventoryEntryModel.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    StoreName = a.StoreName
                                }).ToList(), "ID", "StoreName");
            inventoryEntryModel.ItemList = new SelectList(db.ItemMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                                }).ToList(), "ID", "ItemName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            inventoryEntryModel.StoreID = Convert.ToInt32(System.Web.HttpContext.Current.Session["StoreID"].ToString());
            var myView = View(inventoryEntryModel);
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
        public async Task<ActionResult> Create(InventoryEntryModel inventoryEntryModel)
        {
            InventoryMaster _cEntry = new InventoryMaster();
            
            if (ModelState.IsValid)
            {
                _cEntry.ItemID = inventoryEntryModel.ItemID;
                _cEntry.StoreID = Convert.ToInt32(System.Web.HttpContext.Current.Session["StoreID"].ToString());
                _cEntry.Quantity = inventoryEntryModel.Quantity;
                _cEntry.VehicleNo = inventoryEntryModel.VehicleNo;
                _cEntry.ChallanNo = inventoryEntryModel.ChallanNo;
                _cEntry.InvoiceNo = inventoryEntryModel.InvoiceNo;
                _cEntry.CreatedDate = inventoryEntryModel.EntryDate;
                _cEntry.Note = inventoryEntryModel.Note;
                _cEntry.IsActive = true;
                _cEntry.IsSyncFromCloud = false;
                _cEntry.IsSyncToCloud = false;
                db.InventoryMasters.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            inventoryEntryModel.EntryDate = DateTime.Now;
            inventoryEntryModel.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    StoreName = a.StoreName
                                }).ToList(), "ID", "StoreName");
            inventoryEntryModel.ItemList = new SelectList(db.ItemMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                                }).ToList(), "ID", "ItemName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(inventoryEntryModel);
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
        public async Task<ActionResult> Create_Admin(InventoryEntryModel inventoryEntryModel)
        {
            InventoryMaster _cEntry = new InventoryMaster();
            if (ModelState.IsValid)
            {
                _cEntry.ItemID = inventoryEntryModel.ItemID;
                _cEntry.StoreID = inventoryEntryModel.StoreID;
                _cEntry.Quantity = inventoryEntryModel.Quantity;
                _cEntry.VehicleNo = inventoryEntryModel.VehicleNo;
                _cEntry.ChallanNo = inventoryEntryModel.ChallanNo;
                _cEntry.InvoiceNo = inventoryEntryModel.InvoiceNo;
                _cEntry.CreatedDate = Convert.ToDateTime(inventoryEntryModel.EntryDate);
                _cEntry.Note = inventoryEntryModel.Note;
                _cEntry.IsActive = true;
                _cEntry.IsSyncFromCloud = false;
                _cEntry.IsSyncToCloud = false;
                db.InventoryMasters.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            inventoryEntryModel.EntryDate = DateTime.Now;
            inventoryEntryModel.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    StoreName = a.StoreName
                                }).ToList(), "ID", "StoreName");
            inventoryEntryModel.ItemList = new SelectList(db.ItemMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                                }).ToList(), "ID", "ItemName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(inventoryEntryModel);
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

            InventoryEntryModel _cEntry = new InventoryEntryModel();
            var result = (from ce in db.InventoryMasters
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              ChallanNo = ce.ChallanNo,
                              InvoiceNo = ce.InvoiceNo,
                              ItemID = ce.ItemID,
                              Quantity = ce.Quantity,
                              VehicleNo = ce.VehicleNo,
                              StoreID = ce.StoreID,
                              EntryDate = ce.CreatedDate,
                              Note = ce.Note
                          }).ToList()
                             .Select(d => new InventoryEntryModel()
                             {
                                 ID = d.ID,
                                 ChallanNo = d.ChallanNo,
                                 InvoiceNo = d.InvoiceNo,
                                 ItemID = (int)d.ItemID,
                                 Quantity = d.Quantity,
                                 VehicleNo = d.VehicleNo,
                                 StoreID = (int)d.StoreID,
                                 EntryDate = d.EntryDate,
                                 Note = d.Note
                             });
            _cEntry = result.FirstOrDefault();
            _cEntry.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    StoreName = a.StoreName
                                }).ToList(), "ID", "StoreName");
            _cEntry.ItemList = new SelectList(db.ItemMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ItemName = a.ItemName
                                }).ToList(), "ID", "ItemName");

            if (_cEntry == null)
            {
                return HttpNotFound();
            }
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
        public async Task<ActionResult> Edit_Admin(long? id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            InventoryEntryModel _cEntry = new InventoryEntryModel();
            var result = (from ce in db.InventoryMasters
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              ChallanNo = ce.ChallanNo,
                              InvoiceNo = ce.InvoiceNo,
                              ItemID = ce.ItemID,
                              Quantity = ce.Quantity,
                              VehicleNo = ce.VehicleNo,
                              StoreID = ce.StoreID,
                              EntryDate = ce.CreatedDate,
                              Note = ce.Note
                          }).ToList()
                             .Select(d => new InventoryEntryModel()
                             {
                                 ID = d.ID,
                                 ChallanNo = d.ChallanNo,
                                 InvoiceNo = d.InvoiceNo,
                                 ItemID = (int)d.ItemID,
                                 Quantity = d.Quantity,
                                 VehicleNo = d.VehicleNo,
                                 StoreID = (int)d.StoreID,
                                 EntryDate = d.EntryDate,
                                 Note = d.Note
                             });
            _cEntry = result.FirstOrDefault();
            _cEntry.StoreList = new SelectList(db.StoreMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    StoreName = a.StoreName
                                }).ToList(), "ID", "StoreName");
            _cEntry.ItemList = new SelectList(db.ItemMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ItemName = a.ItemName
                                }).ToList(), "ID", "ItemName");

            if (_cEntry == null)
            {
                return HttpNotFound();
            }
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
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(InventoryEntryModel inventoryEntryModel)
        {
            if (ModelState.IsValid)
            {
                InventoryMaster _pDetail = await db.InventoryMasters.FindAsync(inventoryEntryModel.ID);
                _pDetail.ID = inventoryEntryModel.ID;
                _pDetail.ChallanNo = inventoryEntryModel.ChallanNo;
                _pDetail.InvoiceNo = inventoryEntryModel.InvoiceNo;
                _pDetail.ItemID = inventoryEntryModel.ItemID;
                _pDetail.StoreID = Convert.ToInt32(System.Web.HttpContext.Current.Session["StoreID"].ToString());
                _pDetail.Quantity = inventoryEntryModel.Quantity;
                _pDetail.VehicleNo = inventoryEntryModel.VehicleNo;
                _pDetail.CreatedDate = Convert.ToDateTime(inventoryEntryModel.EntryDate);
                _pDetail.Note = inventoryEntryModel.Note;
                _pDetail.IsActive = true;
                db.Entry(_pDetail).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit_Admin(InventoryEntryModel inventoryEntryModel)
        {
            if (ModelState.IsValid)
            {
                InventoryMaster _pDetail = await db.InventoryMasters.FindAsync(inventoryEntryModel.ID);
                _pDetail.ID = inventoryEntryModel.ID;
                _pDetail.ChallanNo = inventoryEntryModel.ChallanNo;
                _pDetail.InvoiceNo = inventoryEntryModel.InvoiceNo;
                _pDetail.ItemID = inventoryEntryModel.ItemID;
                _pDetail.StoreID = inventoryEntryModel.StoreID;
                _pDetail.Quantity = inventoryEntryModel.Quantity;
                _pDetail.VehicleNo = inventoryEntryModel.VehicleNo;
                _pDetail.CreatedDate = Convert.ToDateTime(inventoryEntryModel.EntryDate);
                _pDetail.Note = inventoryEntryModel.Note;
                _pDetail.IsActive = true;
                db.Entry(_pDetail).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            InventoryMaster _cEntry = await db.InventoryMasters.FindAsync(id);
            _cEntry.ID = (int)id;
            _cEntry.IsActive = false;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}