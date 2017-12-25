using SKMISApplication.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SKMISApplication.Controllers
{
    public class ItemAllocationController : Controller
    {
        public static JavaScriptSerializer serializer = new JavaScriptSerializer();
        static Dictionary<string, object> dictionary = new Dictionary<string, object>();
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        // GET: ItemAllocation
        public ActionResult Index()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View();
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }

        public ActionResult AdvDetail(string searchString = null)
        {
            return View();
        }
        public ActionResult Create()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ItemAllocationModel itemAllocation = new ItemAllocationModel();
            itemAllocation.ConstituencyList = new SelectList(db.ConstituencyMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    Constituency = a.Constituency
                                }).ToList(), "ID", "Constituency");
            itemAllocation.BeneficiaryList = new SelectList(db.BeneficiaryEntries.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    FullName = a.BeneficiaryName
                                }).ToList(), "ID", "FullName");
            itemAllocation.ADCList = new SelectList(db.ADCMasters.Select(a =>
                    new
                    {
                        ID = a.ID,
                        ADC_DevSubDiv = a.ADC_DevSubDiv
                    }).ToList(), "ID", "ADC_DevSubDiv");
            //itemAllocation.GPUList = new SelectList(db.GPUMasters.Select(a =>
            //        new
            //        {
            //            ID = a.ID,
            //            GPUName = a.GPUName
            //        }).ToList(), "ID", "GPUName");
            itemAllocation.BlockList = new SelectList(db.BlockMasters.Select(a =>
                    new
                    {
                        ID = a.ID,
                        BlockName = a.BlockName
                    }).ToList(), "ID", "BlockName");


            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(itemAllocation);
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }
        [HttpPost]
        public async Task<ActionResult> ItemAllocationDetails(ItemAllocationModel itemallocationEntry)
        {
            if (itemallocationEntry.ItemID != 0 && itemallocationEntry.Quantity > 0)
            {
                Int32 item_id = Convert.ToInt32(itemallocationEntry.ItemID);
                Int32 b_id = Convert.ToInt32(itemallocationEntry.BeneficiaryID);
                var itemallocationsdata = (from ge in db.ItemAllocations
                                           where ge.BeneficiaryID == b_id && ge.ItemID == item_id && ge.IsActive == true
                                           select ge).ToList();

                var itemdata = (from ge in db.ItemMasters
                                where ge.ID == item_id
                                select ge).FirstOrDefault();

                decimal? limit = itemdata.Limit;
                decimal? issueqty = itemallocationsdata.Where(a => a.ItemID == item_id).Sum(b => b.Quantity);
                decimal? requestQty = Convert.ToDecimal(itemallocationEntry.Quantity);
                if (limit >= (issueqty + requestQty))
                {
                    ItemAllocation _cEntry = new ItemAllocation();
                    if (itemallocationEntry.Quantity > 0 && itemallocationEntry.ItemID != 0)
                    {
                        _cEntry.ConstituencyID = itemallocationEntry.ConstituencyID;
                        _cEntry.BeneficiaryID = itemallocationEntry.BeneficiaryID;
                        _cEntry.ItemID = itemallocationEntry.ItemID;
                        _cEntry.Quantity = itemallocationEntry.Quantity;
                        _cEntry.IssueDate = Convert.ToDateTime(itemallocationEntry.IssueDate);
                        _cEntry.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
                        _cEntry.CreatedDate = DateTime.Now;
                        _cEntry.VehicleNo = itemallocationEntry.VehicleNo;
                        _cEntry.OrderPlaceBy = itemallocationEntry.OrderPlaceBy;
                        _cEntry.ChallanNo = itemallocationEntry.ChallanNo;
                        _cEntry.IsActive = true;
                        db.ItemAllocations.Add(_cEntry);
                        await db.SaveChangesAsync();
                    }

                }
            }
            ItemAllocationModel itemAllocation = new ItemAllocationModel();
            //int c_id = Convert.ToInt32(cid);
            //int b_id = Convert.ToInt32(bid);
            var result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ConstituencyID == itemallocationEntry.ConstituencyID && ge.ID == itemallocationEntry.BeneficiaryID
                          select ge).ToList()
                              .Select(d => new ItemAllocationModel()
                              {
                                  ID = d.ID,
                                  ConstituencyName = d.ConstituencyMaster.Constituency,
                                  ConstituencyID = (int)d.ConstituencyID,
                                  BeneficiaryID = (int)d.ID,
                                  ItemID = 0,
                                  Quantity = 0,
                                  BeneficiaryName = d.BeneficiaryName,
                                  PHONE = d.MobileNo.ToString(),
                                  AADHAR_NO = d.AadharNo.ToString()
                              });
            itemAllocation = result.FirstOrDefault();
            itemAllocation.ItemList = new SelectList(db.ItemMasters.Select(a =>
                   new
                   {
                       ID = a.ID,
                       ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                   }).ToList(), "ID", "ItemName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(itemAllocation);
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }
        public JsonResult LoadTable(string cid, string formID, string adcid)        
        {
            dictionary = new Dictionary<string, object>();
            IEnumerable<ItemAllocationModel> result = new List<ItemAllocationModel>();

            //var idParam = new SqlParameter
            //{
            //    ParameterName = "stringToFind",
            //    Value = searchString
            //};

            //var res = db.Database.SqlQuery<BeneficiaryEntryModel>
            //    ("exec BenificiaryAdvanceSearch @stringToFind ", idParam).ToList<BeneficiaryEntryModel>();



            #region Old Search Query -- Select all commented code and Uncoment it once to get the working code
            if (formID != "" && cid == "" && adcid == "")
            {
                string form_ID = formID;
                result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.FormID == form_ID
                          select ge).ToList()
                             .Select(d => new ItemAllocationModel()
                             {
                                 ID = d.ID,
                                 BeneficiaryName = d.BeneficiaryName,
                                 FormID = d.FormID,
                                 ConstituencyName = d.ConstituencyMaster.Constituency,
                                 AllotmentNo = d.AllotmentNo
                             });
            }
            if (formID == "" && cid != "" && adcid == "")
            {
                Int32 c_id = Convert.ToInt32(cid);
                result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ConstituencyID == c_id
                          select ge).ToList()
                             .Select(d => new ItemAllocationModel()
                             {
                                 ID = d.ID,
                                 BeneficiaryName = d.BeneficiaryName,
                                 FormID = d.FormID,
                                 ConstituencyName = d.ConstituencyMaster.Constituency,
                                 AllotmentNo = d.AllotmentNo
                             });
            }
            if (formID == "" && cid == "" && adcid != "")
            {
                Int32 adc_id = Convert.ToInt32(adcid);
                result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ADCID == adc_id
                          select ge).ToList()
                             .Select(d => new ItemAllocationModel()
                             {
                                 ID = d.ID,
                                 BeneficiaryName = d.BeneficiaryName,
                                 FormID = d.FormID,
                                 ConstituencyName = d.ConstituencyMaster.Constituency,
                                 AllotmentNo = d.AllotmentNo
                             });
            }
            

            if (formID != "" && cid != "" && adcid == "")
            {
                string form_ID = formID;
                Int32 c_id = Convert.ToInt32(cid);
                result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.FormID == form_ID && ge.ConstituencyID == c_id
                          select ge).ToList()
                             .Select(d => new ItemAllocationModel()
                             {
                                 ID = d.ID,
                                 BeneficiaryName = d.BeneficiaryName,
                                 FormID = d.FormID,
                                 ConstituencyName = d.ConstituencyMaster.Constituency,
                                 AllotmentNo = d.AllotmentNo
                             });
            }
            if (formID != "" && cid == "" && adcid != "")
            {
                string form_ID = formID;
                Int32 adc_id = Convert.ToInt32(adcid);
                result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.FormID == form_ID && ge.ADCID == adc_id
                          select ge).ToList()
                             .Select(d => new ItemAllocationModel()
                             {
                                 ID = d.ID,
                                 BeneficiaryName = d.BeneficiaryName,
                                 FormID = d.FormID,
                                 ConstituencyName = d.ConstituencyMaster.Constituency,
                                 AllotmentNo = d.AllotmentNo
                             });
            }
            
            if (formID != "" && cid != "" && adcid != "")
            {
                string form_ID = formID;
                Int32 c_id = Convert.ToInt32(cid);
                Int32 adc_id = Convert.ToInt32(adcid);
                result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.FormID == form_ID && ge.ConstituencyID == c_id && ge.ADCID == adc_id
                          select ge).ToList()
                             .Select(d => new ItemAllocationModel()
                             {
                                 ID = d.ID,
                                 BeneficiaryName = d.BeneficiaryName,
                                 FormID = d.FormID,
                                 ConstituencyName = d.ConstituencyMaster.Constituency,
                                 AllotmentNo = d.AllotmentNo
                             });
            }
           
            #endregion

            return Json(result);
        }
        public ActionResult ItemAllocationDetails(string cid, string bid)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (System.Web.HttpContext.Current.Session["UserType"].ToString() != "Admin")
            {
                return RedirectToAction("ItemAllocationDetailsNonAdmin", new { cid = cid, bid = bid });
            }
            ItemAllocationModel itemAllocation = new ItemAllocationModel();
            //int c_id = Convert.ToInt32(cid);
            int b_id = Convert.ToInt32(bid);

            var result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ID == b_id
                          select ge).ToList()
                              .Select(d => new ItemAllocationModel()
                              {
                                  ID = d.ID,
                                  FormID = d.FormID,
                                  AllotmentNo = d.AllotmentNo,
                                  ConstituencyName = d.ConstituencyMaster.Constituency,
                                  ConstituencyID = (int)d.ConstituencyID,
                                  BeneficiaryID = (int)d.ID,
                                  BeneficiaryName = d.BeneficiaryName,
                                  PHONE = d.MobileNo.ToString(),
                                  AADHAR_NO = d.AadharNo.ToString(),
                                  IssueDate = DateTime.Now
                              });
            itemAllocation = result.FirstOrDefault();
            itemAllocation.ItemList = new SelectList(db.ItemMasters.Select(a =>
                   new
                   {
                       ID = a.ID,
                       ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                   }).ToList(), "ID", "ItemName");

           
            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(itemAllocation);
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }

        //public JsonResult LoadAllocationTable(string cid, string bid)
        //{
        //    dictionary = new Dictionary<string, object>();
        //    Int32 c_id = Convert.ToInt32(cid);
        //    Int32 b_id = Convert.ToInt32(bid);
        //    IEnumerable<ItemAllocationModel> result = new List<ItemAllocationModel>();
        //    result = (from ge in db.ItemAllocations
        //              where ge.ConstituencyID == c_id && ge.BeneficiaryID == b_id
        //              select ge).ToList()
        //                 .Select(d => new ItemAllocationModel()
        //                 {
        //                     ID = d.ID,
        //                     ItemName = d.ItemMaster.ItemName,
        //                     ViewQuantity = d.Quantity.ToString() + "(" + d.ItemMaster.UnitMaster.UnitName + ")",
        //                     issuedateView = d.IssueDate
        //                 });
        //    return Json(result);
        //}
        public ActionResult LoadAllocationTable(string bid = null)
        {
            if (System.Web.HttpContext.Current.Session["UserType"].ToString() == "Admin")
            {
                return RedirectToAction("AdvDetail_Admin", new { bid = bid });
            }
            
            string jsonStr = GetItemAllocationDetails(bid);
            var cEntry = Json(jsonStr);

            return cEntry;
        }

        private string GetItemAllocationDetails(string bid)
        {
            DataSet ds = new DataSet();
            DBFunctions db = new DBFunctions();
            Hashtable ht = new Hashtable();
            ht.Clear();
            ht.Add("bid", bid.ToString());
            ds = db.SysFetchDataInDataSet("[GetItemDetailsList]", ht);

            DataTable dt = ds.Tables[0];
            string jsonStr = DataTableToJSONWithJavaScriptSerializer(dt);
            return jsonStr;
        }

        [HttpPost]
        public ActionResult SaveItemForBeneficiary(List<ItemAllocationModel> Items)
        {
            List<ItemAllocation> _itemAllList = new List<ItemAllocation>();

            foreach (var item in Items)
            {
                ItemAllocation _itemAll = new ItemAllocation();
                _itemAll.ItemID = item.ItemID;
                _itemAll.BeneficiaryID = item.BeneficiaryID;
                _itemAll.ChallanNo = item.ChallanNo;
                _itemAll.ConstituencyID = item.ConstituencyID;
                _itemAll.IssueDate = item.IssueDate;
                _itemAll.OrderPlaceBy = item.OrderPlaceBy;
                _itemAll.Quantity = item.Quantity;
                _itemAll.VehicleNo = item.VehicleNo;
                _itemAll.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
                _itemAll.CreatedDate = DateTime.Now;
                _itemAll.IsActive = true;
                _itemAll.IsSyncFromCloud = false;
                _itemAll.IsSyncToCloud = false;

                _itemAllList.Add(_itemAll);
            }
            db.ItemAllocations.AddRange(_itemAllList);
            db.SaveChanges();

            //string jsonStr = GetItemAllocationDetails(Items.Select(a=>a.BeneficiaryID).FirstOrDefault().ToString());
            return Json("success");
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

        //NOTE COMMENTED BY SATYAM OLD LOAD ALLOCATION TABLE METHOD
        public string LoadAllocationTableEstoreView(string cid, string bid)
        {
            dictionary = new Dictionary<string, object>();
            Int32 c_id = Convert.ToInt32(cid);
            Int32 b_id = Convert.ToInt32(bid);
            List<ItemAllocationModel> result = new List<ItemAllocationModel>();
            int uid = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
            if (uid == 0)
            {
                var res = (from ge in db.ItemAllocations
                           where ge.ConstituencyID == c_id && ge.BeneficiaryID == b_id && ge.IsActive == true
                           group ge by ge.ItemID into b
                           select new { ItemID = b.Key, ItemName = b.Select(d => d.ItemMaster.ItemName), TotalQuantity = b.Sum(d => d.Quantity), Due = ((b.Select(s => s.ItemMaster.Limit).FirstOrDefault()) - b.Sum(d => d.Quantity)) });
                foreach (var r in res)
                {
                    ItemAllocationModel im = new ItemAllocationModel();
                    im.ItemID = (int)r.ItemID;
                    im.ItemName = r.ItemName.FirstOrDefault();
                    im.TotalQty = r.TotalQuantity.ToString();
                    im.QtyDue = r.Due.ToString();
                    result.Add(im);
                }

            }
            else
            {
                var res = (from ge in db.ItemAllocations
                           where ge.ConstituencyID == c_id && ge.BeneficiaryID == b_id && ge.IsActive == true
                           group ge by ge.ItemID into b
                           select new { ItemID = b.Key, ItemName = b.Select(d => d.ItemMaster.ItemName), TotalQuantity = b.Sum(d => d.Quantity), Due = ((b.Select(s => s.ItemMaster.Limit).FirstOrDefault()) - b.Sum(d => d.Quantity)) });
                foreach (var r in res)
                {
                    ItemAllocationModel im = new ItemAllocationModel();
                    im.ItemID = (int)r.ItemID;
                    im.ItemName = r.ItemName.FirstOrDefault();
                    im.TotalQty = r.TotalQuantity.ToString();
                    im.QtyDue = r.Due.ToString();
                    result.Add(im);
                }
            }


            serializer.MaxJsonLength = 1000000000;
            dictionary.Add("data", result);
            return serializer.Serialize(dictionary);
            //return Json(result);
        }

        public string LoadAllocationTableChild(string itemid, string cid, string bid)
        {
            dictionary = new Dictionary<string, object>();
            Int32 c_id = Convert.ToInt32(cid);
            Int32 b_id = Convert.ToInt32(bid);
            Int32 item_id = Convert.ToInt32(itemid);

            IEnumerable<ItemAllocationModel> result = new List<ItemAllocationModel>();
            int uid = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
            if (uid == 0)
            {
                result = (from ge in db.ItemAllocations
                          where ge.ConstituencyID == c_id && ge.BeneficiaryID == b_id && ge.ItemID == item_id && ge.IsActive == true
                          select ge).ToList()
                         .Select(d => new ItemAllocationModel()
                         {
                             ID = d.ID,
                             ItemID = (int)d.ItemID,
                             ItemName = d.ItemMaster.ItemName,
                             ViewQuantity = d.Quantity.ToString() + "(" + d.ItemMaster.UnitMaster.UnitName + ")",
                             issuedateView = d.IssueDate
                         });
            }
            else
            {
                result = (from ge in db.ItemAllocations
                          where ge.ConstituencyID == c_id && ge.BeneficiaryID == b_id && ge.ItemID == item_id && ge.IsActive == true
                          select ge).ToList()
                         .Select(d => new ItemAllocationModel()
                         {
                             ID = d.ID,
                             ItemID = (int)d.ItemID,
                             ItemName = d.ItemMaster.ItemName,
                             ViewQuantity = d.Quantity.ToString() + "(" + d.ItemMaster.UnitMaster.UnitName + ")",
                             issuedateView = d.IssueDate
                         });
            }

            serializer.MaxJsonLength = 1000000000;
            dictionary.Add("data", result.OrderByDescending(a => a.issuedateView));
            return serializer.Serialize(dictionary);
            //return Json(result);
        }

        public JsonResult CheckQty(string itemid, string bid, string qty)
        {
            List<string> result = new List<string>();
            if (itemid == "" || qty == "")
            {
                result.Add("Please check Item Name and qty.");
            }
            else
            {
                if (Convert.ToDecimal(qty) > 0)
                {
                    dictionary = new Dictionary<string, object>();
                    Int32 item_id = Convert.ToInt32(itemid);
                    Int32 b_id = Convert.ToInt32(bid);
                    //List<ItemAllocationModel> result = new List<ItemAllocationModel>();

                    var itemallocationsdata = (from ge in db.ItemAllocations
                                               where ge.BeneficiaryID == b_id && ge.ItemID == item_id && ge.IsActive == true
                                               select ge).ToList();

                    var itemdata = (from ge in db.ItemMasters
                                    where ge.ID == item_id
                                    select ge).FirstOrDefault();

                    decimal? limit = itemdata.Limit;
                    decimal? issueqty = itemallocationsdata.Where(a => a.ItemID == item_id).Sum(b => b.Quantity);
                    decimal? requestQty = Convert.ToDecimal(qty);
                    if (limit < (issueqty + requestQty))
                    {
                        result.Add("exceed the limit, Total Limit = " + limit + ", Qty. issued =" + issueqty + "");

                    }
                }
                else
                {
                    result.Add("qty. should greater then 0");
                }
            }
            return Json(result);
        }

        public JsonResult CheckLimit(string itemid, string bid)
        {
            List<LimitCheck> cl = new List<LimitCheck>();

            LimitCheck lc = new LimitCheck();
            //List<string> result = new List<string>();
            if (itemid == "")
            {
                lc.Error = "Please check Item Name";
            }
            else
            {
                dictionary = new Dictionary<string, object>();
                Int32 item_id = Convert.ToInt32(itemid);
                Int32 b_id = Convert.ToInt32(bid);

                var itemallocationsdata = (from ge in db.ItemAllocations
                                           where ge.BeneficiaryID == b_id && ge.ItemID == item_id && ge.IsActive == true
                                           select ge).ToList();

                var itemdata = (from ge in db.ItemMasters
                                where ge.ID == item_id
                                select ge).FirstOrDefault();

                decimal? limit = itemdata.Limit;
                decimal? issueqty = itemallocationsdata.Where(a => a.ItemID == item_id).Sum(b => b.Quantity);

                //string notes = "Total Limit of " + itemdata.ItemName + ":" + limit + " (" + itemdata.UnitMaster.UnitName + "), Total Issued " + issueqty + " (" + itemdata.UnitMaster.UnitName + "), Due " + (limit - issueqty) + " (" + itemdata.UnitMaster.UnitName + ")";
                lc.limitName = "Limit";
                lc.limitValue = Convert.ToString(limit) + itemdata.UnitMaster.UnitName;
                lc.issueqtyName = "Issued Qty.";
                lc.issueqtyValue = Convert.ToString(issueqty) + itemdata.UnitMaster.UnitName;
                lc.DueName = "Due";
                lc.DueValue = Convert.ToString(limit - issueqty) + itemdata.UnitMaster.UnitName;
            }
            cl.Add(lc);
            return Json(cl);
        }

        public async Task<ActionResult> Delete(long? id, string cid, string bid)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            ItemAllocation _cEntry = await db.ItemAllocations.FindAsync(id);
            _cEntry.ID = (int)id;
            _cEntry.IsActive = false;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("ItemAllocationDetails", new { cid = cid, bid = bid });
        }

        public ActionResult ItemAllocationDetailsNonAdmin(string cid, string bid)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ItemAllocationModel itemAllocation = new ItemAllocationModel();
            //int c_id = Convert.ToInt32(cid);
            int b_id = Convert.ToInt32(bid);
            var result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ID == b_id
                          select ge).ToList()
                              .Select(d => new ItemAllocationModel()
                              {
                                  ID = d.ID,
                                  FormID = d.FormID,
                                  AllotmentNo = d.AllotmentNo,
                                  ConstituencyName = d.ConstituencyMaster.Constituency,
                                  ConstituencyID = (int)d.ConstituencyID,
                                  BeneficiaryID = (int)d.ID,
                                  BeneficiaryName = d.BeneficiaryName,
                                  PHONE = d.MobileNo.ToString(),
                                  AADHAR_NO = d.AadharNo.ToString(),
                                  IssueDate = DateTime.Now
                              });
            itemAllocation = result.FirstOrDefault();
            itemAllocation.ItemList = new SelectList(db.ItemMasters.Select(a =>
                   new
                   {
                       ID = a.ID,
                       ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                   }).ToList(), "ID", "ItemName");

            //itemAllocation.UnitList = new SelectList(db.UnitMasters.Select(a =>
            //       new
            //       {
            //           ID = a.ID,
            //           UnitName = a.UnitName
            //       }).ToList(), "ID", "UnitName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(itemAllocation);
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }
        [HttpPost]
        public async Task<ActionResult> ItemAllocationDetailsNonAdmin(ItemAllocationModel itemallocationEntry)
        {
            if (itemallocationEntry.ItemID != 0 && itemallocationEntry.Quantity > 0)
            {
                Int32 item_id = Convert.ToInt32(itemallocationEntry.ItemID);
                Int32 b_id = Convert.ToInt32(itemallocationEntry.BeneficiaryID);
                var itemallocationsdata = (from ge in db.ItemAllocations
                                           where ge.BeneficiaryID == b_id && ge.ItemID == item_id
                                           select ge).ToList();

                var itemdata = (from ge in db.ItemMasters
                                where ge.ID == item_id
                                select ge).FirstOrDefault();

                decimal? limit = itemdata.Limit;
                decimal? issueqty = itemallocationsdata.Where(a => a.ItemID == item_id).Sum(b => b.Quantity);
                decimal? requestQty = Convert.ToDecimal(itemallocationEntry.Quantity);
                if (limit >= (issueqty + requestQty))
                {
                    ItemAllocation _cEntry = new ItemAllocation();
                    if (itemallocationEntry.Quantity > 0 && itemallocationEntry.ItemID != 0)
                    {
                        _cEntry.ConstituencyID = itemallocationEntry.ConstituencyID;
                        _cEntry.BeneficiaryID = itemallocationEntry.BeneficiaryID;
                        _cEntry.ItemID = itemallocationEntry.ItemID;
                        _cEntry.Quantity = itemallocationEntry.Quantity;
                        _cEntry.IssueDate = itemallocationEntry.IssueDate;
                        _cEntry.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"].ToString());
                        _cEntry.CreatedDate = DateTime.Now;
                        _cEntry.VehicleNo = itemallocationEntry.VehicleNo;
                        _cEntry.OrderPlaceBy = itemallocationEntry.OrderPlaceBy;
                        _cEntry.ChallanNo = itemallocationEntry.ChallanNo;
                        _cEntry.IsActive = true;
                        db.ItemAllocations.Add(_cEntry);
                        await db.SaveChangesAsync();
                    }

                }
            }
            ItemAllocationModel itemAllocation = new ItemAllocationModel();
            //int c_id = Convert.ToInt32(cid);
            //int b_id = Convert.ToInt32(bid);
            var result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ConstituencyID == itemallocationEntry.ConstituencyID && ge.ID == itemallocationEntry.BeneficiaryID
                          select ge).ToList()
                              .Select(d => new ItemAllocationModel()
                              {
                                  ID = d.ID,
                                  ConstituencyName = d.ConstituencyMaster.Constituency,
                                  ConstituencyID = (int)d.ConstituencyID,
                                  BeneficiaryID = (int)d.ID,
                                  ItemID = 0,
                                  Quantity = 0,
                                  BeneficiaryName = d.BeneficiaryName,
                                  PHONE = d.MobileNo.ToString(),
                                  AADHAR_NO = d.AadharNo.ToString()
                              });
            itemAllocation = result.FirstOrDefault();
            itemAllocation.ItemList = new SelectList(db.ItemMasters.Select(a =>
                   new
                   {
                       ID = a.ID,
                       ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                   }).ToList(), "ID", "ItemName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(itemAllocation);
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
        }
		public async Task<ActionResult> EStoreView(string bid)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ItemAllocationModel itemAllocation = new ItemAllocationModel();
            //int c_id = Convert.ToInt32(cid);
            int b_id = Convert.ToInt32(bid);
            var result = (from ge in db.BeneficiaryEntries
                          where ge.IsActive == true && ge.ID == b_id
                          select ge).ToList()
                              .Select(d => new ItemAllocationModel()
                              {
                                  ID = d.ID,
                                  FormID = d.FormID,
                                  AllotmentNo = d.AllotmentNo,
                                  ConstituencyName = d.ConstituencyMaster.Constituency,
                                  ConstituencyID = (int)d.ConstituencyID,
                                  BeneficiaryID = (int)d.ID,
                                  BeneficiaryName = d.BeneficiaryName,
                                  PHONE = d.MobileNo.ToString(),
                                  AADHAR_NO = d.AadharNo.ToString(),
                                  IssueDate = DateTime.Now
                              });
            itemAllocation = result.FirstOrDefault();
            itemAllocation.ItemList = new SelectList(db.ItemMasters.Select(a =>
                   new
                   {
                       ID = a.ID,
                       ItemName = a.ItemName + "(" + a.UnitMaster.UnitName + ")"
                   }).ToList(), "ID", "ItemName");

            //itemAllocation.UnitList = new SelectList(db.UnitMasters.Select(a =>
            //       new
            //       {
            //           ID = a.ID,
            //           UnitName = a.UnitName
            //       }).ToList(), "ID", "UnitName");

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(itemAllocation);
            if (usertype == "Admin")
            {
                myView.MasterName = "~/Views/Shared/_Layout.cshtml";
            }
            else if (usertype == "EStore")
            {
                myView.MasterName = "~/Views/Shared/_LayoutEStore.cshtml";
            }
            return myView;
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
    }
}