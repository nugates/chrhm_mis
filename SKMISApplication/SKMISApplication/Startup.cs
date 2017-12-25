using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SKMISApplication.Startup))]
namespace SKMISApplication
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
