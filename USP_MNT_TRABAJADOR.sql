CREATE OR ALTER PROCEDURE USP_MNT_TRABAJADOR
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@Nombre VARCHAR(100) = '',
	@Apellido VARCHAR(100) = '',
	@Telefono VARCHAR(100) = '',
	@DNI VARCHAR(9) = '',
	@Email VARCHAR(100) = '',
	@Direccion VARCHAR(100) = '',
	@Sexo CHAR(1) = '',
	@Usuario VARCHAR(50) = '',
	@Contrasenia VARCHAR(100) = '',
	@Activo CHAR(1) = '1'
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO 
			Trabajador(
			      Nombre
				  ,Apellido
				  ,Telefono
				  ,DNI
				  ,Direccion
				  ,Email
				  ,Usuario
				  ,Contrasenia
				  ,Sexo
				  ,Activo
				) 
			VALUES (
				@Nombre ,
				@Apellido,
				@Telefono,
				@DNI,
				@Direccion,
				@Email,
				@Usuario,
				@Contrasenia,
				@Sexo,
				'1'
			);

		SELECT SCOPE_IDENTITY() AS Id;
	END

	IF @Opcion = '2'
	BEGIN
		UPDATE Trabajador 
		SET 
			Nombre = @Nombre
			,Apellido = @Apellido
			,Telefono = @Telefono
			,DNI = @DNI
			,Direccion = @Direccion
			,Email = @Email
			,Usuario = @Usuario
			,Contrasenia = @Contrasenia
			,Sexo = @Sexo
		WHERE Id = @Id AND Activo = '1';
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Trabajador SET Activo = '0' WHERE Id = @Id;
	END

	IF @Opcion = '4'
	BEGIN
		SELECT 
			Id
			,Nombre
			,Apellido
			,Telefono
			,DNI
			,Direccion
			,Email
			,Usuario
			,Contrasenia
			,Sexo
			,Activo
		FROM Trabajador t 
		WHERE (@Id = 0 OR t.Id = @Id) AND  t.Activo = '1' 
		AND (t.Nombre + ' ' + t.Apellido) LIKE '%' + @Nombre +'%' 
		AND (@Usuario = '' OR t.Usuario = @Usuario);
	END
END