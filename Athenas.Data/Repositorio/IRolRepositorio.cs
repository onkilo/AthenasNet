using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Repositorio
{
    public interface IRolRepositorio : IGenericRepositorio<Rol>
    {
        IEnumerable<Rol> GetRolUsuario(int UsuarioId);

        void CrearRolUsuario(RolUsuario rolUsuario, SqlConnection cn, SqlTransaction tn); // int rolId, int usuarioId

        void ElimiarRolUsuario(RolUsuario rolUsuario, SqlConnection cn, SqlTransaction tn);
    }
}
