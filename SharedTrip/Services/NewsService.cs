using HtmlAgilityPack;
using SharedTrip.Models.News;
using SharedTrip.Services.Contracts;
using System.Net;

namespace SharedTrip.Services
{
    public class NewsService : INewsService
    {
        private const string url = "https://www.api.bg/bg/novini";
        public List<News> GetNews()
        {
            var currentNews = new List<News>();
            var content = GetHtmlCode(url);
            var html = new HtmlDocument();
            html.LoadHtml(content);
            var nodes = html.DocumentNode.SelectNodes("//*[@class=\"news-panel\"]");
            foreach (var node in nodes)
            {
                var doc = new HtmlDocument();
                doc.LoadHtml(node.InnerHtml);
                var anchor = doc.DocumentNode.SelectSingleNode("//a");
                var imgDoc = new HtmlDocument();
                imgDoc.LoadHtml(anchor.InnerHtml);
                var image = imgDoc.DocumentNode.SelectSingleNode("//img");
                currentNews.Add(new News()
                {
                    ImageUrl = "https://www.api.bg" + image.Attributes["src"].Value,
                    DescriptionUrl = anchor.Attributes["href"].Value,
                    Title = node.InnerText.Substring(16),
                    Date = node.InnerText.Substring(0, 16)
                }) ;
            }

            return currentNews;
        }

        public static String GetHtmlCode(string Url)
        {

            HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(Url);
            myRequest.Method = "GET";
            WebResponse myResponse = myRequest.GetResponse();
            StreamReader sr = new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8);
            string result = sr.ReadToEnd();
            sr.Close();
            myResponse.Close();

            return result;
        }
    }
}
