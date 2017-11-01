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
    public class DriverController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();

        // GET: Driver
        public async Task<ActionResult> Index()
        {
            DriverEntryModel _dEntry = new DriverEntryModel();
            var result = (from driver in db.DriverEntries
                          where driver.IsActive == true
                          select new
                          {
                              ID = driver.DriverId,
                              DriverName = driver.DriverName,
                              DriverContactNumber = driver.DriverContactNumber
                          }).ToList()
                          .Select(d => new DriverEntryModel()
                          {
                              DriverId = d.ID,
                              DriverName = d.DriverName,
                              DriverContactNumber = d.DriverContactNumber
                          });
            return View(result.ToList());
        }

        // GET: Driver/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DriverEntry driverEntry = db.DriverEntries.Find(id);
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
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(DriverEntryModel driverEntry)
        {
            if (ModelState.IsValid)
            {
                DriverEntry _dEntry = new DriverEntry();
                _dEntry.DriverName = driverEntry.DriverName;
                _dEntry.DriverContactNumber = driverEntry.DriverContactNumber;
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
            DriverEntryModel _driverEntry = new DriverEntryModel();
            var result = (from driver in db.DriverEntries
                          where driver.IsActive == true && driver.DriverId == id
                          select new
                          {
                              ID = driver.DriverId,
                              DriverName = driver.DriverName,
                              DriverContactNumber = driver.DriverContactNumber
                          }).ToList()
             .Select(d => new DriverEntryModel()
             {
                 DriverId = d.ID,
                 DriverName = d.DriverName,
                 DriverContactNumber = d.DriverContactNumber
             });
            _driverEntry = result.FirstOrDefault();
            if (_driverEntry == null)
            {
                return HttpNotFound();
            }
            return View(_driverEntry);
        }

        // POST: Driver/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(DriverEntry driverEntry)
        {
            if (ModelState.IsValid)
            {
                DriverEntry _dEntry = await db.DriverEntries.FindAsync(driverEntry.DriverId);
                _dEntry.DriverId = driverEntry.DriverId;
                _dEntry.DriverName = driverEntry.DriverName;
                _dEntry.DriverContactNumber = driverEntry.DriverContactNumber;
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
            DriverEntry driverEntry = await db.DriverEntries.FindAsync(id);
            driverEntry.DriverId = (long)id;
            driverEntry.IsActive = false;
            driverEntry.UpdatedDate = DateTime.Now;
            db.Entry(driverEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // POST: Driver/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            DriverEntry driverEntry = await db.DriverEntries.FindAsync(id);
            driverEntry.DriverId = id;
            driverEntry.IsActive = false;
            db.Entry(driverEntry).State = EntityState.Modified;
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
