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
        private SKMISEntities2 db = new SKMISEntities2();
        // GET: Constituency
        public ActionResult Index()
        {
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
    }
}