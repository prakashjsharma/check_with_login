using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
namespace check_with_login


{
    public partial class Cheakers_Makers : System.Web.UI.Page
    {
        SqlConnection connection = DBHelper.GetConnection();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                binddata();
                bindddl();
            }
        }
        private void binddata()
        {
            using (SqlConnection con = DBHelper.GetConnection())
            {
                SqlCommand command = new SqlCommand(
                @"SELECT M.EmpId, M.EmpCode, M.EmpName, M.PhoneNo, M.Email, M.Dob,
                 D.deptname, M.Status, M.Reason
          FROM Maker M
          INNER JOIN department D ON D.deptid = M.deptid", con);

                SqlDataAdapter d = new SqlDataAdapter(command);
                DataTable dt = new DataTable();
                d.Fill(dt);

                grdData.DataSource = dt;
                grdData.DataBind();
            }
        }

        private void bindddl()
        {
            SqlCommand command = new SqlCommand("select deptid, deptname from department", connection);
            SqlDataAdapter d = new SqlDataAdapter(command);
            DataTable dt = new DataTable();
            d.Fill(dt);
            ddldept.DataSource = dt;
            ddldept.DataTextField = "deptname";
            ddldept.DataValueField = "deptid";
            ddldept.Items.Insert(0, new ListItem("-- Select Department --", "0"));
            ddldept.DataBind();

        }

        protected void btnaccept_Click(object sender, EventArgs e)
        {
            foreach (GridViewRow row in grdData.Rows)
            {
                CheckBox chk = (CheckBox)row.FindControl("select");
                if (chk != null && chk.Checked)
                {
                    int empId = Convert.ToInt32(grdData.DataKeys[row.RowIndex].Value);
                    save(empId.ToString(), "Approved", "");

                }
            }
        }
        private void save(string EmpID, string status, string reason)
        {
            using (SqlConnection con = DBHelper.GetConnection())
            {
                using (SqlCommand command = new SqlCommand("Update_Details", con))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@status", status);
                    command.Parameters.AddWithValue("@reason", reason);
                    command.Parameters.AddWithValue("@Id", Convert.ToInt32(EmpID));
                    command.Parameters.AddWithValue("@deptname", ddldept.SelectedValue);
                    con.Open();
                    command.ExecuteNonQuery();
                }
            }
            binddata();
        }

        protected void btnreject_Click(object sender, EventArgs e)
        {
            foreach (GridViewRow row in grdData.Rows)
            {
                CheckBox chk = (CheckBox)row.FindControl("select");
                if (chk != null && chk.Checked)
                {
                    int empId = Convert.ToInt32(grdData.DataKeys[row.RowIndex].Value);
                    save(empId.ToString(), "Reject", txtreason.Text);
                }
            }
        }
        protected void Button1_Click(object sender, EventArgs e)
        {

        }

        public override void VerifyRenderingInServerForm(Control control)
        {
            // base.VerifyRenderingInServerForm(control);
        }

        protected void drpclick(object sender, EventArgs e)
        {
            using (SqlConnection con = DBHelper.GetConnection())
            {
                SqlCommand cmd = new SqlCommand(
                @"SELECT M.EmpId, M.EmpCode, M.EmpName, M.PhoneNo, M.Email, M.Dob,
                 D.deptname, M.Status, M.Reason
          FROM Maker M
          INNER JOIN department D ON D.deptid = M.deptid
          WHERE M.deptid = @deptid", con);

                cmd.Parameters.AddWithValue("@deptid", ddldept.SelectedValue);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);

                grdData.DataSource = dt;
                grdData.DataBind();
            }
        }


    }
}
