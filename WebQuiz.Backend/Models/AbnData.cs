namespace WebQuiz.Backend.Models
{
    //Решил не делать конекшн к базе, чтобы потом проблем не было с запуском

    public class AbnData
    {
        public string? CompanyName { get; set; }
        public string? CompanyNameSocr { get; set; }
        public string INN { get; set; }
        public string OGRNIP { get; set; }
        public DateTime DateRegister { get; set; }
        public bool WithoutDogovor { get; set; }

    }

    public class FileForm 
    { 
        public string? FileName { get; set; }
        public IFormFile? FormFile { get; set; }
    }

}
