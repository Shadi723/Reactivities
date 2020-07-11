using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Presistance;

namespace Application.Activies
{
    public class Delete
    {

        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });
                context.Remove(activity);
                /// command goes here
                var success = await context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem Deleting Element");
            }
        }
    }
}