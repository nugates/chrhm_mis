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
    public class OccupationController : Controller
    {
        private SKMISEntities2 db = new SKMISEntities2();
        // GET: Constituency
        public ActionResult Index()
        {
            var result = (from ce in db.OccupationMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Occupation = ce.OccupationTitle,
                              Description = ce.Description
                          }).ToList()
                          .Select(d => new OccupationModel()
                          {
                              ID = d.ID,
                              Occupation = d.Occupation,
                              Description = d.Description
                          });
            return View(result.ToList());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(OccupationModel occupationEntry)
        {
            OccupationMaster _cEntry = new OccupationMaster();
            if (ModelState.IsValid)
            {
                _cEntry.OccupationTitle = occupationEntry.Occupation;
                _cEntry.Description = occupationEntry.Description;
                _cEntry.IsActive = true;
                db.OccupationMasters.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(occupationEntry);
        }

        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            OccupationModel _cEntry = new OccupationModel();
            var result = (from ce in db.OccupationMasters
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              Occupation = ce.OccupationTitle,
                              Description = ce.Description
                          }).ToList()
             .Select(d => new OccupationModel()
             {
                 ID = d.ID,
                 Occupation = d.Occupation,
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
        public async Task<ActionResult> Edit(OccupationModel occupationEntry)
        {
            if (ModelState.IsValid)
            {
                OccupationMaster _pDetail = await db.OccupationMasters.FindAsync(occupationEntry.ID);
                _pDetail.ID = occupationEntry.ID;
                _pDetail.OccupationTitle = occupationEntry.Occupation;
                _pDetail.Description = occupationEntry.Description;
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

            OccupationMaster _cEntry = await db.OccupationMasters.FindAsync(id);
            _cEntry.ID = (int)id;
            _cEntry.IsActive = false;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}