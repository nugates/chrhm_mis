using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SKMISApplication.Models
{
    public class ListFiller
    {
    }
    public class Ward
    {
        public long ID { get; set; }
        public string WardName { get; set; }
    }
    public class Caste
    {
        public long ID { get; set; }
        public string CasteName { get; set; }
    }
    public class Occupation
    {
        public long ID { get; set; }
        public string OccupationTitle { get; set; }
    }
    public class Qualification
    {
        public long ID { get; set; }
        public string QualificationName { get; set; }
    }
    public class Constituency
    {
        public long ID { get; set; }
        public string ConstituencyName { get; set; }
    }
}