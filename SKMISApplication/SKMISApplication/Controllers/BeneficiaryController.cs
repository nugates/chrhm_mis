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
    public class BeneficiaryController : Controller
    {
        private SKMISEntities3 db = new SKMISEntities3();
        // GET: Beneficiary
        public ActionResult Index()
        {
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            var result = (from ce in db.BeneficiaryEntries
                          join wm in db.WardMasters on ce.WardID equals wm.ID
                          join qm in db.QualificationMasters on ce.Qualification equals qm.ID.ToString()
                          join cm in db.CasteMasters on ce.Caste equals cm.ID.ToString()
                          join om in db.OccupationMasters on ce.Occupation equals om.ID.ToString()
                          where ce.IsActive == true
                          select new
                          {
                              ID = ce.ID,
                              FullName = ce.FullName,
                              DateOfBirth = ce.DateOfBirth,
                              FatherOrMotherName = ce.FatherOrMotherName,
                              MobileNo = ce.MobileNo,
                              Religion = ce.Religion,
                              WardName = wm.WardName,
                              EmploymentType = ce.EmploymentType,
                              AadharNo = ce.AadharNo,
                              Gender = ce.Gender,
                              MaritialStatus = ce.MaritialStatus,
                              CasteName = cm.CasteName,
                              QualificationName = qm.QualificationName,
                              OccupationTitle = om.OccupationTitle,
                              AnnualIncome = ce.AnnualIncome
                          }).ToList()
                          .Select(d => new BeneficiaryEntryModel()
                          {
                              ID = d.ID,
                              FullName = d.FullName,
                              DateOfBirth = d.DateOfBirth,
                              FatherOrMotherName = d.FatherOrMotherName,
                              MobileNo = d.MobileNo,
                              Religion = d.Religion,
                              WardName = d.WardName,
                              EmploymentType = d.EmploymentType,
                              AadharNo = d.AadharNo,
                              Gender = d.Gender,
                              MaritialStatus = d.MaritialStatus,
                              CasteName = d.CasteName,
                              QualificationName = d.QualificationName,
                              OccupationName = d.OccupationTitle,
                              AnnualIncome = d.AnnualIncome
                          });
            return View(result.ToList());
        }

        public ActionResult Create()
        {
            BeneficiaryEntryModel _cEntry = new BeneficiaryEntryModel();
            _cEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            _cEntry.CasteList = new SelectList(ListFillerCaste(), "ID", "CasteName");
            _cEntry.OccupationList = new SelectList(ListFillerOccupation(), "ID", "OccupationTitle");
            _cEntry.QualificationList = new SelectList(ListFillerQualification(), "ID", "QualificationName");
            return View(_cEntry);
        }

        [HttpPost]
        public async Task<ActionResult> Create(BeneficiaryEntryModel beneficiaryEntry)
        {
            BeneficiaryEntry _cEntry = new BeneficiaryEntry();
            if (ModelState.IsValid)
            {
                _cEntry.FullName = beneficiaryEntry.FullName;
                _cEntry.DateOfBirth = beneficiaryEntry.DateOfBirth;
                _cEntry.FatherOrMotherName = beneficiaryEntry.FatherOrMotherName;
                _cEntry.MobileNo = beneficiaryEntry.MobileNo;
                _cEntry.Religion = beneficiaryEntry.Religion;
                _cEntry.EmploymentType = beneficiaryEntry.EmploymentType;
                _cEntry.WardID = beneficiaryEntry.WardID;
                _cEntry.AadharNo = beneficiaryEntry.AadharNo;
                _cEntry.Gender = beneficiaryEntry.Gender;
                _cEntry.MaritialStatus = beneficiaryEntry.MaritialStatus;
                _cEntry.Caste = beneficiaryEntry.CasteID;
                _cEntry.Qualification = beneficiaryEntry.QualificationID;
                _cEntry.Occupation = beneficiaryEntry.OccupationID;
                _cEntry.AnnualIncome = beneficiaryEntry.AnnualIncome;
                _cEntry.Category = beneficiaryEntry.Category;
                _cEntry.IsActive = true;
                _cEntry.CreatedDate = DateTime.Now;
                db.BeneficiaryEntries.Add(_cEntry);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            beneficiaryEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            beneficiaryEntry.CasteList = new SelectList(ListFillerCaste(), "ID", "CasteName");
            beneficiaryEntry.OccupationList = new SelectList(ListFillerOccupation(), "ID", "OccupationTitle");
            beneficiaryEntry.QualificationList = new SelectList(ListFillerQualification(), "ID", "QualificationName");
            return View(beneficiaryEntry);
        }


        public async Task<ActionResult> ViewDocument(long? id)
        {
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
                              BeneficiaryName = ce.BeneficiaryEntry.FullName,
                              DocumentName = ce.DocumentName,
                              FileLocation = ce.FileLocation
                          }).ToList()
                          .Select(d => new BeneficiaryDocumentModel()
                          {
                              BeneficiaryID = d.BeneficiaryID,
                              ID = d.ID,
                              BeneficiaryName = d.BeneficiaryName,
                              DocumentName = d.DocumentName,
                              FileLocation = d.FileLocation
                          });
            return View(result.ToList());
        }

        public async Task<ActionResult> Edit(long? id)
        {
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
                              FullName = ce.FullName,
                              DateOfBirth = ce.DateOfBirth,
                              FatherOrMotherName = ce.FatherOrMotherName,
                              Gender = ce.Gender,
                              MobileNo = ce.MobileNo,
                              Religion = ce.Religion,
                              EmploymentType = ce.EmploymentType,
                              MaritialStatus = ce.MaritialStatus,
                              WardID = ce.WardID,
                              AadharNo = ce.AadharNo,
                              AnnualIncome = ce.AnnualIncome,
                              Category = ce.Category,
                              Caste = ce.Caste,
                              Qualification = ce.Qualification,
                              Occupation = ce.Occupation
                          }).ToList()
             .Select(d => new BeneficiaryEntryModel()
             {
                 ID = d.ID,
                 FullName = d.FullName,
                 DateOfBirth = d.DateOfBirth,
                 FatherOrMotherName = d.FatherOrMotherName,
                 Gender = d.Gender,
                 MobileNo = d.MobileNo,
                 Religion = d.Religion,
                 EmploymentType = d.EmploymentType,
                 WardID = d.WardID,
                 AadharNo = d.AadharNo,
                 AnnualIncome = d.AnnualIncome,
                 MaritialStatus = d.MaritialStatus,
                 Category = d.Category,
                 CasteID = d.Caste,
                 QualificationID = d.Qualification,
                 OccupationID = d.Occupation
             });
            _cEntry = result.FirstOrDefault();
            _cEntry.WardList = new SelectList(ListFillerWard(), "ID", "WardName");
            _cEntry.CasteList = new SelectList(ListFillerCaste(), "ID", "CasteName");
            _cEntry.OccupationList = new SelectList(ListFillerOccupation(), "ID", "OccupationTitle");
            _cEntry.QualificationList = new SelectList(ListFillerQualification(), "ID", "QualificationName");

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
                _pDetail.FullName = beneficiaryEntry.FullName;
                _pDetail.DateOfBirth = beneficiaryEntry.DateOfBirth;
                _pDetail.FatherOrMotherName = beneficiaryEntry.FatherOrMotherName;
                _pDetail.Gender = beneficiaryEntry.Gender;
                _pDetail.MobileNo = beneficiaryEntry.MobileNo;
                _pDetail.Religion = beneficiaryEntry.Religion;
                _pDetail.EmploymentType = beneficiaryEntry.EmploymentType;
                _pDetail.WardID = beneficiaryEntry.WardID;
                _pDetail.AadharNo = beneficiaryEntry.AadharNo;
                _pDetail.Caste = beneficiaryEntry.CasteID;
                _pDetail.Qualification = beneficiaryEntry.QualificationID;
                _pDetail.Occupation = beneficiaryEntry.OccupationID;
                _pDetail.AnnualIncome = beneficiaryEntry.AnnualIncome;
                _pDetail.Category = beneficiaryEntry.Category;
                _pDetail.IsActive = true;
                _pDetail.UpdatedDate = DateTime.Now;
                _pDetail.UpdatedBy = 0;
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

            var BeneficiaryName = (from ce in db.BeneficiaryEntries
                          where ce.IsActive == true && ce.ID == id
                          select ce).ToList();

            ViewData["BeneficiaryName"] = BeneficiaryName.Select(a => a.FullName).FirstOrDefault();
            ViewData["BeneficiaryID"] = id;
            //ViewData["BeneficiaryNameList"] = new SelectList(db.BeneficiaryEntries.Select(a => new { ID = a.ID, BeneficiaryNames = a.FullName }).ToList(), "ID", "BeneficiaryNames");

            return View(result.ToList());
        }

        public IEnumerable<Ward> ListFillerWard()
        {
            var result = (from an in db.WardMasters
                          where an.IsActive == true
                          select new
                          {
                              ID = an.ID,
                              WardNumber = an.WardNumber + " - " + an.WardName
                          }).ToList()
                         .Select(d => new Ward()
                         {
                             ID = d.ID,
                             WardName = d.WardNumber
                         });
            return result;
        }

        public IEnumerable<Caste> ListFillerCaste()
        {
            var result = (from an in db.CasteMasters
                          where an.IsActive == true
                          select new
                          {
                              ID = an.ID,
                              CasteName = an.CasteName
                          }).ToList()
                         .Select(d => new Caste()
                         {
                             ID = d.ID,
                             CasteName = d.CasteName
                         });
            return result;
        }
        public IEnumerable<Occupation> ListFillerOccupation()
        {
            var result = (from an in db.OccupationMasters
                          where an.IsActive == true
                          select new
                          {
                              ID = an.ID,
                              OccupationTitle = an.OccupationTitle
                          }).ToList()
                         .Select(d => new Occupation()
                         {
                             ID = d.ID,
                             OccupationTitle = d.OccupationTitle
                         });
            return result;
        }
        public IEnumerable<Qualification> ListFillerQualification()
        {
            var result = (from an in db.QualificationMasters
                          where an.IsActive == true
                          select new
                          {
                              ID = an.ID,
                              QualificationName = an.QualificationName
                          }).ToList()
                         .Select(d => new Qualification()
                         {
                             ID = d.ID,
                             QualificationName = d.QualificationName
                         });
            return result;
        }
        public IEnumerable<Disability> ListFillerDisability()
        {
            var result = (from an in db.DisabilityMasters
                          where an.IsActive == true
                          select new
                          {
                              ID = an.ID,
                              DisabilityType = an.DisabilityType
                          }).ToList()
                         .Select(d => new Disability()
                         {
                             ID = d.ID,
                             DisabilityType = d.DisabilityType
                         });
            return result;
        }
    }
}