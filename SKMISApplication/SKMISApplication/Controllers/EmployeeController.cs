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
    public class EmployeeController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();

        // GET: Employee
        public async Task<ActionResult> Index()
        {
            EmployeeEntryModel _eEntry = new EmployeeEntryModel();
            var result = (from employee in db.EmployeeEntries
                          where employee.IsActive == true
                          select new
                          {
                              ID = employee.EmployeeId,
                              EmployeeName = employee.EmployeeName,
                              StoreId = employee.StoreId,
                              IsPresent = employee.IsPresent
                          }).ToList()
                          .Select(e => new EmployeeEntryModel()
                          {
                              EmployeeId = e.ID,
                              EmployeeName = e.EmployeeName,
                              StoreId = e.StoreId,
                              IsPresent = e.IsPresent
                          });
            return View(result.ToList());
        }

        // GET: Employee/Details/5
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EmployeeEntry employeeEntry = db.EmployeeEntries.Find(id);
            if (employeeEntry == null)
            {
                return HttpNotFound();
            }
            return View(employeeEntry);
        }

        // GET: Employee/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Employee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(EmployeeEntry employeeEntry)
        {
            if (ModelState.IsValid)
            {
                EmployeeEntry _eEntry = new EmployeeEntry();
                _eEntry.EmployeeName = employeeEntry.EmployeeName;
                _eEntry.StoreId = employeeEntry.StoreId;
                _eEntry.IsPresent = employeeEntry.IsPresent;
                _eEntry.IsActive = true;
                _eEntry.CreatedDate = DateTime.Now;
                db.EmployeeEntries.Add(_eEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(employeeEntry);
        }

        // GET: Employee/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EmployeeEntryModel _employeeEntry = new EmployeeEntryModel();
            var result = (from employee in db.EmployeeEntries
                          where employee.IsActive == true && employee.EmployeeId == id
                          select new
                          {
                              ID = employee.EmployeeId,
                              EmployeeName = employee.EmployeeName,
                              StoreId = employee.StoreId,
                              IsPresent = employee.IsPresent
                          }).ToList()
             .Select(e => new EmployeeEntryModel()
             {
                 EmployeeId = e.ID,
                 EmployeeName = e.EmployeeName,
                 StoreId = e.StoreId,
                 IsPresent = e.IsPresent
             });
            _employeeEntry = result.FirstOrDefault();
            if (_employeeEntry == null)
            {
                return HttpNotFound();
            }
            return View(_employeeEntry);
        }

        // POST: Employee/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(EmployeeEntry employeeEntry)
        {
            if (ModelState.IsValid)
            {
                EmployeeEntry _eEntry = await db.EmployeeEntries.FindAsync(employeeEntry.EmployeeId);
                _eEntry.EmployeeId = employeeEntry.EmployeeId;
                _eEntry.EmployeeName = employeeEntry.EmployeeName;
                _eEntry.StoreId = employeeEntry.StoreId;
                _eEntry.IsPresent = employeeEntry.IsPresent;
                _eEntry.UpdatedDate = DateTime.Now;
                db.Entry(_eEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(employeeEntry);
        }

        // GET: Employee/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EmployeeEntry employeeEntry = await db.EmployeeEntries.FindAsync(id);
            employeeEntry.EmployeeId = (long)id;
            employeeEntry.IsActive = false;
            employeeEntry.UpdatedDate = DateTime.Now;
            db.Entry(employeeEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // POST: Employee/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult>  DeleteConfirmed(long id)
        {
            EmployeeEntry employeeEntry = await db.EmployeeEntries.FindAsync(id);
            employeeEntry.EmployeeId = id;
            employeeEntry.IsActive = false;
            db.Entry(employeeEntry).State = EntityState.Modified;
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
