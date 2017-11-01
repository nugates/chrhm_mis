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
    public class InventoryController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();

        // GET: Inventory
        public async Task<ActionResult> Index()
        {
            InventoryEntryModel _iEntry = new InventoryEntryModel();
            var result = (from inventory in db.InventoryEntries
                          where inventory.IsActive == true
                          select new
                          {
                              ID = inventory.ItemId,
                              ItemName = inventory.ItemName,
                              Limit = inventory.Limit
                          }).ToList()
                          .Select(i => new InventoryEntryModel()
                          {
                              ItemId = i.ID,
                              ItemName = i.ItemName,
                              Limit = i.Limit
                          });
            return View(result.ToList());
        }

        // GET: Inventory/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InventoryEntry inventoryEntry = db.InventoryEntries.Find(id);
            if (inventoryEntry == null)
            {
                return HttpNotFound();
            }
            return View(inventoryEntry);
        }

        // GET: Inventory/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Inventory/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(InventoryEntry inventoryEntry)
        {
            if (ModelState.IsValid)
            {
                InventoryEntry _iEntry = new InventoryEntry();
                _iEntry.ItemName = inventoryEntry.ItemName;
                _iEntry.Limit = inventoryEntry.Limit;
                _iEntry.IsActive = true;
                _iEntry.CreatedDate = DateTime.Now;
                db.InventoryEntries.Add(_iEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(inventoryEntry);
        }

        // GET: Inventory/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InventoryEntryModel _inventoryEntry = new InventoryEntryModel();
            var result = (from inventory in db.InventoryEntries
                          where inventory.IsActive == true && inventory.ItemId == id
                          select new
                          {
                              ID = inventory.ItemId,
                              ItemName = inventory.ItemName,
                              Limit = inventory.Limit
                          }).ToList()
             .Select(i => new InventoryEntryModel()
             {
                 ItemId = i.ID,
                 ItemName = i.ItemName,
                 Limit = i.Limit
             });
            _inventoryEntry = result.FirstOrDefault();
            if (_inventoryEntry == null)
            {
                return HttpNotFound();
            }
            return View(_inventoryEntry);
        }

        // POST: Inventory/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(InventoryEntry inventoryEntry)
        {
            if (ModelState.IsValid)
            {
                InventoryEntry _iEntry = await db.InventoryEntries.FindAsync(inventoryEntry.ItemId);
                _iEntry.ItemId = inventoryEntry.ItemId;
                _iEntry.ItemName = inventoryEntry.ItemName;
                _iEntry.Limit = inventoryEntry.Limit;
                _iEntry.UpdatedDate = DateTime.Now;
                db.Entry(_iEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(inventoryEntry);
        }

        // GET: Inventory/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InventoryEntry inventoryEntry = await db.InventoryEntries.FindAsync(id);
            inventoryEntry.ItemId = (long)id;
            inventoryEntry.IsActive = false;
            inventoryEntry.UpdatedDate = DateTime.Now;
            db.Entry(inventoryEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // POST: Inventory/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            InventoryEntry inventoryEntry = await db.InventoryEntries.FindAsync(id);
            inventoryEntry.ItemId = id;
            inventoryEntry.IsActive = false;
            db.Entry(inventoryEntry).State = EntityState.Modified;
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
