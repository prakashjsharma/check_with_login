//--########################################## DBHelper.cs ############################################

//using System.Configuration;
//using System.Data.SqlClient;

//public class DBHelper
//{
//    public static SqlConnection GetConnection()
//    {
//        return new SqlConnection(
//            ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString
//        );
//    }
//}


//--########################################## Cheakers_Makers.aspx ############################################
//<html xmlns="http://www.w3.org/1999/xhtml">
//<head runat="server">
//    <title></title>
//    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
//    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

//</head>
//<body>
//    <form id="form1" runat="server">
//        <div class="container mt-4">

//            <div class="card shadow">
//                <div class="card-header bg-warning">
//                    <h4>Checker – Approval Screen</h4>
//                </div> 

//                <div class="card-body">
//                    <div class="row mb-3">
//                        <div class="col-md-4">
//                            <asp:DropDownList ID="ddldept" runat="server" CssClass="form-select" />
//                        </div>
//                        <div class="col-md-4">
//                            <asp:Button ID="search1" runat="server"
//                                Text="Search"
//                                CssClass="btn btn-primary"
//                                OnClick="drpclick" />
//                        </div>
//                    </div>

//                    <asp:GridView ID="grdData" runat="server"
//    DataKeyNames="EmpId"
//    CssClass="table table-bordered">
//                        <Columns>
//                            <asp:TemplateField HeaderText="Select">
//                                <ItemTemplate>
//                                    <asp:CheckBox ID="select" runat="server" />
//                                </ItemTemplate>
//                            </asp:TemplateField>
//                        </Columns>
//                    </asp:GridView>

//                    <div class="row mt-3">
//                        <div class="col-md-4">
//                            <asp:Button ID="Button4" runat="server"
//                                Text="Approve"
//                                CssClass="btn btn-success w-100"
//                                OnClick="btnaccept_Click" />
//                        </div>

//                        <div class="col-md-4">
//                            <asp:TextBox ID="txtreason" runat="server"
//                                CssClass="form-control"
//                                Placeholder="Rejection Reason" />
//                        </div>

//                        <div class="col-md-4">
//                            <asp:Button ID="Button5" runat="server"
//                                Text="Reject"
//                                CssClass="btn btn-danger w-100"
//                                OnClick="btnreject_Click" />
//                        </div>
//                    </div>

//                </div>
//            </div>
//        </div>
//    </form>
//</body>
//</html>




//--########################################## Cheakers_Makers.aspx.cs ############################################

//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Data.SqlClient;
//using System.IO;
//using System.Linq;
//using System.Net.Mail;
//using System.Web;
//using System.Web.UI;
//using System.Web.UI.WebControls;
//using System.Xml.Linq;
//namespace check_with_login


//{
//    public partial class Cheakers_Makers : System.Web.UI.Page
//    {
//        SqlConnection connection = DBHelper.GetConnection();

//        protected void Page_Load(object sender, EventArgs e)
//        {
//            if (!IsPostBack)
//            {
//                binddata();
//                bindddl();
//            }
//        }
//        private void binddata()
//        {
//            using (SqlConnection con = DBHelper.GetConnection())
//            {
//                SqlCommand command = new SqlCommand(
//                @"SELECT M.EmpId, M.EmpCode, M.EmpName, M.PhoneNo, M.Email, M.Dob,
//                 D.deptname, M.Status, M.Reason
//          FROM Maker M
//          INNER JOIN department D ON D.deptid = M.deptid", con);

//                SqlDataAdapter d = new SqlDataAdapter(command);
//                DataTable dt = new DataTable();
//                d.Fill(dt);

//                grdData.DataSource = dt;
//                grdData.DataBind();
//            }
//        }

//        private void bindddl()
//        {
//            SqlCommand command = new SqlCommand("select deptid, deptname from department", connection);
//            SqlDataAdapter d = new SqlDataAdapter(command);
//            DataTable dt = new DataTable();
//            d.Fill(dt);
//            ddldept.DataSource = dt;
//            ddldept.DataTextField = "deptname";
//            ddldept.DataValueField = "deptid";
//            ddldept.Items.Insert(0, new ListItem("-- Select Department --", "0"));
//            ddldept.DataBind();

//        }

//        protected void btnaccept_Click(object sender, EventArgs e)
//        {
//            foreach (GridViewRow row in grdData.Rows)
//            {
//                CheckBox chk = (CheckBox)row.FindControl("select");
//                if (chk != null && chk.Checked)
//                {
//                    int empId = Convert.ToInt32(grdData.DataKeys[row.RowIndex].Value);
//                    save(empId.ToString(), "Approved", "");

