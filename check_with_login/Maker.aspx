<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Maker.aspx.cs" Inherits="check_with_login.Maker" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="container mt-4">
            <div class="card shadow">
                <div class="card-header bg-success text-white">
                    <h4>Maker – Create Employee</h4>
                </div>

                <div class="card-body">
                    <div class="row g-3">

                        <div class="col-md-4">
                            <label class="form-label">Emp Code</label>
                            <asp:TextBox ID="TextBox1" runat="server" CssClass="form-control" />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Emp Name</label>
                            <asp:TextBox ID="TextBox2" runat="server" CssClass="form-control" />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Phone</label>
                            <asp:TextBox ID="TextBox3" runat="server" CssClass="form-control" />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Email</label>
                            <asp:TextBox ID="TextBox4" runat="server" CssClass="form-control" />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">DOB</label>
                            <asp:TextBox ID="TextBox5" runat="server" CssClass="form-control" />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Department</label>
                            <asp:DropDownList ID="ddldept" runat="server" CssClass="form-select"></asp:DropDownList>

                        </div>

                    </div>

                    <div class="mt-3 text-end">
                        <asp:Button ID="Button1" runat="server" Text="Create"
                            CssClass="btn btn-success" OnClick="Button1_Click" />
                    </div>
                </div>
            </div>

            <div class="card mt-4 shadow">
                <div class="card-header bg-dark text-white">
                    Employee List
                </div>
                <div class="card-body">
                    <asp:GridView ID="GridView1" runat="server"
                        CssClass="table table-bordered table-striped table-hover" />
                </div>
            </div>
        </div>
    </form>
</body>
</html>
