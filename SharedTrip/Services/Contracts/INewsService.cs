using SharedTrip.Models.News;

namespace SharedTrip.Services.Contracts
{
    public interface INewsService
    {
        public List<News> GetNews();
    }
}
