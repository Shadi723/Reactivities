using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Errors;
using MediatR;
using Presistance;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Activities
{
    public class Attend
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                /// command goes here
                var activity = await context.Activities.FindAsync(request.Id);
                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new  { Activity = "Could not find activity" });
                }

                var user = await context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == userAccessor.GetCurrentUsername());

                var attendance = await context.UserActivities.SingleOrDefaultAsync(x =>
                x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if(attendance != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "Already attending this activity "});
                }
                attendance = new UserActivity{
                    Activity = activity,
                    AppUser = user,
                    isHost = false,
                    DateJoined = DateTime.Now
                };

                context.UserActivities.Add(attendance);

                var success = await context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem Saving Changes");
            }
        }
    }
}