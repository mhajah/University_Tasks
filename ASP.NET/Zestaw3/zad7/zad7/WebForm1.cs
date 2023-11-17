using System;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Text;
using System.Web;
using System.Web.UI;

namespace zad7
{
    public partial class WebForm1 : Page
    {
        protected void UploadFile(object sender, EventArgs e)
        {
            
            if (fileInput.PostedFile != null && fileInput.PostedFile.ContentLength > 0)
            {
                HttpPostedFile uploadedFile = fileInput.PostedFile;
                if (uploadedFile != null)
                {
                    int fileSize = uploadedFile.ContentLength;
                    byte[] fileBytes = new byte[fileSize];

                    uploadedFile.InputStream.Read(fileBytes, 0, fileSize);

                    // Wygeneruj plik tekstowy dynamicznie
                    string fileName = uploadedFile.FileName+"_dane"+".xml";
                    int signature = fileSize % 0xFFFF;

                    string xmlContent = $@"
                <opis>
                    <nazwa>{fileName}</nazwa>
                    <rozmiar>{fileSize}</rozmiar>
                    <sygnatura>{signature}</sygnatura>
                </opis>
            ";

                    // Ustaw nagłówki odpowiedzi
                    Response.Clear();
                    Response.ContentType = "text/xml";

                    // Określenie sposobu przesyłania pliku do przeglądarki
                    Response.AddHeader("Content-Disposition", $"attachment; filename={HttpUtility.UrlEncode(fileName, Encoding.UTF8)}");

                    // Przesłanie pliku XML do przeglądarki
                    Response.Write(xmlContent);
                    Response.End();
                }
            }
        }
    }
}