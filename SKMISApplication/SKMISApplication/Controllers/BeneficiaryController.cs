using SKMISApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Controllers
{
    public class BeneficiaryController : Controller
    {
        private SKMIS_PRODEntities db = new SKMIS_PRODEntities();
        // GET: Beneficiary
        public ActionResult Index()
        {
            //BeneficiaryEntryModelView view = new BeneficiaryEntryModelView();
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            List<BeneficiaryEntryModel> result = new List<BeneficiaryEntryModel>();

            var res = (from ce in db.BeneficiaryEntries
                       where ce.IsActive == true
                       group ce by ce.ConstituencyID into b
                       select new { ID = b.Key, Constituency = b.Select(d => d.ConstituencyMaster.Constituency), NoOfConstituency = b.Count() });

            int TCount = 0;
            foreach (var r in res)
            {
                BeneficiaryEntryModel im = new BeneficiaryEntryModel();
                im.Search = "";
                im.ID = (long)r.ID;
                im.ConstituencyName = r.Constituency.FirstOrDefault();
                im.Count = r.NoOfConstituency;
                result.Add(im);
            }
            TCount = result.Sum(a => a.Count);
            ViewData["TotalBeneficiary"] = TCount;

            return View(result.ToList());
        }

        public ActionResult AdvDetail(string searchString = null)
        {
            if (System.Web.HttpContext.Current.Session["UserType"].ToString() == "Admin")
            {
                return RedirectToAction("AdvDetail_Admin", new { searchString = searchString });
            }
            //return RedirectToAction("Detail", "Beneficiary", new { @id = searchString });
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            //var res = db.BenificiaryAdvanceSearch(searchString, "SKMIS_DEMO", "BeneficiaryEntry");//.ToList<Benificiary_AdvanceSearch_Result>();

            var idParam = new SqlParameter
            {
                ParameterName = "stringToFind",
                Value = searchString
            };

            var res = db.Database.SqlQuery<BeneficiaryEntryModel>
                ("exec BenificiaryAdvanceSearch @stringToFind ", idParam).ToList<BeneficiaryEntryModel>();

            //var cEntry = res.ToString();
            return View(res);

        }

        public ActionResult Detail(int id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (System.Web.HttpContext.Current.Session["UserType"].ToString() == "Admin")
            {
                return RedirectToAction("Detail_Admin", new { id = id });
            }

            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();

            var result = (from ce in db.BeneficiaryEntries
                          where ce.IsActive == true && ce.ConstituencyID == id
                          select new
                          {
                              ID = ce.ID,
                              FormID = ce.FormID,
                              AllotmentNo = ce.AllotmentNo,
                              BeneficiaryName = ce.BeneficiaryName,
                              Constituency = ce.ConstituencyMaster.Constituency,
                              MobileNo = ce.MobileNo,
                              WardName = ce.WardName,
                              AadharNo = ce.AadharNo,
                              ADCName = ce.ADCMaster.ADC_DevSubDiv,
                              BlockName = ce.BlockMaster.BlockName,
                              GPUName = ce.GPUName
                          }).ToList()
                          .Select(d => new BeneficiaryEntryModel()
                          {
                              ID = d.ID,
                              FormID = d.FormID,
                              AllotmentNo = d.AllotmentNo,
                              BeneficiaryName = d.BeneficiaryName,
                              ConstituencyName = d.Constituency,
                              MobileNo = d.MobileNo,
                              WardName = d.WardName,
                              AadharNo = d.AadharNo,
                              ADCName = d.ADCName,
                              BlockName = d.BlockName,
                              GPUName = d.GPUName
                          });

            return View(result.ToList());
        }

        public ActionResult Create()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            long mid = (from ce in db.BeneficiaryEntries
                        where ce.IsActive == true
                        select ce).OrderByDescending(b => b.ID).Select(c => c.ID).FirstOrDefault();

            string MaxID = Convert.ToString(1000 + Convert.ToInt32(mid) + 1);

            int length_minus_prefix = 4;
            while (MaxID.Length < length_minus_prefix)
                MaxID = "0" + MaxID;

            _cEntry.FormID = MaxID;
            //_cEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            _cEntry.ConstituencyList = new SelectList(ListFillerConstituency(), "ID", "ConstituencyName");
            _cEntry.ADCList = new SelectList(db.ADCMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ADC_DevSubDiv = a.ADC_DevSubDiv
                                }).ToList(), "ID", "ADC_DevSubDiv");

            _cEntry.BlockList = new SelectList(db.BlockMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    BlockName = a.BlockName
                                }).ToList(), "ID", "BlockName");

            //_cEntry.GPUList = new SelectList(db.GPUMasters.Select(a =>
            //                    new
            //                    {
            //                        ID = a.ID,
            //                        GPUName = a.GPUName
            //                    }).ToList(), "ID", "GPUName");
            return View(_cEntry);
        }

        [HttpPost]
        public async Task<ActionResult> Create(BeneficiaryEntryModel beneficiaryEntry)
        {
            BeneficiaryEntry _cEntry = new BeneficiaryEntry();
            if (ModelState.IsValid)
            {
                _cEntry.FormID = beneficiaryEntry.FormID;
                _cEntry.AllotmentNo = beneficiaryEntry.AllotmentNo;
                _cEntry.BeneficiaryName = beneficiaryEntry.BeneficiaryName;
                _cEntry.MobileNo = beneficiaryEntry.MobileNo;
                _cEntry.AadharNo = beneficiaryEntry.AadharNo;
                _cEntry.WardName = beneficiaryEntry.WardName;
                _cEntry.ConstituencyID = beneficiaryEntry.ConstituencyID;
                _cEntry.ADCID = beneficiaryEntry.ADCID;
                _cEntry.BlockID = beneficiaryEntry.BlockID;
                _cEntry.GPUName = beneficiaryEntry.GPUName;
                _cEntry.IsActive = true;
                _cEntry.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"]);
                _cEntry.CreatedDate = DateTime.Now;
                _cEntry.IsSyncFromCloud = false;
                _cEntry.IsSyncToCloud = false;
                db.BeneficiaryEntries.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            //beneficiaryEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            beneficiaryEntry.ConstituencyList = new SelectList(ListFillerConstituency(), "ID", "ConstituencyName");
            beneficiaryEntry.ADCList = new SelectList(db.ADCMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    ADC_DevSubDiv = a.ADC_DevSubDiv
                                }).ToList(), "ID", "ADC_DevSubDiv");

            beneficiaryEntry.BlockList = new SelectList(db.BlockMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    BlockName = a.BlockName
                                }).ToList(), "ID", "BlockName");

            //beneficiaryEntry.GPUList = new SelectList(db.GPUMasters.Select(a =>
            //                    new
            //                    {
            //                        ID = a.ID,
            //                        GPUName = a.GPUName
            //                    }).ToList(), "ID", "GPUName");
            return View(beneficiaryEntry);
        }


        public async Task<ActionResult> ViewDocument(long? id)
        {
            int? cid = (from ce in db.BeneficiaryEntries
                        where ce.IsActive == true && ce.ID == id
                        select ce.ConstituencyID).FirstOrDefault();
            ViewData["ConstituencyID"] = cid;
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            ViewData["Beneficiaryid"] = id;
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BeneficiaryDocumentModel cdm = new BeneficiaryDocumentModel();
            var result = (from ce in db.BeneficiaryDocuments
                          where ce.IsActive == true && ce.BeneficiaryID == id
                          select new
                          {
                              BeneficiaryID = ce.BeneficiaryID,
                              ID = ce.ID,
                              ConstituencyID = ce.BeneficiaryEntry.ConstituencyID,
                              BeneficiaryName = ce.BeneficiaryEntry.BeneficiaryName,
                              DocumentName = ce.DocumentName,
                              FileLocation = ce.FileLocation
                          }).ToList()
                          .Select(d => new BeneficiaryDocumentModel()
                          {
                              BeneficiaryID = d.BeneficiaryID,
                              ID = d.ID,
                              ConstituencyID = d.ConstituencyID,
                              BeneficiaryName = d.BeneficiaryName,
                              DocumentName = d.DocumentName,
                              FileLocation = d.FileLocation
                          });

            return View(result.ToList());
        }

        public async Task<ActionResult> Edit(long? id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            var result = (from ce in db.BeneficiaryEntries
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              FormID = ce.FormID,
                              AllotmentNo = ce.AllotmentNo,
                              BeneficiaryName = ce.BeneficiaryName,
                              MobileNo = ce.MobileNo,
                              AadharNo = ce.AadharNo,
                              WardName = ce.WardName,
                              ConstituencyID = ce.ConstituencyID,
                              ADCID = ce.ADCID,
                              BlockID = ce.BlockID,
                              GPUName = ce.GPUName
                          }).ToList()
             .Select(d => new BeneficiaryEntryModel()
             {
                 ID = d.ID,
                 FormID = d.FormID,
                 AllotmentNo = d.AllotmentNo,
                 BeneficiaryName = d.BeneficiaryName,
                 MobileNo = d.MobileNo,
                 AadharNo = d.AadharNo,
                 WardName = d.WardName,
                 ConstituencyID = d.ConstituencyID,
                 ADCID = d.ADCID,
                 BlockID = d.BlockID,
                 GPUName = d.GPUName
             });
            _cEntry = result.FirstOrDefault();
            //_cEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            _cEntry.ConstituencyList = new SelectList(ListFillerConstituency(), "ID", "ConstituencyName");
            _cEntry.ADCList = new SelectList(db.ADCMasters.Select(a =>
                               new
                               {
                                   ID = a.ID,
                                   ADC_DevSubDiv = a.ADC_DevSubDiv
                               }).ToList(), "ID", "ADC_DevSubDiv");

            _cEntry.BlockList = new SelectList(db.BlockMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    BlockName = a.BlockName
                                }).ToList(), "ID", "BlockName");

            //_cEntry.GPUList = new SelectList(db.GPUMasters.Select(a =>
            //                    new
            //                    {
            //                        ID = a.ID,
            //                        GPUName = a.GPUName
            //                    }).ToList(), "ID", "GPUName");
            if (_cEntry == null)
            {
                return HttpNotFound();
            }
            return View(_cEntry);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(BeneficiaryEntryModel beneficiaryEntry)
        {
            if (ModelState.IsValid)
            {
                BeneficiaryEntry _pDetail = await db.BeneficiaryEntries.FindAsync(beneficiaryEntry.ID);
                _pDetail.ID = beneficiaryEntry.ID;
                _pDetail.FormID = beneficiaryEntry.FormID;
                _pDetail.AllotmentNo = beneficiaryEntry.AllotmentNo;
                _pDetail.BeneficiaryName = beneficiaryEntry.BeneficiaryName;
                _pDetail.MobileNo = beneficiaryEntry.MobileNo;
                _pDetail.AadharNo = beneficiaryEntry.AadharNo;
                _pDetail.WardName = beneficiaryEntry.WardName;
                _pDetail.ConstituencyID = beneficiaryEntry.ConstituencyID;
                _pDetail.ADCID = beneficiaryEntry.ADCID;
                _pDetail.BlockID = beneficiaryEntry.BlockID;
                _pDetail.GPUName = beneficiaryEntry.GPUName;
                _pDetail.IsActive = true;
                _pDetail.UpdatedDate = DateTime.Now;
                _pDetail.UpdatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"]);
                db.Entry(_pDetail).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            BeneficiaryEntry _cEntry = await db.BeneficiaryEntries.FindAsync(id);
            _cEntry.ID = (long)id;
            _cEntry.IsActive = false;
            _cEntry.UpdatedDate = DateTime.Now;
            db.Entry(_cEntry).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> DocumentEntry(long? id)
        {
            ViewData["CID"] = id;
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BeneficiaryDocumentModel cdm = new BeneficiaryDocumentModel();
            IEnumerable<BeneficiaryDocumentModel> result = GetBeneficiaryDocument(id);
            SetViewDataBeneficiaryDocument(id);
            return View(result.ToList());
        }

        private void SetViewDataBeneficiaryDocument(long? id)
        {
            var BeneficiaryName = (from ce in db.BeneficiaryEntries
                                   where ce.IsActive == true && ce.ID == id
                                   select ce).ToList();

            ViewData["BeneficiaryName"] = BeneficiaryName.Select(a => a.BeneficiaryName).FirstOrDefault();
            ViewData["BeneficiaryID"] = id;
            ViewData["CID"] = BeneficiaryName.Select(a => a.ConstituencyID).FirstOrDefault();
        }

        private IEnumerable<BeneficiaryDocumentModel> GetBeneficiaryDocument(long? id)
        {
            var result = (from ce in db.BeneficiaryDocuments
                          where ce.IsActive == true && ce.BeneficiaryID == id
                          select new
                          {
                              BeneficiaryID = ce.BeneficiaryID,
                              ID = ce.ID,
                              BeneficiaryName = ce.BeneficiaryEntry.BeneficiaryName,
                              DocumentNameGrid = ce.DocumentName,
                              FileLocation = ce.FileLocation
                          }).ToList()
                                      .Select(d => new BeneficiaryDocumentModel()
                                      {
                                          BeneficiaryID = d.BeneficiaryID,
                                          ID = d.ID,
                                          BeneficiaryName = d.BeneficiaryName,
                                          DocumentNameGrid = d.DocumentNameGrid,
                                          FileLocation = d.FileLocation
                                          //DocList = new SelectList(db.DocumentTitleMasters.Select(a => new { ID = a.ID, DocumentTitle = a.DocumentTitle }).ToList(), "ID", "DocumentTitle"),
                                          //NameList = new SelectList(db.CitizenEntries.Select(a => new { ID = a.ID, CitizenNames = a.FullName }).ToList(), "ID", "CitizenNames")
                                      });
            return result;
        }

        [HttpPost]
        public async Task<ActionResult> DocumentEntry(HttpPostedFileBase file, BeneficiaryDocumentModel _beneficiaryDocuments)
        {
            if (file != null)
            {
                string datetime = DateTime.Now.ToString("yyyyMMddHHmmss");
                string dbSavePath = "~/Images/" + datetime + file.FileName;
                string path = Server.MapPath(dbSavePath);
                BeneficiaryDocument _cDocument = new BeneficiaryDocument();
                _cDocument.FileLocation = dbSavePath;
                _cDocument.BeneficiaryID = _beneficiaryDocuments.ID;
                _cDocument.DocumentName = _beneficiaryDocuments.DocumentName;
                _cDocument.CreatedDate = DateTime.Now;
                _cDocument.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"]);
                _cDocument.IsActive = true;
                file.SaveAs(path);
                db.BeneficiaryDocuments.Add(_cDocument);
                //ViewBag.Path = path;
                await db.SaveChangesAsync();
            }
            IEnumerable<BeneficiaryDocumentModel> result = GetBeneficiaryDocument(_beneficiaryDocuments.ID);
            //string abc = ViewData["CID"].ToString();
            //ViewData["CID"] = _beneficiaryDocuments.ConstituencyID;
            SetViewDataBeneficiaryDocument(_beneficiaryDocuments.ID);
            return View(result.ToList());
        }

        public async Task<ActionResult> Download(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var fPath = db.BeneficiaryDocuments.Single(a => a.ID == id).FileLocation;
            var beneficiaryID = db.BeneficiaryDocuments.Single(a => a.ID == id).BeneficiaryID;
            WebClient req = new WebClient();
            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;
            response.AddHeader("Content-Disposition", "attachment;filename=\"" + Server.MapPath(fPath) + "\"");
            byte[] data = req.DownloadData(Server.MapPath(fPath));
            response.BinaryWrite(data);
            response.End();

            IEnumerable<BeneficiaryDocumentModel> result = GetBeneficiaryDocument(beneficiaryID);

            SetViewDataBeneficiaryDocument(beneficiaryID);
            return View(result.ToList());
        }

        //public IEnumerable<Ward> ListFillerWard()
        //{
        //    var result = (from an in db.WardMasters
        //                  where an.IsActive == true
        //                  select new
        //                  {
        //                      ID = an.ID,
        //                      WardNumber = an.WardNumber + " - " + an.WardName
        //                  }).ToList()
        //                 .Select(d => new Ward()
        //                 {
        //                     ID = d.ID,
        //                     WardName = d.WardNumber
        //                 });
        //    return result;
        //}

        public IEnumerable<Constituency> ListFillerConstituency()
        {
            var result = (from an in db.ConstituencyMasters
                          where an.IsActive == true
                          select new
                          {
                              ID = an.ID,
                              ConstituencyName = an.Constituency
                          }).ToList()
                         .Select(d => new Constituency()
                         {
                             ID = d.ID,
                             ConstituencyName = d.ConstituencyName
                         });
            return result;
        }

        public ActionResult BeneficiaryView()
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            List<BeneficiaryEntryModel> result = new List<BeneficiaryEntryModel>();

            var res = (from ce in db.BeneficiaryEntries
                       where ce.IsActive == true
                       group ce by ce.ConstituencyID into b
                       select new { ID = b.Key, Constituency = b.Select(d => d.ConstituencyMaster.Constituency), NoOfConstituency = b.Count() });


            foreach (var r in res)
            {
                BeneficiaryEntryModel im = new BeneficiaryEntryModel();
                im.ID = (long)r.ID;
                im.ConstituencyName = r.Constituency.FirstOrDefault();
                im.Count = r.NoOfConstituency;
                result.Add(im);
            }

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(result.ToList());
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

        public ActionResult BeneficiaryDetailView(int id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();

            var result = (from ce in db.BeneficiaryEntries
                          where ce.IsActive == true && ce.ConstituencyID == id
                          select new
                          {
                              ID = ce.ID,
                              FormID = ce.FormID,
                              AllotmentNo = ce.AllotmentNo,
                              BeneficiaryName = ce.BeneficiaryName,
                              Constituency = ce.ConstituencyMaster.Constituency,
                              MobileNo = ce.MobileNo,
                              WardName = ce.WardName,
                              AadharNo = ce.AadharNo,
                              ADCName = ce.ADCMaster.ADC_DevSubDiv,
                              BlockName = ce.BlockMaster.BlockName,
                              GPUName = ce.GPUName
                          }).ToList()
                          .Select(d => new BeneficiaryEntryModel()
                          {
                              ID = d.ID,
                              FormID = d.FormID,
                              AllotmentNo = d.AllotmentNo,
                              BeneficiaryName = d.BeneficiaryName,
                              ConstituencyName = d.Constituency,
                              MobileNo = d.MobileNo,
                              WardName = d.WardName,
                              AadharNo = d.AadharNo,
                              ADCName = d.ADCName,
                              BlockName = d.BlockName,
                              GPUName = d.GPUName
                          });

            string usertype = System.Web.HttpContext.Current.Session["UserType"].ToString();
            var myView = View(result.ToList());
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

        public async Task<ActionResult> Search(BeneficiaryEntryModel searchval)
        {
            return View();
        }

        public ActionResult Detail_Admin(int id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();

            var result = (from ce in db.BeneficiaryEntries
                          where ce.IsActive == true && ce.ConstituencyID == id
                          select new
                          {
                              ID = ce.ID,
                              FormID = ce.FormID,
                              AllotmentNo = ce.AllotmentNo,
                              BeneficiaryName = ce.BeneficiaryName,
                              Constituency = ce.ConstituencyMaster.Constituency,
                              MobileNo = ce.MobileNo,
                              WardName = ce.WardName,
                              AadharNo = ce.AadharNo,
                              ADCName = ce.ADCMaster.ADC_DevSubDiv,
                              BlockName = ce.BlockMaster.BlockName,
                              GPUName = ce.GPUName
                          }).ToList()
                          .Select(d => new BeneficiaryEntryModel()
                          {
                              ID = d.ID,
                              FormID = d.FormID,
                              AllotmentNo = d.AllotmentNo,
                              BeneficiaryName = d.BeneficiaryName,
                              ConstituencyName = d.Constituency,
                              MobileNo = d.MobileNo,
                              WardName = d.WardName,
                              AadharNo = d.AadharNo,
                              ADCName = d.ADCName,
                              BlockName = d.BlockName,
                              GPUName = d.GPUName
                          });

            return View(result.ToList());
        }

        public ActionResult AdvDetail_Admin(string searchString = null)
        {
            //return RedirectToAction("Detail", "Beneficiary", new { @id = searchString });
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            //var res = db.BenificiaryAdvanceSearch(searchString, "SKMIS_DEMO", "BeneficiaryEntry");//.ToList<Benificiary_AdvanceSearch_Result>();

            var idParam = new SqlParameter
            {
                ParameterName = "stringToFind",
                Value = searchString
            };

            var res = db.Database.SqlQuery<BeneficiaryEntryModel>
                ("exec BenificiaryAdvanceSearch @stringToFind ", idParam).ToList<BeneficiaryEntryModel>();

            

            //var cEntry = res.ToString();
            return View(res);

        }

        public ActionResult DetailTab(int id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
           List<Progress> presult = (from ce in db.Progresses
                          where ce.IsActive == true && ce.BeneficiaryID == id
                          select ce).ToList();
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            IEnumerable<BeneficiaryEntryModel> result = new List<BeneficiaryEntryModel>();
            if (presult.Count > 0)
            {
                result = (from ce in db.BeneficiaryEntries
                              where ce.IsActive == true && ce.ID == id
                              select new
                              {
                                  ID = ce.ID,
                                  FormID = ce.FormID,
                                  AllotmentNo = ce.AllotmentNo,
                                  BeneficiaryName = ce.BeneficiaryName,
                                  MobileNo = ce.MobileNo,
                                  AadharNo = ce.AadharNo,
                                  WardName = ce.WardName,
                                  ConstituencyID = ce.ConstituencyID,
                                  ADCID = ce.ADCID,
                                  BlockID = ce.BlockID,
                                  GPUName = ce.GPUName                                  
                              }).ToList()
             .Select(d => new BeneficiaryEntryModel()
             {
                 ID = d.ID,
                 FormID = d.FormID,
                 AllotmentNo = d.AllotmentNo,
                 BeneficiaryName = d.BeneficiaryName,
                 MobileNo = d.MobileNo,
                 AadharNo = d.AadharNo,
                 WardName = d.WardName,
                 ConstituencyID = d.ConstituencyID,
                 ADCID = d.ADCID,
                 BlockID = d.BlockID,
                 GPUName = d.GPUName,
                 SiteLevellingAndProtectiveWork =(bool) presult.FirstOrDefault().SiteLevellingProtectiveWork,
                 UptoPlinthSlab = (bool)presult.FirstOrDefault().UptoPlinthSlab,
                 CastingOfSlab = (bool)presult.FirstOrDefault().CastingOfSlab,
                 SepticTank = (bool)presult.FirstOrDefault().SepticTank,
                 HandOver = (bool)presult.FirstOrDefault().HandOver,
                 BrickPlasterWork = (bool)presult.FirstOrDefault().BrickPlasterWork,
                 DoorWindows = (bool)presult.FirstOrDefault().DoorWindows,
                 ElectrificationPlumbing = (bool)presult.FirstOrDefault().ElectrificationPlumbing,
                 PaitingFinishing = (bool)presult.FirstOrDefault().PaitingFinishing,
                 DateOfCommencement = Convert.ToDateTime(presult.FirstOrDefault().DateOfCommencement).ToString("MM/dd/yyyy"),
                 DateOfCompletion = Convert.ToDateTime(presult.FirstOrDefault().DateOfCompletion).ToString("MM/dd/yyyy")
             });
            }
            else
            {
                result = (from ce in db.BeneficiaryEntries
                              where ce.IsActive == true && ce.ID == id
                              select new
                              {
                                  ID = ce.ID,
                                  FormID = ce.FormID,
                                  AllotmentNo = ce.AllotmentNo,
                                  BeneficiaryName = ce.BeneficiaryName,
                                  MobileNo = ce.MobileNo,
                                  AadharNo = ce.AadharNo,
                                  WardName = ce.WardName,
                                  ConstituencyID = ce.ConstituencyID,
                                  ADCID = ce.ADCID,
                                  BlockID = ce.BlockID,
                                  GPUName = ce.GPUName
                              }).ToList()
             .Select(d => new BeneficiaryEntryModel()
             {
                 ID = d.ID,
                 FormID = d.FormID,
                 AllotmentNo = d.AllotmentNo,
                 BeneficiaryName = d.BeneficiaryName,
                 MobileNo = d.MobileNo,
                 AadharNo = d.AadharNo,
                 WardName = d.WardName,
                 ConstituencyID = d.ConstituencyID,
                 ADCID = d.ADCID,
                 BlockID = d.BlockID,
                 GPUName = d.GPUName,
                 DateOfCommencement = DateTime.Now.ToString("MM/dd/yyyy"),
                 DateOfCompletion = DateTime.Now.ToString("MM/dd/yyyy")
             });
            }
            
            _cEntry = result.FirstOrDefault();
            //_cEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            _cEntry.ConstituencyList = new SelectList(ListFillerConstituency(), "ID", "ConstituencyName");
            _cEntry.ADCList = new SelectList(db.ADCMasters.Select(a =>
                               new
                               {
                                   ID = a.ID,
                                   ADC_DevSubDiv = a.ADC_DevSubDiv
                               }).ToList(), "ID", "ADC_DevSubDiv");

            _cEntry.BlockList = new SelectList(db.BlockMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    BlockName = a.BlockName
                                }).ToList(), "ID", "BlockName");

            //_cEntry.GPUList = new SelectList(db.GPUMasters.Select(a =>
            //                    new
            //                    {
            //                        ID = a.ID,
            //                        GPUName = a.GPUName
            //                    }).ToList(), "ID", "GPUName");
            if (_cEntry == null)
            {
                return HttpNotFound();
            }
            return View(_cEntry);
        }
        public ActionResult DetailAdminTab(long? id)
        {
            if (System.Web.HttpContext.Current.Session["UserType"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            List<Progress> presult = (from ce in db.Progresses
                                      where ce.IsActive == true && ce.BeneficiaryID == id
                                      select ce).ToList();
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            IEnumerable<BeneficiaryEntryModel> result = new List<BeneficiaryEntryModel>();
            if (presult.Count > 0)
            {
                result = (from ce in db.BeneficiaryEntries
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              FormID = ce.FormID,
                              AllotmentNo = ce.AllotmentNo,
                              BeneficiaryName = ce.BeneficiaryName,
                              MobileNo = ce.MobileNo,
                              AadharNo = ce.AadharNo,
                              WardName = ce.WardName,
                              ConstituencyID = ce.ConstituencyID,
                              ADCID = ce.ADCID,
                              BlockID = ce.BlockID,
                              GPUName = ce.GPUName
                          }).ToList()
             .Select(d => new BeneficiaryEntryModel()
             {
                 ID = d.ID,
                 FormID = d.FormID,
                 AllotmentNo = d.AllotmentNo,
                 BeneficiaryName = d.BeneficiaryName,
                 MobileNo = d.MobileNo,
                 AadharNo = d.AadharNo,
                 WardName = d.WardName,
                 ConstituencyID = d.ConstituencyID,
                 ADCID = d.ADCID,
                 BlockID = d.BlockID,
                 GPUName = d.GPUName,
                 SiteLevellingAndProtectiveWork = (bool)presult.FirstOrDefault().SiteLevellingProtectiveWork,
                 UptoPlinthSlab = (bool)presult.FirstOrDefault().UptoPlinthSlab,
                 CastingOfSlab = (bool)presult.FirstOrDefault().CastingOfSlab,
                 SepticTank = (bool)presult.FirstOrDefault().SepticTank,
                 HandOver = (bool)presult.FirstOrDefault().HandOver,
                 BrickPlasterWork = (bool)presult.FirstOrDefault().BrickPlasterWork,
                 DoorWindows = (bool)presult.FirstOrDefault().DoorWindows,
                 ElectrificationPlumbing = (bool)presult.FirstOrDefault().ElectrificationPlumbing,
                 PaitingFinishing = (bool)presult.FirstOrDefault().PaitingFinishing,
                 DateOfCommencement = Convert.ToDateTime(presult.FirstOrDefault().DateOfCommencement).ToString("MM/dd/yyyy"),
                 DateOfCompletion = Convert.ToDateTime(presult.FirstOrDefault().DateOfCompletion).ToString("MM/dd/yyyy")
             });
            }
            else
            {
                result = (from ce in db.BeneficiaryEntries
                          where ce.IsActive == true && ce.ID == id
                          select new
                          {
                              ID = ce.ID,
                              FormID = ce.FormID,
                              AllotmentNo = ce.AllotmentNo,
                              BeneficiaryName = ce.BeneficiaryName,
                              MobileNo = ce.MobileNo,
                              AadharNo = ce.AadharNo,
                              WardName = ce.WardName,
                              ConstituencyID = ce.ConstituencyID,
                              ADCID = ce.ADCID,
                              BlockID = ce.BlockID,
                              GPUName = ce.GPUName
                          }).ToList()
             .Select(d => new BeneficiaryEntryModel()
             {
                 ID = d.ID,
                 FormID = d.FormID,
                 AllotmentNo = d.AllotmentNo,
                 BeneficiaryName = d.BeneficiaryName,
                 MobileNo = d.MobileNo,
                 AadharNo = d.AadharNo,
                 WardName = d.WardName,
                 ConstituencyID = d.ConstituencyID,
                 ADCID = d.ADCID,
                 BlockID = d.BlockID,
                 GPUName = d.GPUName,
                 DateOfCommencement = DateTime.Now.ToString("MM/dd/yyyy"),
                 DateOfCompletion = DateTime.Now.ToString("MM/dd/yyyy")
             });
            }

            _cEntry = result.FirstOrDefault();
            //_cEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            _cEntry.ConstituencyList = new SelectList(ListFillerConstituency(), "ID", "ConstituencyName");
            _cEntry.ADCList = new SelectList(db.ADCMasters.Select(a =>
                               new
                               {
                                   ID = a.ID,
                                   ADC_DevSubDiv = a.ADC_DevSubDiv
                               }).ToList(), "ID", "ADC_DevSubDiv");

            _cEntry.BlockList = new SelectList(db.BlockMasters.Select(a =>
                                new
                                {
                                    ID = a.ID,
                                    BlockName = a.BlockName
                                }).ToList(), "ID", "BlockName");

            //_cEntry.GPUList = new SelectList(db.GPUMasters.Select(a =>
            //                    new
            //                    {
            //                        ID = a.ID,
            //                        GPUName = a.GPUName
            //                    }).ToList(), "ID", "GPUName");
            if (_cEntry == null)
            {
                return HttpNotFound();
            }
            return View(_cEntry);
        }

        [HttpPost]
        public async Task<ActionResult> DetailTab(string button, BeneficiaryEntryModel beneficiaryEntry)
        {
            if (button == "summaryreport")
            {
                return Redirect("~/ReportsView/EstoreSummaryReport.aspx?Data=" + beneficiaryEntry.FormID);
            }
            if (button == "detailreport")
            {
                return Redirect("~/ReportsView/EstoreDetailReport.aspx?Data=" + beneficiaryEntry.FormID);
            }
            if (button == "Update")
            {
                int id = (int)beneficiaryEntry.ID;

                int PID = (from ce in db.Progresses
                           where ce.IsActive == true && ce.BeneficiaryID == id
                           select ce.ID).FirstOrDefault();
                if (PID != 0)
                {
                    Progress _PEntry1 = await db.Progresses.FindAsync(PID);
                    _PEntry1.SiteLevellingProtectiveWork = beneficiaryEntry.SiteLevellingAndProtectiveWork;
                    _PEntry1.UptoPlinthSlab = beneficiaryEntry.UptoPlinthSlab;
                    _PEntry1.CastingOfSlab = beneficiaryEntry.CastingOfSlab;
                    _PEntry1.SepticTank = beneficiaryEntry.SepticTank;
                    _PEntry1.HandOver = beneficiaryEntry.HandOver;
                    _PEntry1.BrickPlasterWork = beneficiaryEntry.BrickPlasterWork;
                    _PEntry1.DoorWindows = beneficiaryEntry.DoorWindows;
                    _PEntry1.ElectrificationPlumbing = beneficiaryEntry.ElectrificationPlumbing;
                    _PEntry1.PaitingFinishing = beneficiaryEntry.PaitingFinishing;
                    _PEntry1.DateOfCommencement = Convert.ToDateTime(beneficiaryEntry.DateOfCommencement);
                    _PEntry1.DateOfCompletion = Convert.ToDateTime(beneficiaryEntry.DateOfCompletion);
                    db.Entry(_PEntry1).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
                else
                {
                    Progress _PEntry = new Progress();
                    _PEntry.BeneficiaryID = id;
                    _PEntry.FormID = beneficiaryEntry.FormID;
                    _PEntry.SiteLevellingProtectiveWork = beneficiaryEntry.SiteLevellingAndProtectiveWork;
                    _PEntry.UptoPlinthSlab = beneficiaryEntry.UptoPlinthSlab;
                    _PEntry.CastingOfSlab = beneficiaryEntry.CastingOfSlab;
                    _PEntry.SepticTank = beneficiaryEntry.SepticTank;
                    _PEntry.HandOver = beneficiaryEntry.HandOver;
                    _PEntry.BrickPlasterWork = beneficiaryEntry.BrickPlasterWork;
                    _PEntry.DoorWindows = beneficiaryEntry.DoorWindows;
                    _PEntry.ElectrificationPlumbing = beneficiaryEntry.ElectrificationPlumbing;
                    _PEntry.PaitingFinishing = beneficiaryEntry.PaitingFinishing;
                    _PEntry.DateOfCommencement = Convert.ToDateTime(beneficiaryEntry.DateOfCommencement);
                    _PEntry.DateOfCompletion = Convert.ToDateTime(Convert.ToDateTime(beneficiaryEntry.DateOfCompletion).ToString("MM/dd/yyyy"));
                    _PEntry.IsActive = true;
                    _PEntry.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"]);
                    _PEntry.CreatedDate = DateTime.Now;
                    db.Progresses.Add(_PEntry);
                    await db.SaveChangesAsync();
                }

                BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
                var result = (from ce in db.BeneficiaryEntries
                              where ce.IsActive == true && ce.ID == id
                              select new
                              {
                                  ID = ce.ID,
                                  FormID = ce.FormID,
                                  AllotmentNo = ce.AllotmentNo,
                                  BeneficiaryName = ce.BeneficiaryName,
                                  MobileNo = ce.MobileNo,
                                  AadharNo = ce.AadharNo,
                                  WardName = ce.WardName,
                                  ConstituencyID = ce.ConstituencyID,
                                  ADCID = ce.ADCID,
                                  BlockID = ce.BlockID,
                                  GPUName = ce.GPUName
                              }).ToList()
                 .Select(d => new BeneficiaryEntryModel()
                 {
                     ID = d.ID,
                     FormID = d.FormID,
                     AllotmentNo = d.AllotmentNo,
                     BeneficiaryName = d.BeneficiaryName,
                     MobileNo = d.MobileNo,
                     AadharNo = d.AadharNo,
                     WardName = d.WardName,
                     ConstituencyID = d.ConstituencyID,
                     ADCID = d.ADCID,
                     BlockID = d.BlockID,
                     GPUName = d.GPUName
                 });
                _cEntry = result.FirstOrDefault();
                _cEntry.ConstituencyList = new SelectList(ListFillerConstituency(), "ID", "ConstituencyName");
                _cEntry.ADCList = new SelectList(db.ADCMasters.Select(a =>
                                   new
                                   {
                                       ID = a.ID,
                                       ADC_DevSubDiv = a.ADC_DevSubDiv
                                   }).ToList(), "ID", "ADC_DevSubDiv");

                _cEntry.BlockList = new SelectList(db.BlockMasters.Select(a =>
                                    new
                                    {
                                        ID = a.ID,
                                        BlockName = a.BlockName
                                    }).ToList(), "ID", "BlockName");
                if (_cEntry == null)
                {
                    return HttpNotFound();
                }
                return View(_cEntry);
            }
            return View(beneficiaryEntry);
        }

        [HttpPost]
        public async Task<ActionResult> DetailAdminTab(string button, BeneficiaryEntryModel beneficiaryEntry)
        {
            if (button == "summaryreport")
            {
                return Redirect("~/ReportsView/EstoreSummaryReport.aspx?Data=" + beneficiaryEntry.FormID);
            }
            if (button == "detailreport")
            {
                return Redirect("~/ReportsView/EstoreDetailReport.aspx?Data=" + beneficiaryEntry.FormID);
            }
            if (button == "Update")
            {
                int id = (int)beneficiaryEntry.ID;

                int PID = (from ce in db.Progresses
                           where ce.IsActive == true && ce.BeneficiaryID == id
                           select ce.ID).FirstOrDefault();
                if (PID != 0)
                {
                    Progress _PEntry1 = await db.Progresses.FindAsync(PID);
                    _PEntry1.SiteLevellingProtectiveWork = beneficiaryEntry.SiteLevellingAndProtectiveWork;
                    _PEntry1.UptoPlinthSlab = beneficiaryEntry.UptoPlinthSlab;
                    _PEntry1.CastingOfSlab = beneficiaryEntry.CastingOfSlab;
                    _PEntry1.SepticTank = beneficiaryEntry.SepticTank;
                    _PEntry1.HandOver = beneficiaryEntry.HandOver;
                    _PEntry1.BrickPlasterWork = beneficiaryEntry.BrickPlasterWork;
                    _PEntry1.DoorWindows = beneficiaryEntry.DoorWindows;
                    _PEntry1.ElectrificationPlumbing = beneficiaryEntry.ElectrificationPlumbing;
                    _PEntry1.PaitingFinishing = beneficiaryEntry.PaitingFinishing;
                    _PEntry1.DateOfCommencement = Convert.ToDateTime(beneficiaryEntry.DateOfCommencement);
                    _PEntry1.DateOfCompletion = Convert.ToDateTime(beneficiaryEntry.DateOfCompletion);
                    db.Entry(_PEntry1).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                }
                else
                {
                    Progress _PEntry = new Progress();
                    _PEntry.BeneficiaryID = id;
                    _PEntry.FormID = beneficiaryEntry.FormID;
                    _PEntry.SiteLevellingProtectiveWork = beneficiaryEntry.SiteLevellingAndProtectiveWork;
                    _PEntry.UptoPlinthSlab = beneficiaryEntry.UptoPlinthSlab;
                    _PEntry.CastingOfSlab = beneficiaryEntry.CastingOfSlab;
                    _PEntry.SepticTank = beneficiaryEntry.SepticTank;
                    _PEntry.HandOver = beneficiaryEntry.HandOver;
                    _PEntry.BrickPlasterWork = beneficiaryEntry.BrickPlasterWork;
                    _PEntry.DoorWindows = beneficiaryEntry.DoorWindows;
                    _PEntry.ElectrificationPlumbing = beneficiaryEntry.ElectrificationPlumbing;
                    _PEntry.PaitingFinishing = beneficiaryEntry.PaitingFinishing;
                    _PEntry.DateOfCommencement = Convert.ToDateTime(beneficiaryEntry.DateOfCommencement);
                    _PEntry.DateOfCompletion = Convert.ToDateTime(Convert.ToDateTime(beneficiaryEntry.DateOfCompletion).ToString("MM/dd/yyyy"));
                    _PEntry.IsActive = true;
                    _PEntry.CreatedBy = Convert.ToInt32(System.Web.HttpContext.Current.Session["UID"]);
                    _PEntry.CreatedDate = DateTime.Now;
                    db.Progresses.Add(_PEntry);
                    await db.SaveChangesAsync();
                }

                BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
                var result = (from ce in db.BeneficiaryEntries
                              where ce.IsActive == true && ce.ID == id
                              select new
                              {
                                  ID = ce.ID,
                                  FormID = ce.FormID,
                                  AllotmentNo = ce.AllotmentNo,
                                  BeneficiaryName = ce.BeneficiaryName,
                                  MobileNo = ce.MobileNo,
                                  AadharNo = ce.AadharNo,
                                  WardName = ce.WardName,
                                  ConstituencyID = ce.ConstituencyID,
                                  ADCID = ce.ADCID,
                                  BlockID = ce.BlockID,
                                  GPUName = ce.GPUName
                              }).ToList()
                 .Select(d => new BeneficiaryEntryModel()
                 {
                     ID = d.ID,
                     FormID = d.FormID,
                     AllotmentNo = d.AllotmentNo,
                     BeneficiaryName = d.BeneficiaryName,
                     MobileNo = d.MobileNo,
                     AadharNo = d.AadharNo,
                     WardName = d.WardName,
                     ConstituencyID = d.ConstituencyID,
                     ADCID = d.ADCID,
                     BlockID = d.BlockID,
                     GPUName = d.GPUName
                 });
                _cEntry = result.FirstOrDefault();
                _cEntry.ConstituencyList = new SelectList(ListFillerConstituency(), "ID", "ConstituencyName");
                _cEntry.ADCList = new SelectList(db.ADCMasters.Select(a =>
                                   new
                                   {
                                       ID = a.ID,
                                       ADC_DevSubDiv = a.ADC_DevSubDiv
                                   }).ToList(), "ID", "ADC_DevSubDiv");

                _cEntry.BlockList = new SelectList(db.BlockMasters.Select(a =>
                                    new
                                    {
                                        ID = a.ID,
                                        BlockName = a.BlockName
                                    }).ToList(), "ID", "BlockName");
                if (_cEntry == null)
                {
                    return HttpNotFound();
                }
                return View(_cEntry);
            }
            return View(beneficiaryEntry);
        }

        public ActionResult SummaryReport(int formid)
        {
            if (formid == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return Redirect("~/ReportsView/EstoreSummaryReport.aspx?Data=" + formid);
            //return RedirectToAction("Index");
        }
        public ActionResult DetailReport(int formid)
        {
            if (formid == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return Redirect("~/ReportsView/EstoreDetailReport.aspx?Data=" + formid);
            //return RedirectToAction("Index");
        }
    }
}