<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication2.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button ID="btnUstawCiastko" runat="server" Text="Ustaw Ciastko" OnClick="UstawCiastko_Click" />
            <asp:Button ID="btnOdczytajCiastko" runat="server" Text="Odczytaj Ciastko" OnClick="OdczytajCiastko_Click" />
            <asp:Button ID="btnUsunCiastko" runat="server" Text="Usun Ciastko" OnClick="UsunCiastko_Click" />
            <asp:Label ID="lblWartoscCiastka" runat="server"></asp:Label>
        </div>
    </form>
</body>
</html>
