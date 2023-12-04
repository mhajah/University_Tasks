using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace zad2
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string username = txtUsername.Text.Trim();
            string password = txtPassword.Text.Trim();

            if (AuthenticateUser(username, password))
            {
                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
                                                 1, username,
                                                 DateTime.Now, DateTime.Now.AddMinutes(20),
                                                 false, string.Empty);
                HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName);
                cookie.Value = FormsAuthentication.Encrypt(ticket);
                HttpContext.Current.Response.AppendCookie(cookie);


                var returnUrl = this.Request.QueryString["ReturnUrl"];
                if (string.IsNullOrEmpty(returnUrl))
                {
                    returnUrl = FormsAuthentication.DefaultUrl;
                }
                this.Response.Redirect(returnUrl);
            }
            else
            {
                lblMessage.Text = "Nieprawidłowe dane logowania.";
            }
        }

        protected void btnRegister_Click(object sender, EventArgs e)
        {
            string username = txtNewUsername.Text.Trim();
            string email = txtEmail.Text.Trim();
            string password = txtNewPassword.Text.Trim();

            if (RegisterUser(username, email, password))
            {
                lblRegisterMessage.Text = "Rejestracja udana. Możesz teraz się zalogować.";
            }
            else
            {
                lblRegisterMessage.Text = "Rejestracja nieudana. Spróbuj ponownie.";
            }
        }

        private bool AuthenticateUser(string username, string password)
        {
            string connectionString = "Data Source=DESKTOP-KOA3STB\\SQLEXPRESS;Initial Catalog=users;Integrated Security=True";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = "SELECT PasswordHash, Salt, Rounds FROM [PASSWORD] WHERE Username = @Username";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Username", username);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var storedHash = reader["PasswordHash"].ToString().Trim();
                            string salt = reader["Salt"].ToString().Trim();
                            int rounds = Convert.ToInt32(reader["Rounds"]);

                            string enteredHash = HashPassword(password, salt, rounds).ToString();

                            return (storedHash == enteredHash);
                        }
                    }
                }
            }

            return false;
        }

        private bool RegisterUser(string username, string email, string password)
        {
            string connectionString = "Data Source=DESKTOP-KOA3STB\\SQLEXPRESS;Initial Catalog=users;Integrated Security=True";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string salt = GenerateSalt();
                string hashedPassword = HashPassword(password, salt, 10000); 

                string userQuery = "INSERT INTO [USER] (Username, Email) VALUES (@Username, @Email)";
                string passwordQuery = "INSERT INTO [PASSWORD] (Username, PasswordHash, Salt, Rounds) VALUES (@Username, @PasswordHash, @Salt, @Rounds)";

                using (SqlCommand userCommand = new SqlCommand(userQuery, connection))
                {
                    userCommand.Parameters.AddWithValue("@Username", username);
                    userCommand.Parameters.AddWithValue("@Email", email);

                    userCommand.ExecuteNonQuery();
                }

                using (SqlCommand passwordCommand = new SqlCommand(passwordQuery, connection))
                {
                    passwordCommand.Parameters.AddWithValue("@Username", username);
                    passwordCommand.Parameters.AddWithValue("@PasswordHash", hashedPassword);
                    passwordCommand.Parameters.AddWithValue("@Salt", salt);
                    passwordCommand.Parameters.AddWithValue("@Rounds", 10000); 
                    passwordCommand.ExecuteNonQuery();
                }

                return true;
            }
        }

        private string GenerateSalt()
        {
            byte[] saltBytes = new byte[16];
            using (RandomNumberGenerator rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(saltBytes);
            }

            return Convert.ToBase64String(saltBytes);
        }

        private string HashPassword(string password, string salt, int rounds)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] saltBytes = Convert.FromBase64String(salt);

            using (Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(passwordBytes, saltBytes, rounds))
            {
                byte[] hash = pbkdf2.GetBytes(32); 
                return Convert.ToBase64String(hash);
            }
        }
    }
}

