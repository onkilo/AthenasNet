﻿using AthenasNet.Negocio.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace AthenasNet.Api.Models
{
    public class JwtDecodeModel : IPrincipal
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public IEnumerable<RolDto> Roles { get; set; }

        public IIdentity Identity => new GenericIdentity(Username);

        public bool IsInRole(string role)
        {
            if (Roles == null) return false;

            return (Roles.Count(c => c.Nombre == role)) > 0;
        }
    }
}