using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class CategoriaMapper
    {
        public static CategoriaDto GetCategoriaDto(Categoria categoria)
        {

            if (categoria == null) return null;

            CategoriaDto dto = new CategoriaDto
            {
                Id= categoria.Id,
                Descripcion = categoria.Descripcion,
                Activo = categoria.Activo
            };

            return dto;
        }

        public static IEnumerable<CategoriaDto> GetCategoriasDto(List<Categoria> categorias)
        {
            if (categorias == null) return null;

            List<CategoriaDto> dtos = new List<CategoriaDto>();

            categorias.ForEach(c =>{
                dtos.Add(GetCategoriaDto(c));
            });

            return dtos;
        }

        public static Categoria GetCategoria (CategoriaDto dto)
        {
            if (dto == null) return null;

            Categoria categoria = new Categoria
            {
                Id = dto.Id,
                Descripcion = dto.Descripcion,
                Activo = dto.Activo
            };

            return categoria;
        }
    }
}
