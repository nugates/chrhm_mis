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
    public class AC_CategoryController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();

        // GET: AC_Category
        public async Task<ActionResult> Index()
        {
            List<AC_CategoryModel> _cEntry = new List<AC_CategoryModel>();
            try
            {
                if (System.Web.HttpContext.Current.Session["UserType"] == null)
                {
                    return RedirectToAction("Index", "Login");
                }

                var result = (from ce in db.AC_Category
                              where ce.IsActive == true
                              select ce).ToList()
                              .Select(d => new AC_CategoryModel()
                              {
                                  ID = d.ID,
                                  Category = d.Category,
                                  Description = d.Description
                              });
                _cEntry = result.ToList();
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
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }
            return View(_cEntry);

        }

        // GET: AC_Category/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AC_Category aC_Category = await db.AC_Category.FindAsync(id);
            if (aC_Category == null)
            {
                return HttpNotFound();
            }
            return View(aC_Category);
        }

        // GET: AC_Category/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AC_Category/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(AC_CategoryModel aC_Category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    AC_Category _cEntry = new AC_Category();

                    _cEntry.Category = aC_Category.Category;
                    _cEntry.Description = aC_Category.Description;
                    _cEntry.CreatedDate = DateTime.Now;
                    _cEntry.IsActive = true;
                    _cEntry.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());

                    db.AC_Category.Add(_cEntry);
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }

            return View();
        }

        // GET: AC_Category/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            AC_CategoryModel _cEntry = new AC_CategoryModel();
            try
            {
                if (System.Web.HttpContext.Current.Session["UserType"] == null)
                {
                    return RedirectToAction("Index", "Login");
                }
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                
                var result = (from ce in db.AC_Category
                              where ce.IsActive == true && ce.ID == id
                              select ce).ToList()
                                 .Select(d => new AC_CategoryModel()
                                 {
                                     ID = d.ID,
                                     Category = d.Category,
                                     Description = d.Description
                                 });
                _cEntry = result.FirstOrDefault();
                
                if (_cEntry == null)
                {
                    return HttpNotFound();
                }
                string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
                var myView = View(_cEntry);
                
                return myView;
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }

            return View();
        }

        // POST: AC_Category/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(AC_CategoryModel aC_Category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    AC_Category _pDetail = await db.AC_Category.FindAsync(aC_Category.ID);
                    _pDetail.ID = aC_Category.ID;
                    _pDetail.Category = aC_Category.Category;
                    _pDetail.Description = aC_Category.Description;
                    _pDetail.UpdatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
                    _pDetail.UpdatedDate = DateTime.Now;
                    _pDetail.IsActive = true;
                    db.Entry(_pDetail).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
                return View(aC_Category);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "Some problem occured, please try again later.");
            }
            return View();
        }

        // GET: AC_Category/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            AC_Category _cEntry = await db.AC_Category.FindAsync(id);
            _cEntry.ID = (int)id;
            _cEntry.IsActive = false;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
            //return View(aC_Category);
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
