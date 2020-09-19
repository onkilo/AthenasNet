ALTER PROCEDURE USP_MNT_CATEGORIA 
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@Descripcion VARCHAR(50) = '' ,
	@Activo CHAR(1) = '1'
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO Categoria(Descripcion, Activo) VALUES (@Descripcion, '1');
	END

	IF @Opcion = '2'
	BEGIN
		UPDATE Categoria SET Descripcion = @Descripcion WHERE Id = @Id AND Activo = '1';
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Categoria SET Activo = '0' WHERE Id = @Id;
	END

	IF @Opcion = '4'
	BEGIN
		SELECT Id, Descripcion, Activo FROM Categoria  
		WHERE (@Id = 0 OR Id = @Id) 
		AND (@Descripcion = '' OR Descripcion LIKE '%' + @Descripcion + '%') 
		AND Activo = @Activo;
	END
END
