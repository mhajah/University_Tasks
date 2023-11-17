<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Zad8.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <p>Wprowadź swoje dane logowania:</p>
    <div>
        <asp:TextBox ID="textUsername" runat="server" placeholder="Nazwa użytkownika"></asp:TextBox>
    </div>
    <div>
        <asp:TextBox ID="textPassword" runat="server" TextMode="Password" placeholder="Hasło"></asp:TextBox>
    </div>
    <div>
        <asp:Button ID="loginButton" runat="server" Text="Zaloguj" OnClick="loginButton_Click" />
    </div>
    <div>
        <asp:Label ID="lblMessage" runat="server"/>
    </div>
    </form>
</body>
</html>