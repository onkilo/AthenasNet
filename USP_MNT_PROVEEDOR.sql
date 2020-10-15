CREATE OR ALTER PROCEDURE USP_MNT_PROVEEDOR
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@RzSocial VARCHAR(100) = '',
	@Ruc VARCHAR(20) = '',
	@Representate VARCHAR(100) = '',
	@Email VARCHAR(100) = '',
	@Telefono VARCHAR(15) = '',
	@Direccion VARCHAR(100) = '',
	@Activo CHAR(1) = '1'
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO 
			Proveedor(
			      RzSocial
				  ,RUC
				  ,Representante
				  ,Email
				  ,Telefono
				  ,Direccion
				  ,Activo
				) 
			VALUES (
				@RzSocial ,
				@Ruc,
				@Representate,
				@Email,
				@Telefono ,
				@Direccion ,
				'1'
			);
	END

	IF @Opcion = '2'
	BEGIN
		UPDATE Proveedor 
		SET 
			RzSocial = @RzSocial
			,RUC = @Ruc
			,Representante = @Representate
			,Email = @Email
			,Telefono = @Telefono
			,Direccion = @Direccion
		WHERE Id = @Id AND Activo = '1';
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Proveedor SET Activo = '0' WHERE Id = @Id;
	END

	IF @Opcion = '4'
	BEGIN
		SELECT 
			Id
			,RzSocial
			,RUC
			,Representante
			,Email
			,Telefono
			,Direccion
			,Activo
		FROM Proveedor  
		WHERE (@Id = 0 OR Id = @Id) AND Activo = @Activo
		AND RzSocial LIKE '%' + @RzSocial + '%';
	END
END