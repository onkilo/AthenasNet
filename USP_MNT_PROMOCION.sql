
CREATE OR ALTER PROCEDURE USP_MNT_PROMOCION
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@ProductoId INT = 0,
	@Tipo INT = 0,
	@Valor DECIMAL(10,2) = 0,
	@FechaInicio DATE = '',
	@FechaFin DATE = '',
	@ProductoDesc VARCHAR(100) = '',
	@Activo CHAR(1) = '1',
	@Estado INT = 0
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO 
			Promocion(
			      ProductoId
				  ,Tipo
				  ,Valor
				  ,FechaInicio
				  ,FechaFin
				  ,Activo
				) 
			VALUES (
				@ProductoId,
				@Tipo,
				@Valor,
				@FechaInicio,
				@FechaFin,
				'1'
			);
	END
	IF @Opcion = '2'
	BEGIN
		UPDATE Promocion 
		SET 
			ProductoId = @ProductoId
			,Tipo = @Tipo
			,Valor = @Valor
			,FechaInicio = @FechaInicio
			,FechaFin = @FechaFin
		WHERE Id = @Id AND Activo = '1';
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Promocion SET Activo = '0' WHERE Id = @Id;
	END
	IF @Opcion = '4'
	BEGIN
		SELECT 
			p.Id
			,ProductoId
			,p.Tipo
			,p.Valor
			,p.FechaInicio
			,p.FechaFin
			,p.Activo
			,c.Descripcion as Producto
			,c.PrecioVenta
		FROM Promocion p JOIN Producto c ON p.ProductoId = c.Id 
		WHERE (@Id = 0 OR p.Id = @Id) AND  p.Activo = @Activo 
			AND (c.Descripcion LIKE '%' + @ProductoDesc + '%')
			AND (
				CASE 
					WHEN @Estado = 0 THEN 1
					WHEN @Estado = 1 AND GETDATE() BETWEEN p.FechaInicio and p.FechaFin THEN 1
					WHEN @Estado = 2 AND p.FechaFin < GETDATE() THEN 1
					ELSE 0
				END
			) = 1;
	END
	END