using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using z5crud.Models;

namespace z5crud.DataAccessLayer
{
    public class StudentContext : DbContext
    {
        public StudentContext() : base("StudentContext") { }

        public DbSet<StudentModel> Students { get; set; }
    }
}