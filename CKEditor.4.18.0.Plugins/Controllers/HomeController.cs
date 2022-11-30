using CKEditor._4._18._0.Plugins.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CKEditor._4._18._0.Plugins.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult EditHome()
        {
            HomePageEditViewModel model = new HomePageEditViewModel();
            string homeinternal = Server.MapPath("~/Views/Home/HomeInternal.cshtml");
            model.Html = System.IO.File.ReadAllText(homeinternal);


            return View(model);
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult EditHome(HomePageEditViewModel model)
        {
            var homeinternal = Server.MapPath("~/Views/Home/HomeInternal.cshtml");
            System.IO.File.WriteAllText(homeinternal, model.Html);

            return RedirectToAction("Index");
        }

        public ActionResult HomeInternal()
        {
            return PartialView("HomeInternal");
        }

        [HttpPost]
        public ActionResult UploadCustomFile()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    if (files.Count > 0)
                    {
                        HttpPostedFileBase file = files[0];
                        string fname;
                        string fullFilePath = "";

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        string fileExtension = Path.GetExtension(fname);
                        fname = $"{Guid.NewGuid()}{fileExtension}";

                        string clientImageFolder = Server.MapPath("~/Content/Images/uploaded/");
                        if (!Directory.Exists(clientImageFolder))
                        {
                            Directory.CreateDirectory(clientImageFolder);
                        }
                        fullFilePath = Path.Combine(clientImageFolder, fname);
                        file.SaveAs(fullFilePath);

                        FileUploadResult uploadResult = new FileUploadResult
                        {
                            uploaded = 1,
                            fileName = Path.GetFileName(fname),
                            url = $"/Home/GetCustomPageImage?filename={Path.GetFileName(fname)}"
                        };

                        // Returns message that successfully uploaded  
                        return Json(uploadResult);
                    }
                    else
                    {
                        FileUploadResult uploadResult = new FileUploadResult
                        {
                            uploaded = 0,
                            fileName = "",
                            url = ""
                        };
                        return Json(uploadResult);
                    }
                }
                catch (Exception ex)
                {
                    FileUploadResult uploadResult = new FileUploadResult
                    {
                        uploaded = 0,
                        fileName = "",
                        url = ""
                    };
                    return Json(uploadResult);
                }
            }
            else
            {
                FileUploadResult uploadResult = new FileUploadResult
                {
                    uploaded = 0,
                    fileName = "",
                    url = ""
                };
                return Json(uploadResult);
            }
        }

        public FileResult GetCustomPageImage(string filename)
        {
            string clientImageFolder = Server.MapPath("~/Content/Images/uploaded/");
            System.IO.Directory.CreateDirectory(clientImageFolder);
            string fullFilePath = Path.Combine(clientImageFolder, filename);

            byte[] fileBytes = System.IO.File.ReadAllBytes(fullFilePath);
            string openName = fullFilePath.Substring(fullFilePath.Length - 41, 41);
            string mimeType = MimeMapping.GetMimeMapping(filename);
            return File(fileBytes, mimeType, openName);
        }

    }
    public class FileUploadResult
    {
        public Int32 uploaded { get; set; } = 0;
        public string url { get; set; }

        public string fileName { get; set; }
    }

}