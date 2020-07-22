using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Presistance;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly DataContext dataContext;
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext dataContext)
        {
            this.dataContext = dataContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            if(context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = httpContextAccessor
                                        .HttpContext.User?
                                        .Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var activityId =Guid.Parse( authContext.RouteData.Values["id"].ToString());
                var activity = dataContext.Activities.FindAsync(activityId).Result;
                var host = activity.UserActivities.FirstOrDefault(x => x.isHost);
                if(host?.AppUser.UserName == currentUserName)
                {
                    context.Succeed(requirement);
                }
            }
            else
            {
                context.Fail();
            }
            return Task.CompletedTask;
        }
    }
}