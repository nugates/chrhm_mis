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
    public class VendorEntryController : Controller
    {
        private SKMISEntities2 db = new SKMISEntities2();

        // GET: VendorEntry
        public async Task<ActionResult> Index()
        {
            VendorEntryModel _vEntry = new VendorEntryModel();
            var result = (from dvr in db.VendorEntries
                          where dvr.IsActive == true
                          select dvr).ToList().OrderByDescending(a => a.VendorId)
                          .Select(b => new VendorEntryModel()
                          {
                              VendorId = b.VendorId,
                              VendorName = b.VendorName,
                              VendorAddress = b.VendorAddress,
                              City = b.City,
                              Country = b.Country,
                              State = b.State,
                              PinCode = b.PinCode,
                              MobileNo = b.MobileNo,
                              PhoneNo = b.PhoneNo,
                              Fax = b.Fax,
                              Email = b.Email,
                              Website = b.Website,
                              Misc = b.Misc
                          });
            return View(result.ToList());
        }

        // GET: VendorEntry/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VendorEntry vendorEntry = await db.VendorEntries.FindAsync(id);
            if (vendorEntry == null)
            {
                return HttpNotFound();
            }
            return View(vendorEntry);
        }

        // GET: VendorEntry/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: VendorEntry/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(VendorEntryModel vendorEntry)
        {
            if (ModelState.IsValid)
            {
                VendorEntry _vEntry = new VendorEntry();
                _vEntry.VendorName = vendorEntry.VendorName;
                _vEntry.VendorAddress = vendorEntry.VendorAddress;
                _vEntry.City = vendorEntry.City;
                _vEntry.Country = vendorEntry.Country;
                _vEntry.State = vendorEntry.State;
                _vEntry.PinCode = vendorEntry.PinCode;
                _vEntry.MobileNo = vendorEntry.MobileNo;
                _vEntry.PhoneNo = vendorEntry.PhoneNo;
                _vEntry.Fax = vendorEntry.Fax;
                _vEntry.Email = vendorEntry.Email;
                _vEntry.Website = vendorEntry.Website;
                _vEntry.Misc = vendorEntry.Misc;
                _vEntry.IsActive = true;
                _vEntry.CreatedDate = DateTime.Now;
                db.VendorEntries.Add(_vEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(vendorEntry);
        }

        // GET: VendorEntry/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VendorEntryModel vEntry = new VendorEntryModel();
            var result = (from vnd in db.VendorEntries
                          where vnd.IsActive == true && vnd.VendorId == id
                          select vnd).ToList()
             .Select(b => new VendorEntryModel()
             {
                 VendorId = b.VendorId,
                 VendorName = b.VendorName,
                 VendorAddress = b.VendorAddress,
                 City = b.City,
                 State = b.State,
                 Country = b.Country,
                 PinCode = b.PinCode,
                 MobileNo = b.MobileNo,
                 PhoneNo = b.PhoneNo,
                 Fax = b.Fax,
                 Website = b.Website,
                 Email = b.Email,
                 Misc = b.Misc
             });
            vEntry = result.FirstOrDefault();
            if (vEntry == null)
            {
                return HttpNotFound();
            }
            return View(vEntry);
        }

        // POST: VendorEntry/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(VendorEntryModel vendorEntry)
        {
            if (ModelState.IsValid)
            {
                VendorEntry _vEntry = await db.VendorEntries.FindAsync(vendorEntry.VendorId);
                _vEntry.VendorId = vendorEntry.VendorId;
                _vEntry.VendorName = vendorEntry.VendorName;
                _vEntry.VendorAddress = vendorEntry.VendorAddress;
                _vEntry.City = vendorEntry.City;
                _vEntry.State = vendorEntry.State;
                _vEntry.Country = vendorEntry.Country;
                _vEntry.MobileNo = vendorEntry.MobileNo;
                _vEntry.PhoneNo = vendorEntry.PhoneNo;
                _vEntry.Fax = vendorEntry.Fax;
                _vEntry.PinCode = vendorEntry.PinCode;
                _vEntry.Email = vendorEntry.Email;
                _vEntry.Website = vendorEntry.Website;
                _vEntry.Misc = vendorEntry.Misc;
                _vEntry.UpdatedDate = DateTime.Now;
                db.Entry(_vEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(vendorEntry);
        }

        // GET: VendorEntry/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            VendorEntry _vdr = await db.VendorEntries.FindAsync(id);
            _vdr.VendorId = (long)id;
            _vdr.IsActive = false;
            db.Entry(_vdr).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // POST: VendorEntry/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            VendorEntry vendorEntry = await db.VendorEntries.FindAsync(id);
            db.VendorEntries.Remove(vendorEntry);
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
