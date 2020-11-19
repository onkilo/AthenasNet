using Athenas.Data.Entidades;
using Athenas.Data.MSSQLRepositorio;
using Athenas.Data.Repositorio;
using AthenasNet.Negocio.Dto;
using AthenasNet.Negocio.Dto.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Servicio
{
    public class RolServicio
    {
        private IRolRepositorio repositorio;

        public RolServicio()
        {
            repositorio = new RolRepositorio();
        }

        public IEnumerable<RolDto> Listar()
        {
            IEnumerable<Rol> roles = repositorio.GetRolUsuario(0);

            IEnumerable<RolDto> dtos = RolMapper.ToRolDtos(roles);

            return dtos;
        }
    }
}
