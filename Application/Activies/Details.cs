using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistance;

namespace Application.Activies
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid ID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.ID);
                return activity;
            }
        }
    }
}