using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Xml.Linq;
using WebQuiz.Backend.Methods;
using WebQuiz.Backend.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebQuiz.Backend.Controllers
{
    [Route("Home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public HomeController()
        {
            // Здесь допустим должен быть контекст данных
        }


        [HttpGet("GetAbnData")]
        public async Task<IActionResult> GetAbnData()
        {
            // await опустим
            var abnData = new AbnData();
            abnData.DateRegister = DateTime.Now;
            return new JsonResult(abnData);
        }

        [HttpGet("GetRequisitesData")]
        public async Task<IActionResult> GetRequisitesData()
        {
            // await опустим
            var requisitesData = new RequisitesData();
            return new JsonResult(requisitesData);
        }

        [HttpGet("GetBankName")]
        public async Task<IActionResult> GetBankName(string bik)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Банки", "bikBase.xml");

                XDocument xdoc = XDocument.Load(path);

                var bankData = xdoc.Element("Banks")?
                    .Elements("Bank")
                    .Where(p => p.Element("Bik")?.Value == bik)
                    .Select(p => new
                    {
                        bankName = p.Element("BankName")?.Value,
                        CorrespondentAccount = p.Element("CorrespondentAccount")?.Value,
                    }).FirstOrDefault();

                return new JsonResult(bankData);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("GetCompanyName")]
        public async Task<IActionResult> GetCompanyName(string? INN)
        {
            try
            {
                if (INN != null)
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Компании", "Companies.xml");

                    XDocument xdoc = XDocument.Load(path);

                    var companyData = xdoc.Element("Companies")?
                        .Elements("Company")
                        .Where(p => p.Element("INN")?.Value == INN)
                        .Select(p => new
                        {
                            Name = p.Element("Name")?.Value,
                            OGRN = p.Element("OGRN")?.Value,
                            NameSocr = p.Element("NameSocr")?.Value,
                            DateRegister = p.Element("DateRegister")?.Value
                        }).FirstOrDefault();
                    return new JsonResult(companyData);
                }
                else
                {
                    return new JsonResult(null);
                }
            }
            catch (Exception EX)
            {
                throw new Exception(EX.Message);
            }
        }

        [HttpPost("SaveAbn")]
        public async Task<IActionResult> SaveAbnData(AbnSaveData data)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Анкеты",
                    data.abnData.CompanyNameSocr?.Replace("\"", "") ?? data.abnData.INN);
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                XDocument xDoc = new();
                // Данные по абоненту
               
                XElement abonent = new XElement("abonent");
                XElement companyName = new XElement("companyName", data.abnData?.CompanyName);
                XElement companyNameSocr = new XElement("companyNameSocr", data.abnData?.CompanyNameSocr);
                XElement INN = new XElement("INN", data.abnData.INN);
                XElement OGRNIP = new XElement("OGRNIP", data.abnData.OGRNIP);
                XElement DateRegister = new XElement("DateRegister", data.abnData.DateRegister.ToShortDateString());
                XElement WithoutDogovor = new XElement("WithoutDogovor", data.abnData.WithoutDogovor);

                if(!string.IsNullOrEmpty(data.abnData.CompanyName))
                    abonent.Add(companyName);
                if (!string.IsNullOrEmpty(data.abnData.CompanyNameSocr))
                    abonent.Add(companyNameSocr);
                abonent.Add(INN);
                abonent.Add(OGRNIP);
                abonent.Add(DateRegister);
                abonent.Add(WithoutDogovor);

                // Данные по реквизитам
                for (int i = 0; i < data.requisitesData.Count; i++)
                {
                    XElement BIK = new XElement($"BIK{i + 1}", data.requisitesData[i].BIK);
                    XElement BankName = new XElement($"BankName{i + 1}", data.requisitesData[i].BankName);
                    XElement CheckingAccount = new XElement($"CheckingAccount{i + 1}", data.requisitesData[i].CheckingAccount);
                    XElement CorrespondentAccount = new XElement($"CorrespondentAccount{i + 1}", data.requisitesData[i].CorrespondentAccount);

                    abonent.Add(BIK);
                    abonent.Add(BankName);
                    abonent.Add(CheckingAccount);
                    abonent.Add(CorrespondentAccount);
                }

                xDoc.Add(abonent);
                xDoc.Save(path + @"/abonent.xml");

                return new JsonResult(data.abnData.CompanyNameSocr?.Replace("\"", "") ?? data.abnData.INN);
            }
            catch (NullReferenceException ex)
            {
                throw new Exception("Произошла ошибка при отправки формы: " + ex.Message);
            }
            catch(ArgumentNullException ex)
            {
                throw new Exception("Произошла ошибка при отправки формы: " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception("Произошла ошибка при отправки формы: " + ex.Message);
            }
        }

        [HttpPost("uploadFiles")]
        public async Task<IActionResult> UploadFiles(string name, [FromForm] FileForm file)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Анкеты",
                    name);

            string pathIMG = Path.Combine(path, file.FileName);
            try
            {
                await FileWriter.WriteFile(pathIMG, file.FormFile);
                return new JsonResult("Сохранено");
            }
            catch (NullReferenceException ex)
            {
                throw new NullReferenceException(ex.Message);
            }
            catch (IOException ex)
            {
                throw new IOException(ex.Message);
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
        }
    }
}
