using System;
using System.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace check_with_login
{
    public partial class Login : System.Web.UI.Page
    {
        SqlConnection connection = DBHelper.GetConnection();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
            }
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            DataTable dt = checkLogin(txtUserName.Text, txtPassword.Text);
            
            if (dt.Rows.Count == 0)
            {
                Response.Write("<script> alert('invalid user') </script>");
            }
            else
            {
                if (dt.Rows[0]["Roles"].ToString() == "Maker")
                {
                    Response.Redirect("~/Maker.aspx");
                }
                else
                {
                    Response.Redirect("~/Cheakers_Makers.aspx");

                }
            }

        }
        public DataTable checkLogin(string username, string password)
        {
            using (SqlConnection con = DBHelper.GetConnection())
            {
                using (SqlCommand cmd = new SqlCommand(
                    "SELECT Roles FROM Login_Details WHERE UserName=@UserName AND Password=@Password",
                    con))
                {
                    cmd.Parameters.AddWithValue("@UserName", username);
                    cmd.Parameters.AddWithValue("@Password", password);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt;
                    }
                }
            }
        }


    }
}
