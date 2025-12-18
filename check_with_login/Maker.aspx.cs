using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace check_with_login
{

    public partial class Maker : System.Web.UI.Page
    {
        SqlConnection connection = DBHelper.GetConnection();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //bindddl();
                LoadRecord();
                BindDepartment();
            }
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            if (ddldept.SelectedValue == "0")
            {
                Response.Write("<script>alert('Please select department')</script>");
                return;
            }

            SqlCommand command = new SqlCommand("SP_MakerSave", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@EmpCode", TextBox1.Text);
            command.Parameters.AddWithValue("@EmpName", TextBox2.Text);
            command.Parameters.AddWithValue("@PhoneNo", TextBox3.Text);
            command.Parameters.AddWithValue("@Email", TextBox4.Text);
            command.Parameters.AddWithValue("@Dob", TextBox5.Text);
            command.Parameters.AddWithValue("@deptname", ddldept.SelectedValue);
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
            ScriptManager.RegisterStartupScript(this, this.GetType(), "script", "alert('added successfully';)", true);

            LoadRecord();
        }
        //private void bindddl()
        //{
        //    SqlCommand command = new SqlCommand("select deptname from department", connection);
        //    SqlDataAdapter d = new SqlDataAdapter(command);
        //    DataTable dt = new DataTable();
        //    d.Fill(dt);
        //    ddldept.DataSource = dt;
        //    ddldept.DataTextField = "deptname";
        //    ddldept.DataValueField = "deptname";
        //    ddldept.DataBind();
        //}
        void LoadRecord()
        {
            SqlCommand command = new SqlCommand("GridView", connection);
            SqlDataAdapter d = new SqlDataAdapter(command);
            DataTable dt = new DataTable();
            d.Fill(dt);
            GridView1.DataSource = dt;
            GridView1.DataBind();
        }

        private void BindDepartment()
        {
            using (SqlConnection con = DBHelper.GetConnection())
            {
                SqlCommand cmd = new SqlCommand(
                    "SELECT deptid, deptname FROM department", con);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);

                ddldept.DataSource = dt;
                ddldept.DataTextField = "deptname";  // shown to user
                ddldept.DataValueField = "deptid";   // saved to DB
                ddldept.DataBind();

                ddldept.Items.Insert(0, new ListItem("-- Select Department --", "0"));
            }
        }

    }

}

