using Antlr.Runtime.Tree;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace z3.Models
{
    public class TestModel
    {
        [RegularExpression("True")]
        public bool flag {  get; set; }
        public string imie {  get; set; }
        public string haslo { get; set; }
        public string rozmiarKoszulki { get; set; }
        public string opis {  get; set; }
        public int listResult { get; set; }
    }
}