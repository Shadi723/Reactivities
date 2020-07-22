using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistance;

namespace Application.Activies
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid ID { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context
                                .Activities
                                .FindAsync( request.ID);
                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });
                }
                var activityToReturn = mapper.Map<Activity, ActivityDto>(activity);
                return activityToReturn;
            }
        }
    }
}