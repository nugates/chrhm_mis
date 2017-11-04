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
    public class QualificationController : Controller
    {
        private SKMISEntities2 db = new SKMISEntities2();
        // GET: Constituency
        public ActionResult Index()
        {
            var result = (from ce in db.QualificationMasters
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              Qualification = ce.QualificationName,
                              Description = ce.Description
                          }).ToList()
                          .Select(d => new QualificationModel()
                          {
                              ID = d.ID,
                              Qualification = d.Qualification,
                              Description = d.Description
                          });
            return View(result.ToList());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(QualificationModel qualificationEntry)
        {
            QualificationMaster _cEntry = new QualificationMaster();
            if (ModelState.IsValid)
            {
                _cEntry.QualificationName = qualificationEntry.Qualification;
                _cEntry.Description = qualificationEntry.Description;
                _cEntry.IsActive = true;
                db.QualificationMasters.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(qualificationEntry);
        }

        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            QualificationModel _cEntry = new QualificationModel();
            var result = (from ce in db.QualificationMasters
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              Qualification = ce.QualificationName,
                              Description = ce.Description
                          }).ToList()
             .Select(d => new QualificationModel()
             {
                 ID = d.ID,
                 Qualification = d.Qualification,
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
        public async Task<ActionResult> Edit(QualificationModel qualificationEntry)
        {
            if (ModelState.IsValid)
            {
                QualificationMaster _pDetail = await db.QualificationMasters.FindAsync(qualificationEntry.ID);
                _pDetail.ID = qualificationEntry.ID;
                _pDetail.QualificationName = qualificationEntry.Qualification;
                _pDetail.Description = qualificationEntry.Description;
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

            QualificationMaster _cEntry = await db.QualificationMasters.FindAsync(id);
            _cEntry.ID = (int)id;
            _cEntry.IsActive = false;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}