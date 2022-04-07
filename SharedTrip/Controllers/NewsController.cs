using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SharedTrip.Data.Model;
using SharedTrip.Models.News;
using SharedTrip.Services.Contracts;

namespace SharedTrip.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly INewsService newsService;
        public NewsController(INewsService tripsService, UserManager<User> userManager)
        {
            newsService = tripsService;
        }

        [HttpGet]
        [Route("all")]
        public List<News> GetNews()
        {
            var news = newsService.GetNews();
            return news;
        }
    }
}
