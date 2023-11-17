using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using z5crud.Models;

namespace z5crud.DataAccessLayer
{
    public class StudentsInitialize : System.Data.Entity.DropCreateDatabaseIfModelChanges<StudentContext>
    {
        protected override void Seed(StudentContext context)
        {
            var students = new List<StudentModel>
            {
                new StudentModel{imie="Michal", nazwisko="Hajahmadov", rok=3, indeks=331496}
            };
            students.ForEach(s => context.Students.Add(s));
            context.SaveChanges();
        }
    }
}
