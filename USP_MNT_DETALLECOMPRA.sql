CREATE OR ALTER PROCEDURE USP_MNT_DETALLECOMPRA
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@CompraId INT = 0,
	@ProductoId INT = 0,
	@Cantidad INT = 0,
	@Precio DECIMAL(10,2) = 0,
	@Activo CHAR(1) = ''
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO DetalleCompra(CompraId, ProductoId, Cantidad, Precio, Activo)
		VALUES (@CompraId, @ProductoId, @Cantidad, @Precio, '1')
	END
	
	IF @Opcion = '4'
	BEGIN
		SELECT 
			dc.Id,
			dc.CompraId, 
			dc.ProductoId,
			p.Descripcion as Producto,
			dc.Cantidad,
			dc.Precio,
			dc.Activo
		FROM DetalleCompra dc JOIN Producto p on dc.ProductoId = p.Id
		WHERE dc.CompraId = @CompraId AND dc.Activo = '1'
	END
END