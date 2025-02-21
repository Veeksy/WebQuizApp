﻿using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebQuiz.Backend.Methods
{
    public static class FileWriter
    {
        public static async Task WriteFile(string path, IFormFile file)
        {
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                await file?.CopyToAsync(stream);
            }
            using (Stream fs = new FileStream(path, FileMode.Open))
            {
                byte[] fd = new byte[fs.Length];

                await fs.ReadAsync(fd, 0, fd.Length);
            }
        }
    }
}
