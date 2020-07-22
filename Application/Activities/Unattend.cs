using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistance;

namespace Application.Activities
{
    public class Unattend
    {

        public class Command : IRequest
        {
            public Guid id { get; set; }
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
                var activity = await context.Activities.FindAsync(request.id);
                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new  { Activity = "Could not find activity" });
                }

                var user = await context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == userAccessor.GetCurrentUsername());

                var attendance = await context.UserActivities.SingleOrDefaultAsync(x =>
                x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance == null)
                {
                    return Unit.Value;
                }
                if (attendance.isHost)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "You can not remove your self as host " });
                }
                context.UserActivities.Remove(attendance);
                var success = await context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem Saving Changes");
            }
        }
    }
}