<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="zad7.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="fileUploadForm" enctype="multipart/form-data" runat="server">
        <input type="file" id="fileInput" runat="server" />
        <asp:Button ID="uploadButton" runat="server" Text="Upload File" OnClick="UploadFile" />
    </form>
</body>
</html>
