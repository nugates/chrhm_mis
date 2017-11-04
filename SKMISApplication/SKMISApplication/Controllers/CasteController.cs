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
    public class CasteController : Controller
    {
        private SKMISEntities2 db = new SKMISEntities2();
        // GET: Constituency
        public ActionResult Index()
        {
            CasteMaster _cEntry = new CasteMaster();
            var result = (from ce in db.CasteMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Caste = ce.CasteName,
                              Description = ce.Description
                          }).ToList()
                          .Select(d => new CasteModel()
                          {
                              ID = d.ID,
                              Caste = d.Caste,
                              Description = d.Description
                          });
            return View(result.ToList());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(CasteModel casteEntry)
        {
            CasteMaster _cEntry = new CasteMaster();
            if (ModelState.IsValid)
            {
                _cEntry.CasteName = casteEntry.Caste;
                _cEntry.Description = casteEntry.Description;
                _cEntry.IsActive = true;
                db.CasteMasters.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(casteEntry);
        }

        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CasteModel _cEntry = new CasteModel();
            var result = (from ce in db.CasteMasters
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              CasteName = ce.CasteName,
                              Description = ce.Description
                          }).ToList()
             .Select(d => new CasteModel()
             {
                 ID = d.ID,
                 Caste = d.CasteName,
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
        public async Task<ActionResult> Edit(CasteModel casteEntry)
        {
            if (ModelState.IsValid)
            {
                CasteMaster _pDetail = await db.CasteMasters.FindAsync(casteEntry.ID);
                _pDetail.ID = casteEntry.ID;
                _pDetail.CasteName = casteEntry.Caste;
                _pDetail.Description = casteEntry.Description;
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

            CasteMaster _cEntry = await db.CasteMasters.FindAsync(id);
            _cEntry.ID = (long)id;
            _cEntry.IsActive = false;
            _cEntry.UpdatedDate = DateTime.Now;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}