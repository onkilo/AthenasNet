using AthenasNet.Api.Models;
using AthenasNet.Negocio.Dto;
using JWT.Algorithms;
using JWT.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace AthenasNet.Api.Utilitarios
{
    public class JwtUtil
    {
        /**
         * Firmar => Crearlo
         * Verificarlo => JwtDecodeModel
         * */

        public static string CrearToken(int id, string username, IEnumerable<RolDto> roles)
        {
            string token = "";

            var datos = new Dictionary<String, Object>()
            {
                { "userId", id },
                {"username", username },
                {"roles", roles }
            };

            token = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret("secret")
                .AddClaims(datos)
                .Encode();


            return token;
        }


        public static JwtDecodeModel ValidaToken(string token)
        {
            JwtDecodeModel model = new JwtDecodeModel();
            Dictionary<String, Object> datos = new Dictionary<string, object>();

            try
            {
                datos = new JwtBuilder()
                    .WithAlgorithm(new HMACSHA256Algorithm())
                    .WithSecret("secret")
                    .MustVerifySignature()
                    .Decode<Dictionary<String, Object>>(token);

                model.Id = Convert.ToInt32(datos["userId"]);
                model.Username = datos["username"].ToString();
                model.Roles = Json.Decode<IEnumerable<RolDto>>(datos["roles"].ToString());
            }
            catch(Exception ex)
            {
                model = null;
                datos = null;
            }


            return model;
        }

    }
}