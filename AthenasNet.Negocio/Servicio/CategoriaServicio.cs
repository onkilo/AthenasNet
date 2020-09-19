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
    public class CategoriaServicio
    {
        private ICategoriaRepositorio repositorio;

        public CategoriaServicio()
        {
            repositorio = new CategoriaRepositorio();
        }

        public void Actualizar(CategoriaDto categoria) {
            repositorio.Actualizar(CategoriaMapper.GetCategoria(categoria));
        }

        public void Crear(CategoriaDto categoria)
        {
            repositorio.Crear(CategoriaMapper.GetCategoria(categoria));
        }

        public CategoriaDto BuscarPorId(int Id) {

            Categoria categoria = repositorio.BuscarPorId(Id);

            return CategoriaMapper.GetCategoriaDto(categoria);
        }

        public IEnumerable<CategoriaDto> Listar(string Criterio)
        {
            IEnumerable<Categoria> categorias = repositorio.Listar(Criterio);

            IEnumerable<CategoriaDto> dtos = CategoriaMapper.GetCategoriasDto(categorias.ToList());


            return dtos;
        }

        public void Eliminar(int Id)
        {
            repositorio.Eliminar(Id);
        }

    }
}
