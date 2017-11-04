using SKMISApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SKMISApplication.Controllers
{
    public class BeneficiaryDocumentEntryController : Controller
    {
        private SKMISEntities2 db = new SKMISEntities2();
        public async Task<ActionResult> Index()
        {
            BeneficiaryDocumentModel cdm = new BeneficiaryDocumentModel();
            var result = (from ce in db.BeneficiaryDocuments
                          where ce.IsActive == true
                          select new
                          {
                              BeneficiaryID = ce.BeneficiaryID,
                              ID = ce.ID,
                              BeneficiaryName = ce.BeneficiaryEntry.FullName,
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
            ViewData["BeneficiaryNameList"] = new SelectList(db.BeneficiaryEntries.Select(a => new { ID = a.ID, BeneficiaryNames = a.FullName }).ToList(), "ID", "BeneficiaryNames");

            return View(result.ToList());

        }
        //public ActionResult Upload()
        //{
        //    BeneficiaryDocumentModel _cDoc = new BeneficiaryDocumentModel();
        //    //_cDoc.DocList = new SelectList(ListFillerDoc(), "ID", "DocumentTitle");
        //    _cDoc.NameList = new SelectList(ListFillerName(), "ID", "FullName");
        //    return View(_cDoc);
        //}
        //public IEnumerable<Name> ListFillerName()
        //{
        //    var result = (from an in db.BeneficiaryEntries
        //                  where an.IsActive == true
        //                  select new
        //                  {
        //                      ID = an.ID,
        //                      BeneficiaryName = an.FullName
        //                  }).ToList()
        //     .Select(d => new Name()
        //     {
        //         ID = d.ID,
        //         FullName = d.BeneficiaryName
        //     });
        //    return result;
        //}


        [HttpPost]
        public async Task<ActionResult> Upload(HttpPostedFileBase file, BeneficiaryDocumentModel _beneficiaryDocuments)
        {            
            //if (ModelState.IsValid)
            {
                string datetime = DateTime.Now.ToString("yyyyMMddHHmmss");
                string dbSavePath = "~/Images/" + datetime + file.FileName;
                string path = Server.MapPath(dbSavePath);
                BeneficiaryDocument _cDocument = new BeneficiaryDocument();
                _cDocument.FileLocation = dbSavePath;
                _cDocument.BeneficiaryID = _beneficiaryDocuments.BeneficiaryID;
                _cDocument.DocumentName = _beneficiaryDocuments.DocumentName;
                _cDocument.CreatedDate = DateTime.Now;
                _cDocument.IsActive = true;
                file.SaveAs(path);
                db.BeneficiaryDocuments.Add(_cDocument);
                //ViewBag.Path = path;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewData["BeneficiaryNameList"] = new SelectList(db.BeneficiaryEntries.Select(a => new { ID = a.ID, BeneficiaryNames = a.FullName }).ToList(), "ID", "BeneficiaryNames");
            return View(_beneficiaryDocuments);
        }

    }
}