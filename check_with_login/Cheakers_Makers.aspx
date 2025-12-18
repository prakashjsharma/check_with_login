<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Cheakers_Makers.aspx.cs" Inherits="check_with_login.Cheakers_Makers" %>

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
                <div class="card-header bg-warning">
                    <h4>Checker – Approval Screen</h4>
                </div>

                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <asp:DropDownList ID="ddldept" runat="server" CssClass="form-select" />
                        </div>
                        <div class="col-md-4">
                            <asp:Button ID="search1" runat="server"
                                Text="Search"
                                CssClass="btn btn-primary"
                                OnClick="drpclick" />
                        </div>
                    </div>

                    <asp:GridView ID="grdData" runat="server"
                        CssClass="table table-bordered table-hover">
                        <Columns>
                            <asp:TemplateField HeaderText="Select">
                                <ItemTemplate>
                                    <asp:CheckBox ID="select" runat="server" />
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>

                    <div class="row mt-3">
                        <div class="col-md-4">
                            <asp:Button ID="Button4" runat="server"
                                Text="Approve"
                                CssClass="btn btn-success w-100"
                                OnClick="btnaccept_Click" />
                        </div>

                        <div class="col-md-4">
                            <asp:TextBox ID="txtreason" runat="server"
                                CssClass="form-control"
                                Placeholder="Rejection Reason" />
                        </div>

                        <div class="col-md-4">
                            <asp:Button ID="Button5" runat="server"
                                Text="Reject"
                                CssClass="btn btn-danger w-100"
                                OnClick="btnreject_Click" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </form>
</body>
</html>

