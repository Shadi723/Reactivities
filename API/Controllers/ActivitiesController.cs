using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activies;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator mediator;
        public ActivitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await mediator.Send(new Details.Query { ID = id });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await mediator.Send(command);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Edit.Command command, Guid id)
        {
            command.Id = id;
            return await mediator.Send(command);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete( Guid id)
        {
            return await mediator.Send(new Delete.Command{Id= id});

        }
    }
}