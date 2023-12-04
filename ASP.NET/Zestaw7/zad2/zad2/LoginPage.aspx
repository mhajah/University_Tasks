<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginPage.aspx.cs" Inherits="zad2.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h2>Login</h2>
            <asp:Label ID="lblMessage" runat="server" ForeColor="Red" EnableViewState="false"></asp:Label>
            <br />
            <asp:TextBox ID="txtUsername" runat="server" placeholder="Username" AutoPostBack="true"></asp:TextBox>
            <br />
            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" placeholder="Password"></asp:TextBox>
            <br />
            <asp:Button ID="btnLogin" runat="server" Text="Login" OnClick="btnLogin_Click" />
            <br />
            <hr />
            <h2>Register</h2>
            <asp:Label ID="lblRegisterMessage" runat="server" ForeColor="Green" EnableViewState="false"></asp:Label>
            <br />
            <asp:TextBox ID="txtNewUsername" runat="server" placeholder="New Username" AutoPostBack="true"></asp:TextBox>
            <br />
            <asp:TextBox ID="txtEmail" runat="server" placeholder="Email" AutoPostBack="true"></asp:TextBox>
            <br />
            <asp:TextBox ID="txtNewPassword" runat="server" TextMode="Password" placeholder="New Password"></asp:TextBox>
            <br />
            <asp:Button ID="btnRegister" runat="server" Text="Register" OnClick="btnRegister_Click" />
        </div>
    </form>
</body>
</html>