//                }
//            }
//        }
//        private void save(string EmpID, string status, string reason)
//        {
//            using (SqlConnection con = DBHelper.GetConnection())
//            {
//                using (SqlCommand command = new SqlCommand("Update_Details", con))
//                {
//                    command.CommandType = CommandType.StoredProcedure;
//                    command.Parameters.AddWithValue("@status", status);
//                    command.Parameters.AddWithValue("@reason", reason);
//                    command.Parameters.AddWithValue("@Id", Convert.ToInt32(EmpID));
//                    command.Parameters.AddWithValue("@deptname", ddldept.SelectedValue);
//                    con.Open();
//                    command.ExecuteNonQuery();
//                }
//            }
//            binddata();
//        }

//        protected void btnreject_Click(object sender, EventArgs e)
//        {
//            foreach (GridViewRow row in grdData.Rows)
//            {
//                CheckBox chk = (CheckBox)row.FindControl("select");
//                if (chk != null && chk.Checked)
//                {
//                    int empId = Convert.ToInt32(grdData.DataKeys[row.RowIndex].Value);
//                    save(empId.ToString(), "Reject", txtreason.Text);
//                }
//            }
//        }
//        protected void Button1_Click(object sender, EventArgs e)
//        {

//        }

//        public override void VerifyRenderingInServerForm(Control control)
//        {
//            // base.VerifyRenderingInServerForm(control);
//        }

//        protected void drpclick(object sender, EventArgs e)
//        {
//            using (SqlConnection con = DBHelper.GetConnection())
//            {
//                SqlCommand cmd = new SqlCommand(
//                @"SELECT M.EmpId, M.EmpCode, M.EmpName, M.PhoneNo, M.Email, M.Dob,
//                 D.deptname, M.Status, M.Reason
//          FROM Maker M
//          INNER JOIN department D ON D.deptid = M.deptid
//          WHERE M.deptid = @deptid", con);

//                cmd.Parameters.AddWithValue("@deptid", ddldept.SelectedValue);

//                SqlDataAdapter da = new SqlDataAdapter(cmd);
//                DataTable dt = new DataTable();
//                da.Fill(dt);

//                grdData.DataSource = dt;
//                grdData.DataBind();
//            }
//        }


//    }
//}


//--########################################## Maker.aspx ############################################

//<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Maker.aspx.cs" Inherits="check_with_login.Maker" %>

//<!DOCTYPE html>

//<html xmlns="http://www.w3.org/1999/xhtml">
//<head runat="server">
//    <title></title>
//    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
//    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

//</head>
//<body>
//    <form id="form1" runat="server">
//        <div class="container mt-4">
//            <div class="card shadow">
//                <div class="card-header bg-success text-white">
//                    <h4>Maker – Create Employee</h4>
//                </div>

//                <div class="card-body">
//                    <div class="row g-3">

//                        <div class="col-md-4">
//                            <label class="form-label">Emp Code</label>
//                            <asp:TextBox ID="TextBox1" runat="server" CssClass="form-control" />
//                        </div>

//                        <div class="col-md-4">
//                            <label class="form-label">Emp Name</label>
//                            <asp:TextBox ID="TextBox2" runat="server" CssClass="form-control" />
//                        </div>

//                        <div class="col-md-4">
//                            <label class="form-label">Phone</label>
//                            <asp:TextBox ID="TextBox3" runat="server" CssClass="form-control" />
//                        </div>

//                        <div class="col-md-4">
//                            <label class="form-label">Email</label>
//                            <asp:TextBox ID="TextBox4" runat="server" CssClass="form-control" />
//                        </div>

//                        <div class="col-md-4">
//                            <label class="form-label">DOB</label>
//                            <asp:TextBox ID="TextBox5" runat="server" CssClass="form-control" />
//                        </div>

//                        <div class="col-md-4">
//                            <label class="form-label">Department</label>
//                            <asp:DropDownList ID="ddldept" runat="server" CssClass="form-select"></asp:DropDownList>

//                        </div>

//                    </div>

//                    <div class="mt-3 text-end">
//                        <asp:Button ID="Button1" runat="server" Text="Create"
//                            CssClass="btn btn-success" OnClick="Button1_Click" />
//                    </div>
//                </div>
//            </div>

