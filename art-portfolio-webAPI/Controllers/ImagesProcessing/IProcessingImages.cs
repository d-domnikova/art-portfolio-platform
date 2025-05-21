namespace art_portfolio_webAPI.Controllers.ImagesProcessing
{
    public interface IProcessingImages
    {
        public Task<string> UploadImage(IFormFile file, IWebHostEnvironment hostEnvironment);
        public void DeleteImage(string imageName, IWebHostEnvironment hostEnvironment);
    }
}
