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
    public class VendorController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();

        // GET: Vendor
        public async Task<ActionResult> Index()
        {
            VendorEntryModel _bEntry = new VendorEntryModel();
            var result = (from vendor in db.VendorEntries
                          where vendor.IsActive == true
                          select new
                          {
                              ID = vendor.VendorId,
                              VendorName = vendor.VendorName,
                              VendorAddress = vendor.VendorAddress,
                              City = vendor.City,
                              Country = vendor.Country
                          }).ToList()
                          .Select(v => new VendorEntryModel()
                          {
                              VendorId = v.ID,
                              VendorName = v.VendorName,
                              VendorAddress = v.VendorAddress,
                              City = v.City,
                              Country = v.Country
                          });
            return View(result.ToList());
        }

        // GET: Vendor/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VendorEntry vendorEntry = db.VendorEntries.Find(id);
            if (vendorEntry == null)
            {
                return HttpNotFound();
            }
            return View(vendorEntry);
        }

        // GET: Vendor/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Vendor/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(VendorEntry vendorEntry)
        {
            if (ModelState.IsValid)
            {
                VendorEntry _vEntry = new VendorEntry();
                _vEntry.VendorName = vendorEntry.VendorName;
                _vEntry.VendorAddress = vendorEntry.VendorAddress;
                _vEntry.Country = vendorEntry.Country;
                _vEntry.City = vendorEntry.City;
                _vEntry.IsActive = true;
                _vEntry.CreatedDate = DateTime.Now;
                db.VendorEntries.Add(_vEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(vendorEntry);
        }

        // GET: Vendor/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VendorEntryModel _vendorEntry = new VendorEntryModel();
            var result = (from vendor in db.VendorEntries
                          where vendor.IsActive == true && vendor.VendorId == id
                          select new
                          {
                              ID = vendor.VendorId,
                              VendorName = vendor.VendorName,
                              VendorAddress = vendor.VendorAddress,
                              City = vendor.City,
                              Country = vendor.Country
                          }).ToList()
             .Select(v => new VendorEntryModel()
             {
                 VendorId = v.ID,
                 VendorName = v.VendorName,
                 VendorAddress = v.VendorAddress,
                 City = v.City,
                 Country = v.Country
             });
            _vendorEntry = result.FirstOrDefault();
            if (_vendorEntry == null)
            {
                return HttpNotFound();
            }
            return View(_vendorEntry);
        }

        // POST: Vendor/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(VendorEntry vendorEntry)
        {
            if (ModelState.IsValid)
            {
                VendorEntry _vEntry = await db.VendorEntries.FindAsync(vendorEntry.VendorId);
                _vEntry.VendorId = vendorEntry.VendorId;
                _vEntry.VendorName = vendorEntry.VendorName;
                _vEntry.VendorAddress = vendorEntry.VendorAddress;
                _vEntry.City = vendorEntry.City;
                _vEntry.Country = vendorEntry.Country;
                _vEntry.UpdatedDate = DateTime.Now;
                db.Entry(_vEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(vendorEntry);
        }

        // GET: Vendor/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VendorEntry vendorEntry = await db.VendorEntries.FindAsync(id);
            vendorEntry.VendorId = (long)id;
            vendorEntry.IsActive = false;
            vendorEntry.UpdatedDate = DateTime.Now;
            db.Entry(vendorEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // POST: Vendor/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            VendorEntry vendorEntry = await db.VendorEntries.FindAsync(id);
            vendorEntry.VendorId = id;
            vendorEntry.IsActive = false;
            db.Entry(vendorEntry).State = EntityState.Modified;
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
