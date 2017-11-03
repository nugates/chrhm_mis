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
    public class OwnerType
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
    public class HouseCategory
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
    public class StructureType
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
    public class Caste
    {
        public long ID { get; set; }
        public string CasteName { get; set; }
    }
    public class Document
    {
        public long ID { get; set; }
        public string DocumentName { get; set; }
    }
    public class Name
    {
        public long ID { get; set; }
        public string FullName { get; set; }
    }
    public class Title
    {
        public long ID { get; set; }
        public string NOCTitle { get; set; }
    }
    public class House
    {
        public long ID { get; set; }
        public string HouseNumber { get; set; }
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
    public class Disability
    {
        public long ID { get; set; }
        public string DisabilityType { get; set; }
    }
}