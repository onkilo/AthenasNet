using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace AthenasNet.Api.Utilitarios
{
    public class CloudinaryUtil
    {
        public string SubeImagen(string imgenBase64, string descripcion)
        {
            string url = "";

            Cloudinary cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));

            string[] arrBase64 = imgenBase64.Split(',');
            string strBase64 = (arrBase64.Count() > 1) ? arrBase64[1] : arrBase64[0];

            byte[] arrByte = System.Convert.FromBase64String(strBase64);

            MemoryStream ms = new MemoryStream(arrByte);
            
            var ObjUrl = cloudinary.Upload(new ImageUploadParams
            {
                Folder = "athenasnet",
                File = new FileDescription(descripcion, ms)
            });

            url = ObjUrl.Url.ToString();

            return url;
        }
    }
}