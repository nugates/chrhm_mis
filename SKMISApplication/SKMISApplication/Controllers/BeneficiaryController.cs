using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SKMISApplication.Models;
using System.Threading.Tasks;

namespace SKMISApplication.Controllers
{
    public class BeneficiaryController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();

        // GET: Beneficiary
        public async Task<ActionResult> Index()
        {
            BeneficiaryEntryModel _bEntry = new BeneficiaryEntryModel();
            var result = (from beneficiary in db.BeneficiaryEntries
                          where beneficiary.IsActive == true
                          select new
                          {
                              ID = beneficiary.BeneficiaryId,
                              BeneficiaryName = beneficiary.BeneficiaryName,
                              ConstituencyName = beneficiary.ConstituencyName,
                              VillageName = beneficiary.VillageName,
                              WardNo = beneficiary.WardNo,
                              HouseNo = beneficiary.HouseNo
                          }).ToList()
                          .Select(b => new BeneficiaryEntryModel()
                          {
                              BeneficiaryId = b.ID,
                              BeneficiaryName = b.BeneficiaryName,
                              ConstituencyName = b.ConstituencyName,
                              VillageName = b.VillageName,
                              WardNo = b.WardNo,
                              HouseNo = b.HouseNo
                          });
            return View(result.ToList());
        }

        // GET: Beneficiary/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BeneficiaryEntry beneficiaryEntry = db.BeneficiaryEntries.Find(id);
            if (beneficiaryEntry == null)
            {
                return HttpNotFound();
            }
            return View(beneficiaryEntry);
        }

        // GET: Beneficiary/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Beneficiary/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(BeneficiaryEntryModel beneficiaryEntry)
        {
            if (ModelState.IsValid)
            {
                BeneficiaryEntry _bEntry = new BeneficiaryEntry();
                _bEntry.BeneficiaryName = beneficiaryEntry.BeneficiaryName;
                _bEntry.ConstituencyName = beneficiaryEntry.ConstituencyName;
                _bEntry.VillageName = beneficiaryEntry.VillageName;
                _bEntry.HouseNo = beneficiaryEntry.HouseNo;
                _bEntry.WardNo = beneficiaryEntry.WardNo;
                _bEntry.IsActive = true;
                _bEntry.CreatedDate = DateTime.Now;
                db.BeneficiaryEntries.Add(_bEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(beneficiaryEntry);
        }

        // GET: Beneficiary/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BeneficiaryEntryModel _beneficiaryEntry = new BeneficiaryEntryModel();
            var result = (from beneficiary in db.BeneficiaryEntries
                          where beneficiary.IsActive == true && beneficiary.BeneficiaryId == id
                          select new
                          {
                              ID = beneficiary.BeneficiaryId,
                              BeneficiaryName = beneficiary.BeneficiaryName,
                              ConstituencyName = beneficiary.ConstituencyName,
                              VillageName = beneficiary.VillageName,
                              WardNo = beneficiary.WardNo,
                              HouseNo = beneficiary.HouseNo
                          }).ToList()
             .Select(b => new BeneficiaryEntryModel()
             {
                 BeneficiaryId = b.ID,
                 BeneficiaryName = b.BeneficiaryName,
                 ConstituencyName = b.ConstituencyName,
                 VillageName = b.VillageName,
                 WardNo = b.WardNo,
                 HouseNo = b.HouseNo
             });
            _beneficiaryEntry = result.FirstOrDefault();
            if (_beneficiaryEntry == null)
            {
                return HttpNotFound();
            }
            return View(_beneficiaryEntry);
        }

        // POST: Beneficiary/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(BeneficiaryEntry beneficiaryEntry)
        {
            if (ModelState.IsValid)
            {
                BeneficiaryEntry _bEntry = await db.BeneficiaryEntries.FindAsync(beneficiaryEntry.BeneficiaryId);
                _bEntry.BeneficiaryId = beneficiaryEntry.BeneficiaryId;
                _bEntry.ConstituencyName = beneficiaryEntry.ConstituencyName;
                _bEntry.VillageName = beneficiaryEntry.VillageName;
                _bEntry.HouseNo = beneficiaryEntry.HouseNo;
                _bEntry.WardNo = beneficiaryEntry.WardNo;
                _bEntry.UpdatedDate = DateTime.Now;
                db.Entry(_bEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(beneficiaryEntry);
        }

        // GET: Beneficiary/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BeneficiaryEntry beneficiaryEntry = await db.BeneficiaryEntries.FindAsync(id);
            beneficiaryEntry.BeneficiaryId = (long)id;
            beneficiaryEntry.IsActive = false;
            beneficiaryEntry.UpdatedDate = DateTime.Now;
            db.Entry(beneficiaryEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // POST: Beneficiary/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            BeneficiaryEntry beneficiaryEntry = await db.BeneficiaryEntries.FindAsync(id);
            beneficiaryEntry.BeneficiaryId = id;
            beneficiaryEntry.IsActive = false;
            db.Entry(beneficiaryEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
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
