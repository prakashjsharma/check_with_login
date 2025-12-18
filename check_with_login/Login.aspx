<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="check_with_login.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <style type="text/css">
        .auto-style1 {
            width: 403px;
            margin-left: 440px;
        }

        .auto-style2 {
            width: 411px;
            margin-left: 440px;
        }

        .auto-style3 {
            margin-left: 480px;
        }
    </style>
</head>

<body>
    <form id="form1" runat="server">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card shadow-lg">
                        <div class="card-header text-center bg-primary text-white">
                            <h4>User Login</h4>
                        </div>
                        <div class="card-body">

                            <div class="mb-3">
                                <label class="form-label">Username</label>
                                <asp:TextBox ID="txtUserName" runat="server" CssClass="form-control" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" CssClass="form-control" />
                            </div>

                            <div class="d-grid">
                                <asp:Button ID="Button1" runat="server" Text="Login"
                                    CssClass="btn btn-primary" OnClick="Button1_Click" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
