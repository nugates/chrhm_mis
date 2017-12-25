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
using System.Data.SqlClient;
using System.Collections;
using System.Web.Script.Serialization;

namespace SKMISApplication.Controllers
{
    public class AC_AccountsEntryController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();

        // GET: AC_AccountsEntry
        public async Task<ActionResult> Index()
        {
            return View();
        }

        // GET: AC_AccountsEntry/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AC_AccountsEntry aC_AccountsEntry = await db.AC_AccountsEntry.FindAsync(id);
            if (aC_AccountsEntry == null)
            {
                return HttpNotFound();
            }
            return View(aC_AccountsEntry);
        }

        // GET: AC_AccountsEntry/Create
        public ActionResult Create()
        {
            ViewBag.CtgItemID = new SelectList(db.AC_CategoryItem, "ID", "CategoryItemName");
            ViewBag.UnitID = new SelectList(db.UnitMasters, "ID", "UnitName");
            ViewBag.VendorID = new SelectList(db.VendorMasters, "ID", "Name");
            return View();
        }

        // POST: AC_AccountsEntry/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "ID,BeneficiaryID,CtgItemID,UnitID,VendorID,Quantity,Rate,Amount,Remarks,EntryDate,CreatedBy,CreatedDate,UpdatedBy,UpdateDate,IsActive")] AC_AccountsEntry aC_AccountsEntry)
        {
            if (ModelState.IsValid)
            {
                db.AC_AccountsEntry.Add(aC_AccountsEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.CtgItemID = new SelectList(db.AC_CategoryItem, "ID", "CategoryItemName", aC_AccountsEntry.CtgItemID);
            ViewBag.UnitID = new SelectList(db.UnitMasters, "ID", "UnitName", aC_AccountsEntry.UnitID);
            ViewBag.VendorID = new SelectList(db.VendorMasters, "ID", "Name", aC_AccountsEntry.VendorID);
            return View(aC_AccountsEntry);
        }

        // GET: AC_AccountsEntry/Edit/5
        public async Task<ActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AC_AccountsEntry aC_AccountsEntry = await db.AC_AccountsEntry.FindAsync(id);
            if (aC_AccountsEntry == null)
            {
                return HttpNotFound();
            }
            ViewBag.CtgItemID = new SelectList(db.AC_CategoryItem, "ID", "CategoryItemName", aC_AccountsEntry.CtgItemID);
            ViewBag.UnitID = new SelectList(db.UnitMasters, "ID", "UnitName", aC_AccountsEntry.UnitID);
            ViewBag.VendorID = new SelectList(db.VendorMasters, "ID", "Name", aC_AccountsEntry.VendorID);
            return View(aC_AccountsEntry);
        }

        // POST: AC_AccountsEntry/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "ID,BeneficiaryID,CtgItemID,UnitID,VendorID,Quantity,Rate,Amount,Remarks,EntryDate,CreatedBy,CreatedDate,UpdatedBy,UpdateDate,IsActive")] AC_AccountsEntry aC_AccountsEntry)
        {
            if (ModelState.IsValid)
            {
                db.Entry(aC_AccountsEntry).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.CtgItemID = new SelectList(db.AC_CategoryItem, "ID", "CategoryItemName", aC_AccountsEntry.CtgItemID);
            ViewBag.UnitID = new SelectList(db.UnitMasters, "ID", "UnitName", aC_AccountsEntry.UnitID);
            ViewBag.VendorID = new SelectList(db.VendorMasters, "ID", "Name", aC_AccountsEntry.VendorID);
            return View(aC_AccountsEntry);
        }

        // GET: AC_AccountsEntry/Delete/5
        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AC_AccountsEntry aC_AccountsEntry = await db.AC_AccountsEntry.FindAsync(id);
            if (aC_AccountsEntry == null)
            {
                return HttpNotFound();
            }
            return View(aC_AccountsEntry);
        }

        // POST: AC_AccountsEntry/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(long id)
        {
            AC_AccountsEntry aC_AccountsEntry = await db.AC_AccountsEntry.FindAsync(id);
            db.AC_AccountsEntry.Remove(aC_AccountsEntry);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public JsonResult LoadTable2(string searchString)
        {
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            var idParam = new SqlParameter
            {
                ParameterName = "stringToFind",
                Value = searchString
            };

            var res = db.Database.SqlQuery<BeneficiaryEntryModel>
                ("exec BenificiaryAdvanceSearch @stringToFind ", idParam).ToList<BeneficiaryEntryModel>();

            //return View(res);
            return Json(res);
        }
        public ActionResult GetBeneficiaryDetails(string bid)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            AC_AccountsEntryModel accountsModel = new AC_AccountsEntryModel();
            int b_id = Convert.ToInt32(bid);

            var result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ID == b_id
                          select ge).ToList()
                              .Select(d => new AC_AccountsEntryModel()
                              {
                                  AllotmentNo = d.AllotmentNo,
                                  ConstituencyName = d.ConstituencyMaster.Constituency,
                                  ConstituencyID = (int)d.ConstituencyID,
                                  BeneficiaryID = (int)d.ID,
                                  BeneficiaryName = d.BeneficiaryName,
                                  GPU = d.GPUName.ToString(),
                                  EntryDate = DateTime.Now,
                                  Distance = "0" + " KM"
                              });
            accountsModel = result.FirstOrDefault();
                        
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View("Create",accountsModel);
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            return myView;
        }

        public JsonResult LoadAccountsEntryTable(string bid = null)
        {
            try
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();

                string jsonStr = GetAccountsItemDetails(bid);
                var cEntry = Json(jsonStr);
                dictionary.Add("data", cEntry);

                var vData = db.VendorMasters.Where(a => a.IsActive == true).Select(a =>
                                          new
                                          {
                                              ID = a.ID,
                                              Name = a.Name
                                          }).ToList();

                dictionary.Add("vdata", vData.OrderBy(h => h.Name));
                return Json(dictionary);
            }
            catch (Exception ex)
            {
                return Json("error");
            }
            
        }
        private string GetAccountsItemDetails(string bid)
        {
            DataSet ds = new DataSet();
            DBFunctions db = new DBFunctions();
            Hashtable ht = new Hashtable();
            ht.Clear();
            ds = db.SysFetchDataInDataSet("[GetItemsForAccountsEntry]", ht);

            DataTable dt = ds.Tables[0];
            string jsonStr = DataTableToJSONWithJavaScriptSerializer(dt);
            return jsonStr;
        }
        public string DataTableToJSONWithJavaScriptSerializer(DataTable table)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            foreach (DataRow row in table.Rows)
            {
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }
                parentRow.Add(childRow);
            }
            return jsSerializer.Serialize(parentRow);
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
