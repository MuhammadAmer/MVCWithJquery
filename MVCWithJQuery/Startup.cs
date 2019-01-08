using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MVCWithJQuery.Startup))]
namespace MVCWithJQuery
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