//            <div class="card mt-4 shadow">
//                <div class="card-header bg-dark text-white">
//                    Employee List
//                </div>
//                <div class="card-body">
//                    <asp:GridView ID="GridView1" runat="server"
//                        CssClass="table table-bordered table-striped table-hover" />
//                </div>
//            </div>
//        </div>
//    </form>
//</body>
//</html>


//--########################################## Maker.aspx.cs ############################################

//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Web;
//using System.Web.UI;
//using System.Web.UI.WebControls;

//namespace check_with_login
//{

//    public partial class Maker : System.Web.UI.Page
//    {
//        SqlConnection connection = DBHelper.GetConnection();
//        protected void Page_Load(object sender, EventArgs e)
//        {
//            if (!IsPostBack)
//            {
//                //bindddl();
//                LoadRecord();
//                BindDepartment();
//            }
//        }
//        protected void Button1_Click(object sender, EventArgs e)
//        {
//            if (ddldept.SelectedValue == "0")
//            {
//                Response.Write("<script>alert('Please select department')</script>");
//                return;
//            }

//            SqlCommand command = new SqlCommand("SP_MakerSave", connection);
//            command.CommandType = CommandType.StoredProcedure;
//            command.Parameters.AddWithValue("@EmpCode", TextBox1.Text);
//            command.Parameters.AddWithValue("@EmpName", TextBox2.Text);
//            command.Parameters.AddWithValue("@PhoneNo", TextBox3.Text);
//            command.Parameters.AddWithValue("@Email", TextBox4.Text);
//            command.Parameters.AddWithValue("@Dob", TextBox5.Text);
//            command.Parameters.AddWithValue("@deptname", ddldept.SelectedValue);
//            connection.Open();
//            command.ExecuteNonQuery();
//            connection.Close();
//            ScriptManager.RegisterStartupScript(this, this.GetType(), "script", "alert('added successfully';)", true);

//            LoadRecord();
//        }
//        //private void bindddl()
//        //{
//        //    SqlCommand command = new SqlCommand("select deptname from department", connection);
//        //    SqlDataAdapter d = new SqlDataAdapter(command);
//        //    DataTable dt = new DataTable();
//        //    d.Fill(dt);
//        //    ddldept.DataSource = dt;
//        //    ddldept.DataTextField = "deptname";
//        //    ddldept.DataValueField = "deptname";
//        //    ddldept.DataBind();
//        //}
//        void LoadRecord()
//        {
//            SqlCommand command = new SqlCommand("GridView", connection);
//            SqlDataAdapter d = new SqlDataAdapter(command);
//            DataTable dt = new DataTable();
//            d.Fill(dt);
//            GridView1.DataSource = dt;
//            GridView1.DataBind();
//        }

//        private void BindDepartment()
//        {
//            using (SqlConnection con = DBHelper.GetConnection())
//            {
//                SqlCommand cmd = new SqlCommand(
//                    "SELECT deptid, deptname FROM department", con);

//                SqlDataAdapter da = new SqlDataAdapter(cmd);
//                DataTable dt = new DataTable();
//                da.Fill(dt);

//                ddldept.DataSource = dt;
//                ddldept.DataTextField = "deptname";  // shown to user
//                ddldept.DataValueField = "deptid";   // saved to DB
//                ddldept.DataBind();

//                ddldept.Items.Insert(0, new ListItem("-- Select Department --", "0"));
//            }
//        }

//    }

//}





//--########################################## Login.aspx ############################################

//<html xmlns="http://www.w3.org/1999/xhtml">
//<head runat="server">
//    <title></title>
//    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
//    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

//    <style type="text/css">
//        .auto-style1 {
//            width: 403px;
//            margin-left: 440px;
//        }

//        .auto-style2 {
//            width: 411px;
//            margin-left: 440px;
//        }

//        .auto-style3 {
//            margin-left: 480px;
//        }
//    </style>
//</head>

//<body>
//    <form id="form1" runat="server">
//        <div class="container mt-5">
//            <div class="row justify-content-center">
//                <div class="col-md-4">
//                    <div class="card shadow-lg">
//                        <div class="card-header text-center bg-primary text-white">
//                            <h4>User Login</h4>
//                        </div>
//                        <div class="card-body">

//                            <div class="mb-3">
//                                <label class="form-label">Username</label>
//                                <asp:TextBox ID="txtUserName" runat="server" CssClass="form-control" />
//                            </div>

//                            <div class="mb-3">
//                                <label class="form-label">Password</label>
//                                <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" CssClass="form-control" />
//                            </div>

