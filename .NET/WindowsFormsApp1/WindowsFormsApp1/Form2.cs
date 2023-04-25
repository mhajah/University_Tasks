using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form2 : Form
    {
        private string Nazwa { get; set; }
        private string Adres { get; set; }
        private string Cykl { get; set; }
        private bool CzyDzienne { get; set; }
        public Form2(string Nazwa, string Adres, string Cykl, bool CzyDzienne)
        {
            InitializeComponent();
            this.Nazwa = Nazwa;
            this.Adres = Adres;
            this.Cykl = Cykl;
            this.CzyDzienne = CzyDzienne;

            label1.Text = Nazwa;
            label2.Text = Adres;
            label3.Text = Cykl;
            if(CzyDzienne)
            {
                label4.Text = "Dzienne";
            } else
            {
                label4.Text = "Uzupełniające";
            }
            
        }

        private void Form2_Load(object sender, EventArgs e)
        {

        }
    }
}
