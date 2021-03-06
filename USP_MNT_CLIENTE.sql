USE [AthenasDB]
GO
/****** Object:  StoredProcedure [dbo].[USP_MNT_CLIENTE]    Script Date: 19/11/2020 06:00:02 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[USP_MNT_CLIENTE]
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@Nombre VARCHAR(100) = '',
	@Apellido VARCHAR(100) = '' ,
	@Telefono VARCHAR(15) = '',
	@DNI VARCHAR(9)  = '',
	@Sexo CHAR(1)  = '',
	@FechaCreacion DATE = '',
	@Activo CHAR(1)  = '1' 
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO 
			Cliente(
			      Nombre
				  ,Apellido
				  ,Telefono
				  ,DNI
				  ,Sexo
				  ,FechaCreacion
				  ,Activo
				) 
			VALUES (
				@Nombre ,
				@Apellido ,
				@Telefono,
				@DNI,
				@Sexo,
				GETDATE(),
				'1'
			);
	END

	IF @Opcion = '2'
	BEGIN
		UPDATE Cliente 
		SET 
			Nombre = @Nombre
			,Apellido = @Apellido
			,Telefono = @Telefono
			,DNI = @DNI
			,Sexo = @Sexo
		WHERE Id = @Id AND Activo = '1';
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Cliente SET Activo = '0' WHERE Id = @Id;
	END

	IF @Opcion = '4'
	BEGIN
		SELECT 
			Id
			,Nombre
			,Apellido
			,Telefono
			,DNI
			,Sexo
			,FechaCreacion
			,Activo
		FROM Cliente c 
		WHERE (@Id = 0 OR c.Id = @Id) AND  c.Activo = @Activo
		AND (c.Nombre + ' ' + c.Apellido) LIKE '%' + @Nombre + '%';
	END
END