//                            <div class="d-grid">
//                                <asp:Button ID="Button1" runat="server" Text="Login"
//                                    CssClass="btn btn-primary" OnClick="Button1_Click" />
//                            </div>

//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>
//    </form>
//</body>
//</html>



//--########################################## Login.aspx.cs ############################################

//using System;
//using System.Configuration;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Web;
//using System.Web.UI;
//using System.Web.UI.WebControls;

//namespace check_with_login
//{
//    public partial class Login : System.Web.UI.Page
//    {
//        SqlConnection connection = DBHelper.GetConnection();

//        protected void Page_Load(object sender, EventArgs e)
//        {
//            if (!IsPostBack)
//            {
//            }
//        }
//        protected void Button1_Click(object sender, EventArgs e)
//        {
//            DataTable dt = checkLogin(txtUserName.Text, txtPassword.Text);
            
//            if (dt.Rows.Count == 0)
//            {
//                Response.Write("<script> alert('invalid user') </script>");
//            }
//            else
//            {
//                if (dt.Rows[0]["Roles"].ToString() == "Maker")
//                {
//                    Response.Redirect("~/Maker.aspx");
//                }
//                else
//                {
//                    Response.Redirect("~/Cheakers_Makers.aspx");

//                }
//            }

//        }
//        public DataTable checkLogin(string username, string password)
//        {
//            using (SqlConnection con = DBHelper.GetConnection())
//            {
//                using (SqlCommand cmd = new SqlCommand(
//                    "SELECT Roles FROM Login_Details WHERE UserName=@UserName AND Password=@Password",
//                    con))
//                {
//                    cmd.Parameters.AddWithValue("@UserName", username);
//                    cmd.Parameters.AddWithValue("@Password", password);

//                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
//                    {
//                        DataTable dt = new DataTable();
//                        da.Fill(dt);
//                        return dt;
//                    }
//                }
//            }
//        }


//    }
//}


//--########################################## Web.Config ############################################

//	<connectionStrings>
//		<add name="DBCS"
//			 connectionString="Server=(localdb)\MSSQLLocalDB;Initial Catalog=check_with_login;Integrated Security=True;"
//			 providerName="System.Data.SqlClient" />
//	</connectionStrings>




//--########################################## SQL ############################################

