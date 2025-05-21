namespace art_portfolio_webAPI.Controllers.ImagesProcessing
{
    public class ProcessingImages : IProcessingImages
    {
        public async Task<string> UploadImage(IFormFile file, IWebHostEnvironment hostEnvironment)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(file.FileName).Take(10).ToArray()).Replace(" ", "_");
            imageName = imageName + DateTime.Now.ToString("yymmdd_ssfff") + Path.GetExtension(file.FileName);
            var imagePath = Path.Combine(hostEnvironment.ContentRootPath, "images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return imageName;
        }

        public void DeleteImage(string imageName, IWebHostEnvironment hostEnvironment)
        {
            var imagePath = Path.Combine(hostEnvironment.ContentRootPath, "images", imageName);
            if (File.Exists(imagePath))
                File.Delete(imagePath);
        }
    }
}
