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
    public class VehicleController : Controller
    {
        private SKMISEntities2 db = new SKMISEntities2();

        // GET: Vehicle
        public async Task<ActionResult> Index()
        {
            var result = (from veh in db.VehicleEntries
                          where veh.IsActive == true
                          select veh).ToList().OrderByDescending(a => a.VehicleId)
                          .Select(b => new VehicleEntryModel()
                          {
                              VehicleId = b.VehicleId,
                              VehicleNo = b.VehicleNo,
                              VechileMake = b.VechileMake,
                              Model = b.Model,
                              ModelYear = b.ModelYear,
                              FuelType = b.FuelType,
                              VendorID = b.VendorID,
                              PlateNo = b.PlateNo,
                              InsuranceName = b.InsuranceName,
                              PolicyNo = b.PolicyNo,
                              InsuranceExpiry = b.InsuranceExpiry,
                              VehicleColour = b.VehicleColour,
                              
                          });
            return View(result.ToList());
        }

        // GET: Vehicle/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VehicleEntry vehicleEntry = await db.VehicleEntries.FindAsync(id);
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
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "VehicleId,VehicleNo,ConstituencyName,VehicleCharge,VendorId,CreatedBy,CreatedDate,UpdatedBy,UpdatedDate,IsActive")] VehicleEntry vehicleEntry)
        {
            if (ModelState.IsValid)
            {
                db.VehicleEntries.Add(vehicleEntry);
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
            VehicleEntry vehicleEntry = await db.VehicleEntries.FindAsync(id);
            if (vehicleEntry == null)
            {
                return HttpNotFound();
            }
            return View(vehicleEntry);
        }

        // POST: Vehicle/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "VehicleId,VehicleNo,ConstituencyName,VehicleCharge,VendorId,CreatedBy,CreatedDate,UpdatedBy,UpdatedDate,IsActive")] VehicleEntry vehicleEntry)
        {
            if (ModelState.IsValid)
            {
                db.Entry(vehicleEntry).State = EntityState.Modified;
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
            if (vehicleEntry == null)
            {
                return HttpNotFound();
            }
            return View(vehicleEntry);
        }

        // POST: Vehicle/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            VehicleEntry vehicleEntry = await db.VehicleEntries.FindAsync(id);
            db.VehicleEntries.Remove(vehicleEntry);
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
