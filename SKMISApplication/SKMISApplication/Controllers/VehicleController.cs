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
    public class VehicleController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();

        // GET: Vehicle
        public async Task<ActionResult> Index()
        {
            VehicleEntryModel _vEntry = new VehicleEntryModel();
            var result = (from vehicle in db.VehicleEntries
                          where vehicle.IsActive == true
                          select new
                          {
                              ID = vehicle.VehicleId,
                              VehicleNo= vehicle.VehicleNo,
                              ConstituencyName = vehicle.ConstituencyName,
                              VehicleCharge = vehicle.VehicleCharge,
                              VendorId = vehicle.VendorId
                          }).ToList()
                          .Select(v => new VehicleEntryModel()
                          {
                              VehicleId = v.ID,
                              VehicleNo = v.VehicleNo,
                              ConstituencyName = v.ConstituencyName,
                              VehicleCharge = v.VehicleCharge,
                              VendorId = v.VendorId
                          });
            return View(result.ToList());
        }

        // GET: Vehicle/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VehicleEntry vehicleEntry = db.VehicleEntries.Find(id);
            if (vehicleEntry == null)
            {
                return HttpNotFound();
            }
            return View(vehicleEntry);
        }

        // GET: Vehicle/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Vehicle/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(VehicleEntry vehicleEntry)
        {
            if (ModelState.IsValid)
            {
                VehicleEntry _vEntry = new VehicleEntry();
                _vEntry.VehicleNo = vehicleEntry.VehicleNo;
                _vEntry.ConstituencyName = vehicleEntry.ConstituencyName;
                _vEntry.VehicleCharge = vehicleEntry.VehicleCharge;
                _vEntry.VendorId = vehicleEntry.VendorId;
                _vEntry.IsActive = true;
                _vEntry.CreatedDate = DateTime.Now;
                db.VehicleEntries.Add(_vEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(vehicleEntry);
        }

        // GET: Vehicle/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VehicleEntryModel _vehicleEntry = new VehicleEntryModel();
            var result = (from vehicle in db.VehicleEntries
                          where vehicle.IsActive == true && vehicle.VehicleId == id
                          select new
                          {
                              ID = vehicle.VehicleId,
                              VehicleNo = vehicle.VehicleNo,
                              ConstituencyName = vehicle.ConstituencyName,
                              VehicleCharge = vehicle.VehicleCharge,
                              VendorId = vehicle.VendorId
                          }).ToList()
             .Select(v => new VehicleEntryModel()
             {
                 VehicleId = v.ID,
                 VehicleNo = v.VehicleNo,
                 ConstituencyName = v.ConstituencyName,
                 VehicleCharge = v.VehicleCharge,
                 VendorId = v.VendorId
             });
            _vehicleEntry = result.FirstOrDefault();
            if (_vehicleEntry == null)
            {
                return HttpNotFound();
            }
            return View(_vehicleEntry);
        }

        // POST: Vehicle/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(VehicleEntry vehicleEntry)
        {
            if (ModelState.IsValid)
            {
                VehicleEntry _vEntry = await db.VehicleEntries.FindAsync(vehicleEntry.VehicleId);
                _vEntry.VehicleId = vehicleEntry.VehicleId;
                _vEntry.VehicleNo = vehicleEntry.VehicleNo;
                _vEntry.ConstituencyName = vehicleEntry.ConstituencyName;
                _vEntry.VehicleCharge = vehicleEntry.VehicleCharge;
                _vEntry.VendorId = vehicleEntry.VendorId;
                _vEntry.UpdatedDate = DateTime.Now;
                db.Entry(_vEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(vehicleEntry);
        }

        // GET: Vehicle/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VehicleEntry vehicleEntry = await db.VehicleEntries.FindAsync(id);
            vehicleEntry.VehicleId = (long)id;
            vehicleEntry.IsActive = false;
            vehicleEntry.UpdatedDate = DateTime.Now;
            db.Entry(vehicleEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // POST: Vehicle/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            VehicleEntry vehicleEntry = await db.VehicleEntries.FindAsync(id);
            vehicleEntry.VehicleId = id;
            vehicleEntry.IsActive = false;
            db.Entry(vehicleEntry).State = EntityState.Modified;
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
