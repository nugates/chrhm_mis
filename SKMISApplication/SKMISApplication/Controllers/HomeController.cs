using SKMISApplication.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Controllers
{
    public class HomeController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        DataSet ds = new DataSet();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        [HttpPost]
        public JsonResult SysnStart()
        {
            try
            {
                if (CheckForInternetConnection())
                {
                    SyncToCloudFromLocal();
                    SyncToLocalFromCloud();
                }
                else
                {
                    return Json("error");
                }
            }
            catch (Exception ex)
            {
                return Json("ex");
            }

            return Json("success");
        }
        public static bool CheckForInternetConnection()
        {
            try
            {
                using (var client = new WebClient())
                {
                    using (client.OpenRead("http://clients3.google.com/generate_204"))
                    {
                        return true;
                    }
                }
            }
            catch
            {
                return false;
            }
        }
        public void SyncToCloudFromLocal()
        {
            DataTable dt_InventoryMaster = new DataTable();
            DataTable dt_ItemAllocation = new DataTable();

            using (var connection = db.Database.Connection)
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "EXEC GetDataToSyncToCloudFromLocal";

                using (var reader = command.ExecuteReader())
                {
                    var InventoryMaster =
                        ((IObjectContextAdapter)db)
                            .ObjectContext
                            .Translate<SyncModelInventory>(reader)
                            .ToList();

                    reader.NextResult();

                    var ItemAllocation =
                        ((IObjectContextAdapter)db)
                            .ObjectContext
                            .Translate<SyncModelItemAllocation>(reader)
                            .ToList();

                    if (InventoryMaster.Count > 0)
                    {
                        dt_InventoryMaster = ToDataTable(InventoryMaster);
                    }
                    else
                    {
                        dt_InventoryMaster.Clear();
                        dt_InventoryMaster.Columns.Add("ItemID");
                        dt_InventoryMaster.Columns.Add("StoreID");
                        dt_InventoryMaster.Columns.Add("VehicleNo");
                        dt_InventoryMaster.Columns.Add("Quantity");
                        dt_InventoryMaster.Columns.Add("CreatedDate");
                        dt_InventoryMaster.Columns.Add("IsActive");
                        dt_InventoryMaster.Columns.Add("InvoiceNo");
                        dt_InventoryMaster.Columns.Add("ChallanNo");
                        dt_InventoryMaster.Columns.Add("Note");
                        dt_InventoryMaster.Columns.Add("CreatedBy");
                    }
                    if (ItemAllocation.Count > 0)
                    {
                        dt_ItemAllocation = ToDataTable(ItemAllocation);
                    }
                    else
                    {
                        dt_ItemAllocation.Clear();
                        dt_ItemAllocation.Columns.Add("BeneficiaryID");
                        dt_ItemAllocation.Columns.Add("ItemID");
                        dt_ItemAllocation.Columns.Add("Quantity");
                        dt_ItemAllocation.Columns.Add("IssueDate");
                        dt_ItemAllocation.Columns.Add("CreatedDate");
                        dt_ItemAllocation.Columns.Add("CreatedBy");
                        dt_ItemAllocation.Columns.Add("UpdatedBy");
                        dt_ItemAllocation.Columns.Add("UpdatedDate");
                        dt_ItemAllocation.Columns.Add("ConstituencyID");
                        dt_ItemAllocation.Columns.Add("VehicleNo");
                        dt_ItemAllocation.Columns.Add("OrderPlaceBy");
                        dt_ItemAllocation.Columns.Add("ChallanNo");
                        dt_ItemAllocation.Columns.Add("IsActive");
                    }
                }
            }

            #region Data Inser in Server
            SqlConnection con_server = new SqlConnection("Data Source=45.34.14.222;Initial Catalog=SKMIS_PROD;User ID=sa;Password=sa@sUp0r657;");
            con_server.Open();
            SqlCommand cmd = new SqlCommand("SyncToCloudFromLocal", con_server);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@tbl_inventory", dt_InventoryMaster);
            cmd.Parameters.AddWithValue("@tbl_itemallocation", dt_ItemAllocation);
            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con_server.Close();
            }
            #endregion
            #region Local DB Update
            SqlConnection con_local = new SqlConnection("Data Source=.;Initial Catalog=SKMIS_PROD;User ID=sa;Password=sa@123;");
            con_local.Open();
            SqlCommand cmd_L = new SqlCommand("SyncToCloudFromLocal_UpdateStatus", con_local);
            cmd_L.CommandType = CommandType.StoredProcedure;
            cmd_L.Parameters.AddWithValue("@tbl_inventory", dt_InventoryMaster);
            cmd_L.Parameters.AddWithValue("@tbl_itemallocation", dt_ItemAllocation);
            try
            {
                cmd_L.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con_local.Close();
            }
            #endregion

        }
        public void SyncToLocalFromCloud()
        {
            DataTable dt_BeneficiaryEntry = new DataTable();
            DataTable dt_InventoryMaster = new DataTable();
            DataTable dt_ItemAllocation = new DataTable();

            SqlConnection connection = new SqlConnection("Data Source=45.34.14.222;Initial Catalog=SKMIS_PROD;User ID=sa;Password=sa@sUp0r657;");
            //using (var connection = con_server.Database.Connection)
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "EXEC GetDataToSyncToLocalFromCloud";

                using (var reader = command.ExecuteReader())
                {
                    var InventoryMaster =
                        ((IObjectContextAdapter)db)
                            .ObjectContext
                            .Translate<SyncModelInventory>(reader)
                            .ToList();

                    reader.NextResult();

                    var ItemAllocation =
                        ((IObjectContextAdapter)db)
                            .ObjectContext
                            .Translate<SyncModelItemAllocation>(reader)
                            .ToList();
                    reader.NextResult();

                    var ItemBeneficiary =
                        ((IObjectContextAdapter)db)
                            .ObjectContext
                            .Translate<SyncModelBeneficiary>(reader)
                            .ToList();

                    if (InventoryMaster.Count > 0)
                    {
                        dt_InventoryMaster = ToDataTable(InventoryMaster);
                    }
                    else
                    {
                        dt_InventoryMaster.Clear();
                        dt_InventoryMaster.Columns.Add("ItemID");
                        dt_InventoryMaster.Columns.Add("StoreID");
                        dt_InventoryMaster.Columns.Add("VehicleNo");
                        dt_InventoryMaster.Columns.Add("Quantity");
                        dt_InventoryMaster.Columns.Add("CreatedDate");
                        dt_InventoryMaster.Columns.Add("IsActive");
                        dt_InventoryMaster.Columns.Add("InvoiceNo");
                        dt_InventoryMaster.Columns.Add("ChallanNo");
                        dt_InventoryMaster.Columns.Add("Note");
                        dt_InventoryMaster.Columns.Add("CreatedBy");
                    }
                    if (ItemAllocation.Count > 0)
                    {
                        dt_ItemAllocation = ToDataTable(ItemAllocation);
                    }
                    else
                    {
                        dt_ItemAllocation.Clear();
                        dt_ItemAllocation.Columns.Add("BeneficiaryID");
                        dt_ItemAllocation.Columns.Add("ItemID");
                        dt_ItemAllocation.Columns.Add("Quantity");
                        dt_ItemAllocation.Columns.Add("IssueDate");
                        dt_ItemAllocation.Columns.Add("CreatedDate");
                        dt_ItemAllocation.Columns.Add("CreatedBy");
                        dt_ItemAllocation.Columns.Add("UpdatedBy");
                        dt_ItemAllocation.Columns.Add("UpdatedDate");
                        dt_ItemAllocation.Columns.Add("ConstituencyID");
                        dt_ItemAllocation.Columns.Add("VehicleNo");
                        dt_ItemAllocation.Columns.Add("OrderPlaceBy");
                        dt_ItemAllocation.Columns.Add("ChallanNo");
                        dt_ItemAllocation.Columns.Add("IsActive");
                    }
                    if (ItemBeneficiary.Count > 0)
                    {
                        dt_BeneficiaryEntry = ToDataTable(ItemBeneficiary);
                    }
                    else
                    {
                        dt_BeneficiaryEntry.Clear();
                        dt_BeneficiaryEntry.Columns.Add("AllotmentNo");
                        dt_BeneficiaryEntry.Columns.Add("BeneficiaryName");
                        dt_BeneficiaryEntry.Columns.Add("MobileNo");
                        dt_BeneficiaryEntry.Columns.Add("AadharNo");
                        dt_BeneficiaryEntry.Columns.Add("WardName");
                        dt_BeneficiaryEntry.Columns.Add("ConstituencyID");
                        dt_BeneficiaryEntry.Columns.Add("BlockID");
                        dt_BeneficiaryEntry.Columns.Add("GPUName");
                        dt_BeneficiaryEntry.Columns.Add("ADCID");
                        dt_BeneficiaryEntry.Columns.Add("IsActive");
                        dt_BeneficiaryEntry.Columns.Add("CreatedDate");
                        dt_BeneficiaryEntry.Columns.Add("CreatedBy");
                        dt_BeneficiaryEntry.Columns.Add("UpdatedDate");
                        dt_BeneficiaryEntry.Columns.Add("UpdatedBy");
                        dt_BeneficiaryEntry.Columns.Add("FormID");
                    }
                }
                connection.Close();
            }

            #region Data Inser in Local
            SqlConnection con_local = new SqlConnection("Data Source=.;Initial Catalog=SKMIS_PROD;User ID=sa;Password=sa@123;");
            con_local.Open();
            SqlCommand cmd = new SqlCommand("SyncToLocalFromCloud", con_local);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@tbl_benificiary", dt_BeneficiaryEntry);
            cmd.Parameters.AddWithValue("@tbl_inventory", dt_InventoryMaster);
            cmd.Parameters.AddWithValue("@tbl_itemallocation", dt_ItemAllocation);
            
            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con_local.Close();
            }
            #endregion
            #region Server DB Update
            SqlConnection con_server = new SqlConnection("Data Source=45.34.14.222;Initial Catalog=SKMIS_PROD;User ID=sa;Password=sa@sUp0r657;");
            con_server.Open();
            SqlCommand cmd_S = new SqlCommand("SyncToLocalFromCloud_UpdateStatus", con_server);
            cmd_S.CommandType = CommandType.StoredProcedure;
            cmd_S.Parameters.AddWithValue("@tbl_benificiary", dt_BeneficiaryEntry);
            cmd_S.Parameters.AddWithValue("@tbl_inventory", dt_InventoryMaster);
            cmd_S.Parameters.AddWithValue("@tbl_itemallocation", dt_ItemAllocation);
            
            try
            {
                cmd_S.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con_server.Close();
            }
            #endregion

        }

        public DataTable ToDataTable<T>(List<T> items)

        {

            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties

            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (PropertyInfo prop in Props)

            {

                //Setting column names as Property names

                dataTable.Columns.Add(prop.Name);

            }

            foreach (T item in items)

            {

                var values = new object[Props.Length];

                for (int i = 0; i < Props.Length; i++)

                {

                    //inserting property values to datatable rows

                    values[i] = Props[i].GetValue(item, null);

                }

                dataTable.Rows.Add(values);

            }

            //put a breakpoint here and check datatable

            return dataTable;

        }

    }
}