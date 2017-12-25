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
    public class ConstituencyController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        // GET: Constituency
        public ActionResult Index()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (System.Web.HttpContext.Current.Session["UserType"].ToString() == "Admin")
            {
                return RedirectToAction("IndexAdmin");
            }
            ConstituencyModel _cEntry = new ConstituencyModel();
            var result = (from ce in db.ConstituencyMasters                          
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Constituency = ce.Constituency,
                              Description = ce.Description                              
                          }).ToList()
                          .Select(d => new ConstituencyModel()
                          {
                              ID = d.ID,
                              Constituency = d.Constituency,
                              Description = d.Description
                          });
            return View(result.ToList());
        }
        public ActionResult IndexAdmin()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ConstituencyModel _cEntry = new ConstituencyModel();
            var result = (from ce in db.ConstituencyMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Constituency = ce.Constituency,
                              Description = ce.Description
                          }).ToList()
                          .Select(d => new ConstituencyModel()
                          {
                              ID = d.ID,
                              Constituency = d.Constituency,
                              Description = d.Description
                          });
            return View(result.ToList());
        }

        public ActionResult Create()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(ConstituencyModel constituencyEntry)
        {
            ConstituencyMaster _cEntry = new ConstituencyMaster();
            if (ModelState.IsValid)
            {
                _cEntry.Constituency = constituencyEntry.Constituency;
                _cEntry.Description = constituencyEntry.Description;                
                _cEntry.IsActive = true;
                db.ConstituencyMasters.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(constituencyEntry);
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

            ConstituencyModel _cEntry = new ConstituencyModel();
            var result = (from ce in db.ConstituencyMasters 
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              Constituency = ce.Constituency,
                              Description = ce.Description                              
                          }).ToList()
             .Select(d => new ConstituencyModel()
             {
                 ID = d.ID,
                 Constituency = d.Constituency,
                 Description = d.Description
             });
            _cEntry = result.FirstOrDefault();
            if (_cEntry == null)
            {
                return HttpNotFound();
            }
            return View(_cEntry);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(ConstituencyModel constituencyEntry)
        {
            if (ModelState.IsValid)
            {
                ConstituencyMaster _pDetail = await db.ConstituencyMasters.FindAsync(constituencyEntry.ID);
                _pDetail.ID = constituencyEntry.ID;
                _pDetail.Constituency = constituencyEntry.Constituency;
                _pDetail.Description = constituencyEntry.Description;
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

            ConstituencyMaster _cEntry = await db.ConstituencyMasters.FindAsync(id);
            _cEntry.ID = (int)id;
            _cEntry.IsActive = false;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}