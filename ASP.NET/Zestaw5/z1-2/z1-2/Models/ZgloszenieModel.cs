using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace z1_2.Models
{
    public class ZgloszenieModel
    {
        [Required]
        [MinLength(3)]
        public string Imie { get; set; }
        [Required]
        public string Nazwisko { get; set; }
        [Required]
        public DateTime Data { get; set; }
        [Required]
        public List<ZadanieModel> Zadania { get; set; }

    }
    public class ZadanieModel
    {
        public int Numer { get; set; }
        [Required(ErrorMessage = "Pole {0} jest wymagane.")]
        [Range(0, 10, ErrorMessage = "Liczba punktów musi być między {1} a {2}.")]
        public int Punkty { get; set; }
    }
}