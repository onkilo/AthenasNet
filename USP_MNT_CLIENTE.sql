CREATE PROCEDURE USP_MNT_CLIENTE
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
		FROM Cliente  WHERE (@Id = 0 OR Id = @Id) AND  Activo = @Activo;
	END
END