//USE [master]
//GO
///****** Object:  Database [check_with_login]    Script Date: 18-12-2025 21:30:17 ******/
//CREATE DATABASE [check_with_login]
// CONTAINMENT = NONE
// ON  PRIMARY 
//( NAME = N'check_with_login', FILENAME = N'C:\Users\FTB\check_with_login.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
// LOG ON 
//( NAME = N'check_with_login_log', FILENAME = N'C:\Users\FTB\check_with_login_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
// WITH CATALOG_COLLATION = DATABASE_DEFAULT
//GO
//ALTER DATABASE [check_with_login] SET COMPATIBILITY_LEVEL = 150
//GO
//IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
//begin
//EXEC [check_with_login].[dbo].[sp_fulltext_database] @action = 'enable'
//end
//GO
//ALTER DATABASE [check_with_login] SET ANSI_NULL_DEFAULT OFF 
//GO
//ALTER DATABASE [check_with_login] SET ANSI_NULLS OFF 
//GO
//ALTER DATABASE [check_with_login] SET ANSI_PADDING OFF 
//GO
//ALTER DATABASE [check_with_login] SET ANSI_WARNINGS OFF 
//GO
//ALTER DATABASE [check_with_login] SET ARITHABORT OFF 
//GO
//ALTER DATABASE [check_with_login] SET AUTO_CLOSE OFF 
//GO
//ALTER DATABASE [check_with_login] SET AUTO_SHRINK OFF 
//GO
//ALTER DATABASE [check_with_login] SET AUTO_UPDATE_STATISTICS ON 
//GO
//ALTER DATABASE [check_with_login] SET CURSOR_CLOSE_ON_COMMIT OFF 
//GO
//ALTER DATABASE [check_with_login] SET CURSOR_DEFAULT  GLOBAL 
//GO
//ALTER DATABASE [check_with_login] SET CONCAT_NULL_YIELDS_NULL OFF 
//GO
//ALTER DATABASE [check_with_login] SET NUMERIC_ROUNDABORT OFF 
//GO
//ALTER DATABASE [check_with_login] SET QUOTED_IDENTIFIER OFF 
//GO
//ALTER DATABASE [check_with_login] SET RECURSIVE_TRIGGERS OFF 
//GO
//ALTER DATABASE [check_with_login] SET  DISABLE_BROKER 
//GO
//ALTER DATABASE [check_with_login] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
//GO
//ALTER DATABASE [check_with_login] SET DATE_CORRELATION_OPTIMIZATION OFF 
//GO
//ALTER DATABASE [check_with_login] SET TRUSTWORTHY OFF 
//GO
//ALTER DATABASE [check_with_login] SET ALLOW_SNAPSHOT_ISOLATION OFF 
//GO
//ALTER DATABASE [check_with_login] SET PARAMETERIZATION SIMPLE 
//GO
//ALTER DATABASE [check_with_login] SET READ_COMMITTED_SNAPSHOT OFF 
//GO
//ALTER DATABASE [check_with_login] SET HONOR_BROKER_PRIORITY OFF 
//GO
//ALTER DATABASE [check_with_login] SET RECOVERY SIMPLE 
//GO
//ALTER DATABASE [check_with_login] SET  MULTI_USER 
//GO
//ALTER DATABASE [check_with_login] SET PAGE_VERIFY CHECKSUM  
//GO
//ALTER DATABASE [check_with_login] SET DB_CHAINING OFF 
//GO
//ALTER DATABASE [check_with_login] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
//GO
//ALTER DATABASE [check_with_login] SET TARGET_RECOVERY_TIME = 60 SECONDS 
//GO
//ALTER DATABASE [check_with_login] SET DELAYED_DURABILITY = DISABLED 
//GO
//ALTER DATABASE [check_with_login] SET ACCELERATED_DATABASE_RECOVERY = OFF  
//GO
//ALTER DATABASE [check_with_login] SET QUERY_STORE = OFF
//GO
//USE [check_with_login]
//GO
///****** Object:  Table [dbo].[department]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[department](
//	[DeptId] [int] IDENTITY(1,1) NOT NULL,
//	[DeptName] [varchar](50) NULL,
// CONSTRAINT [PK_department] PRIMARY KEY CLUSTERED 
//(
//	[DeptId] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[Login_Details]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[Login_Details](
//	[UserName] [varchar](50) NULL,
//	[Password] [varchar](50) NULL,
//	[Roles] [varchar](50) NULL,
//	[Id] [int] IDENTITY(1,1) NOT NULL
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[Logins]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[Logins](
//	[Id] [int] IDENTITY(1,1) NOT NULL,
//	[UserName] [nvarchar](20) NOT NULL,
//	[password] [varchar](20) NOT NULL,
//	[role] [varchar](10) NOT NULL,
//PRIMARY KEY CLUSTERED 
//(
//	[Id] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[Maker]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[Maker](
//	[EmpId] [int] IDENTITY(1,1) NOT NULL,
//	[EmpCode] [varchar](50) NULL,
//	[EmpName] [varchar](50) NULL,
//	[PhoneNo] [varchar](50) NULL,
//	[Email] [varchar](50) NULL,
//	[Dob] [varchar](50) NULL,
//	[DeptID] [int] NULL,
//	[Status] [varchar](50) NULL,
//	[Reason] [varchar](50) NULL,
// CONSTRAINT [PK_Maker] PRIMARY KEY CLUSTERED 
//(
//	[EmpId] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[MakerInfo]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[MakerInfo](
//	[id] [int] IDENTITY(1,1) NOT NULL,
//	[Name] [varchar](50) NULL,
//	[Dept] [nvarchar](50) NULL,
//	[Dob] [datetime] NULL,
//	[Doj] [datetime] NULL,
//	[Designation] [int] NULL,
//	[MobNo] [bigint] NULL,
//	[Status] [varchar](50) NULL,
//	[Reason] [varchar](50) NULL,
// CONSTRAINT [PK__MakerInf__3213E83FB4CEF32D] PRIMARY KEY CLUSTERED 
//(
//	[id] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[tbl_login]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[tbl_login](
//	[login_email] [nvarchar](50) NOT NULL,
//	[login_password] [nvarchar](50) NOT NULL,
//	[role_id] [int] NULL,
//UNIQUE NONCLUSTERED 
//(
//	[login_email] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[tbl_roles]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[tbl_roles](
//	[role_id] [int] IDENTITY(1,1) NOT NULL,
//	[role_name] [nvarchar](50) NOT NULL,
//	[role_createdate] [datetime] NULL,
//PRIMARY KEY CLUSTERED 
//(
//	[role_id] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
//UNIQUE NONCLUSTERED 
//(
//	[role_name] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  StoredProcedure [dbo].[GetMakerInfo]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO

//CREATE procedure [dbo].[GetMakerInfo]
//as
//begin
//	begin try
//	     select * from MakerInfo;
//    end try
//	begin catch
//		print 'Error' + Error_Message();
//	end catch
//end
//-----------------------------------------------------------------------------------

//GO
///****** Object:  StoredProcedure [dbo].[GridView]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO

//CREATE proc [dbo].[GridView]
//as 
//begin
//select EmpId,	EmpCode,	EmpName,	PhoneNo,	Email,	Dob,	D.deptname,	Status,	Reason
//FROM Maker M
//INNER JOIN department D ON D.DeptID = M.deptID
//end
//-----------------------------------------------------------------------------------
//GO
///****** Object:  StoredProcedure [dbo].[SP_Getall]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO

//CREATE proc [dbo].[SP_Getall](
//@UserName varchar(50)=null,
//@Password varchar(50)=null,
//@Roles varchar(50)=null,
//@id int=null
//)
//as 
//begin
//select UserName,Password,Roles from Login_Details where UserName=@UserName and 
//Password=@Password
//end
//-----------------------------------------------------------------------------------
//GO
///****** Object:  StoredProcedure [dbo].[sp_InsertMakerById]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO



//CREATE procedure [dbo].[sp_InsertMakerById]
//@Name varchar(20),@Dept varchar(20)
//      ,@Dob datetime
//      ,@Doj datetime
//      ,@Designation int
//      ,@MobNo int
//      ,@Status varchar(20)
//      ,@Reason varchar(20)
//as
//begin
//	begin try
//	     insert into MakerInfo values(@Name,@Dept
//      ,@Dob
//      ,@Doj
//      ,@Designation
//      ,@MobNo
//      ,@Status
//      ,@Reason)
//	end try

//	begin catch
//		print 'Error' + Error_Message();
//	end catch
//end

//-----------------------------------------------------------------------------------
//GO
///****** Object:  StoredProcedure [dbo].[sp_Login]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO

//CREATE PROCEDURE [dbo].[sp_Login]  
//    @Username VARCHAR(30),
//    @Password VARCHAR(20),
//    @LoginResult INT OUTPUT  -- Output parameter
//AS  
//BEGIN  
//    SET NOCOUNT ON;

//    BEGIN TRY  
//        DECLARE @LoginId INT = NULL;  

//        -- Check if user exists
//        SELECT @LoginId = Uid FROM Login WHERE UserName = @Username AND Password = @Password;  

//        -- Handle NULL case (user not found)
//        IF @LoginId IS NULL  
//            SET @LoginResult = 0; -- Invalid login  
//        ELSE  
//            SET @LoginResult = @LoginId; -- Return User ID  

//    END TRY  
//    BEGIN CATCH  
//        SET @LoginResult = -1; -- Indicate error
//        THROW;  -- Rethrow the error for debugging
//    END CATCH  
//END;

//-----------------------------------------------------------------------------------
//GO
///****** Object:  StoredProcedure [dbo].[SP_MakerSave]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO


//CREATE proc [dbo].[SP_MakerSave](
//@Id int = null,
//@EmpCode varchar(50)=null,
//@EmpName varchar(50)=null,
//@PhoneNo varchar(50)=null,
//@Email varchar(50)=null,
//@Dob varchar(50)=null,
//@deptname varchar(50)=null
//)
//as 
//begin
//insert into Maker(EmpCode,EmpName,PhoneNo,Email,Dob,deptID) 
//values(@EmpCode,@EmpName,@PhoneNo,@Email,@Dob,@deptname)
//end

//-----------------------------------------------------------------------------------
//GO
///****** Object:  StoredProcedure [dbo].[Update_Details]    Script Date: 18-12-2025 21:30:17 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO

//CREATE procedure [dbo].[Update_Details](
//@Id int = null,
//@status varchar(50)=null,
//@reason varchar(50)=null,
//@deptname varchar(50)=null
//)
//as 
//begin
//update Maker set [status]=@status, reason=@reason, deptID=@deptname where EmpId=@Id;
//end
//GO
//USE [master]
//GO
//ALTER DATABASE [check_with_login] SET  READ_WRITE 
//GO



//INSERT INTO department VALUES ('HR'), ('IT'), ('Finance');

//INSERT INTO Login_Details(UserName, Password, Roles)
//VALUES
//('maker1', '123', 'Maker'),
//('checker1', '123', 'Checker');
