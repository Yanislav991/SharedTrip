using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SharedTrip.Data.Model;
using SharedTrip.Models.News;
using SharedTrip.Models.Trips;
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
            this.newsService = tripsService;
        }

        [HttpGet]
        [Route("all")]
        public List<News> GetNews()
        {
            var news = this.newsService.GetNews();
            return news;
        }
    }
}
