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
    public class DriverController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();

        // GET: Driver
        public async Task<ActionResult> Index()
        {
            DriverEntryModel _dEntry = new DriverEntryModel();
            var result = (from dvr in db.DriverEntries
                          where dvr.IsActive == true
                          select dvr).ToList().OrderByDescending(a => a.DriverId)
                          .Select(b => new DriverEntryModel()
                          {
                              DriverId = b.DriverId,
                              DriverName = b.DriverName,
                              DriverContactNumber = b.DriverContactNumber,
                              WorkContactNumber = b.WorkContactNumber,
                              EmailID = b.EmailID,
                              ImagePath = b.ImagePath,
                              LicenseNo = b.LicenseNo,
                              LicenseExpiryDate = b.LicenseExpiryDate,
                              LicenseState = b.LicenseState,
                              DOB = b.DOB,
                              AlternateContactNo = b.AlternateContactNo,
                              DriverAddress = b.DriverAddress,
                              City = b.City,
                              Pin = b.Pin,
                              Misc = b.Misc
                          });
            return View(result.ToList());
            //return View(await db.DriverEntries.ToListAsync());
        }

        // GET: Driver/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DriverEntry driverEntry = await db.DriverEntries.FindAsync(id);
            if (driverEntry == null)
            {
                return HttpNotFound();
            }
            return View(driverEntry);
        }

        // GET: Driver/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Driver/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(DriverEntryModel driverEntry)
        {
            if (ModelState.IsValid)
            {
                DriverEntry _dEntry = new DriverEntry();
                _dEntry.DriverName = driverEntry.DriverName;
                _dEntry.DriverContactNumber = driverEntry.DriverContactNumber;
                _dEntry.WorkContactNumber = driverEntry.WorkContactNumber;
                _dEntry.EmailID = driverEntry.EmailID;
                _dEntry.ImagePath = driverEntry.ImagePath;
                _dEntry.LicenseNo = driverEntry.LicenseNo;
                _dEntry.LicenseExpiryDate = driverEntry.LicenseExpiryDate;
                _dEntry.LicenseState = driverEntry.LicenseState;
                _dEntry.DOB = driverEntry.DOB;
                _dEntry.AlternateContactNo = driverEntry.AlternateContactNo;
                _dEntry.DriverAddress = driverEntry.DriverAddress;
                _dEntry.City = driverEntry.City;
                _dEntry.Pin = driverEntry.Pin;
                _dEntry.Misc = driverEntry.Misc;
                _dEntry.IsActive = true;
                _dEntry.CreatedDate = DateTime.Now;
                db.DriverEntries.Add(_dEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(driverEntry);
        }

        // GET: Driver/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DriverEntryModel driverEntry = new DriverEntryModel();
            var result = (from dvr in db.DriverEntries
                          where dvr.IsActive == true && dvr.DriverId == id
                          select dvr).ToList()
             .Select(b => new DriverEntryModel()
             {
                 DriverId = b.DriverId,
                 DriverName = b.DriverName,
                 DriverContactNumber = b.DriverContactNumber,
                 WorkContactNumber = b.WorkContactNumber,
                 EmailID = b.EmailID,
                 ImagePath = b.ImagePath,
                 LicenseNo = b.LicenseNo,
                 LicenseExpiryDate = b.LicenseExpiryDate,
                 LicenseState = b.LicenseState,
                 DOB = b.DOB,
                 AlternateContactNo = b.AlternateContactNo,
                 DriverAddress = b.DriverAddress,
                 City = b.City,
                 Pin = b.Pin,
                 Misc = b.Misc
             });
            driverEntry = result.FirstOrDefault();
            if (driverEntry == null)
            {
                return HttpNotFound();
            }
            return View(driverEntry);
        }

        // POST: Driver/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(DriverEntryModel driverEntry)
        {
            if (ModelState.IsValid)
            {
                DriverEntry _dEntry = await db.DriverEntries.FindAsync(driverEntry.DriverId);
                _dEntry.DriverId = driverEntry.DriverId;
                _dEntry.DriverName = driverEntry.DriverName;
                _dEntry.DriverContactNumber = driverEntry.DriverContactNumber;
                _dEntry.WorkContactNumber = driverEntry.WorkContactNumber;
                _dEntry.EmailID = driverEntry.EmailID;
                _dEntry.ImagePath = driverEntry.ImagePath;
                _dEntry.LicenseNo = driverEntry.LicenseNo;
                _dEntry.LicenseExpiryDate = driverEntry.LicenseExpiryDate;
                _dEntry.LicenseState = driverEntry.LicenseState;
                _dEntry.DOB = driverEntry.DOB;
                _dEntry.AlternateContactNo = driverEntry.AlternateContactNo;
                _dEntry.DriverAddress = driverEntry.DriverAddress;
                _dEntry.City = driverEntry.City;
                _dEntry.Pin = driverEntry.Pin;
                _dEntry.Misc = driverEntry.Misc;
                _dEntry.UpdatedDate = DateTime.Now;
                db.Entry(_dEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(driverEntry);
        }

        // GET: Driver/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            DriverEntry _dvr = await db.DriverEntries.FindAsync(id);
            _dvr.DriverId = (long)id;
            _dvr.IsActive = false;
            db.Entry(_dvr).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");

        }

        // POST: Driver/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            DriverEntry driverEntry = await db.DriverEntries.FindAsync(id);
            db.DriverEntries.Remove(driverEntry);
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
