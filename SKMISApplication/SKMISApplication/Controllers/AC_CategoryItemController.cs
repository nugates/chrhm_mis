using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SKMISApplication.Models;

namespace SKMISApplication.Controllers
{
    public class AC_CategoryItemController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();

        // GET: AC_CategoryItem
        public async Task<ActionResult> Index()
        {
            List<AC_CategoryItemModel> _cEntry = new List<AC_CategoryItemModel>();
            try
            {
                if (System.Web.HttpContext.Current.Session["UserType"] == null)
                {
                    return RedirectToAction("Index", "Login");
                }

                var result = (from ce in db.AC_CategoryItem
                              where ce.IsActive == true
                              select ce).ToList()
                              .Select(d => new AC_CategoryItemModel()
                              {
                                  ID = d.ID,
                                  CategoryItemName = d.CategoryItemName,
                                  //UnitID = d.UnitID != null ? d.UnitID : 0,
                                  UnitName = d.UnitID != null ? d.UnitMaster.UnitName : "",
                                  Description = d.Description
                              });
                _cEntry = result.ToList();
                string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
                var myView = View(result.ToList());

                return myView;
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }
            return View(_cEntry);
        }

        // GET: AC_CategoryItem/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AC_CategoryItem aC_CategoryItem = await db.AC_CategoryItem.FindAsync(id);
            if (aC_CategoryItem == null)
            {
                return HttpNotFound();
            }
            return View(aC_CategoryItem);
        }

        // GET: AC_CategoryItem/Create
        public ActionResult Create()
        {
            try
            {
                if (System.Web.HttpContext.Current.Session["UserType"] == null)
                {
                    return RedirectToAction("Index", "Login");
                }

                AC_CategoryItemModel _acItemModel = new AC_CategoryItemModel();
                _acItemModel.CategoryItemList = new SelectList(db.AC_Category.Where(b => b.IsActive == true).Select(a =>
                                      new
                                      {
                                          ID = a.ID,
                                          Category = a.Category
                                      }).ToList(), "ID", "Category");
                _acItemModel.UnitList= new SelectList(db.UnitMasters.Where(b => b.IsActive == true).Select(a =>
                                      new
                                      {
                                          ID = a.ID,
                                          UnitName = a.UnitName
                                      }).ToList(), "ID", "UnitName");


                return View(_acItemModel);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }

            return View();
        }

        // POST: AC_CategoryItem/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(AC_CategoryItemModel aC_CategoryItem)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    AC_CategoryItem _cEntry = new AC_CategoryItem();

                    _cEntry.CategoryID = aC_CategoryItem.CategoryID;
                    _cEntry.CategoryItemName = aC_CategoryItem.CategoryItemName;
                    _cEntry.UnitID = aC_CategoryItem.UnitID;
                    _cEntry.Description = aC_CategoryItem.Description;
                    _cEntry.CreatedDate = DateTime.Now;
                    _cEntry.IsActive = true;
                    _cEntry.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());

                    db.AC_CategoryItem.Add(_cEntry);
                    await db.SaveChangesAsync();
                    
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }
            AC_CategoryItemModel _acItemModel = new AC_CategoryItemModel();
            _acItemModel.CategoryItemList = new SelectList(db.AC_Category.Where(b => b.IsActive == true).Select(a =>
                                  new
                                  {
                                      ID = a.ID,
                                      Category = a.Category
                                  }).ToList(), "ID", "Category");

            _acItemModel.UnitList = new SelectList(db.UnitMasters.Where(b => b.IsActive == true).Select(a =>
                                       new
                                       {
                                           ID = a.ID,
                                           UnitName = a.UnitName
                                       }).ToList(), "ID", "UnitName");

            return View(_acItemModel);
        }

        // GET: AC_CategoryItem/Edit/5
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

            AC_CategoryItemModel _cEntry = new AC_CategoryItemModel();
            var result = (from ce in db.AC_CategoryItem
                          where ce.IsActive == true && ce.ID == id
                          select ce).ToList()
                             .Select(d => new AC_CategoryItemModel()
                             {
                                 ID = d.ID,
                                 CategoryItemName = d.CategoryItemName,
                                 Description = d.Description,
                                 CategoryID = d.CategoryID,
                                 UnitID = d.UnitID
                             });
            _cEntry = result.FirstOrDefault();
            _cEntry.CategoryItemList = new SelectList(db.AC_Category.Where(b => b.IsActive == true).Select(a =>
                                  new
                                  {
                                      ID = a.ID,
                                      Category = a.Category
                                  }).ToList(), "ID", "Category");

            _cEntry.UnitList = new SelectList(db.UnitMasters.Where(b => b.IsActive == true).Select(a =>
                                       new
                                       {
                                           ID = a.ID,
                                           UnitName = a.UnitName
                                       }).ToList(), "ID", "UnitName");

            if (_cEntry == null)
            {
                return HttpNotFound();
            }
           
            return View(_cEntry);
        }

        // POST: AC_CategoryItem/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(AC_CategoryItemModel aC_CategoryItem)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    AC_CategoryItem _pDetail = await db.AC_CategoryItem.FindAsync(aC_CategoryItem.ID);
                    _pDetail.ID = aC_CategoryItem.ID;
                    _pDetail.CategoryID = aC_CategoryItem.CategoryID;
                    _pDetail.CategoryItemName = aC_CategoryItem.CategoryItemName;
                    _pDetail.Description = aC_CategoryItem.Description;
                    _pDetail.IsActive = true;
                    _pDetail.UpdatedDate = DateTime.Now;
                    _pDetail.UpdatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
                    db.Entry(_pDetail).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
                return View(aC_CategoryItem);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }

            AC_CategoryItemModel _acItemModel = new AC_CategoryItemModel();
            _acItemModel.CategoryItemList = new SelectList(db.AC_Category.Where(b => b.IsActive == true).Select(a =>
                                  new
                                  {
                                      ID = a.ID,
                                      Category = a.Category
                                  }).ToList(), "ID", "Category");
            _acItemModel.UnitList = new SelectList(db.UnitMasters.Where(b => b.IsActive == true).Select(a =>
                                       new
                                       {
                                           ID = a.ID,
                                           UnitName = a.UnitName
                                       }).ToList(), "ID", "UnitName");

            return View(_acItemModel);
        }

        // GET: AC_CategoryItem/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            try
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }

                AC_CategoryItem _cEntry = await db.AC_CategoryItem.FindAsync(id);
                _cEntry.ID = (int)id;
                _cEntry.IsActive = false;
                db.Entry(_cEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();

                return RedirectToAction("Index");
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
