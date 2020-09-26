CREATE OR ALTER PROCEDURE USP_MNT_DETALLEVENTA
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@VentaId INT = 0,
	@ProductoId INT = 0,
	@Cantidad INT = 0,
	@Precio DECIMAL(10,2) = 0,
	@DesctUni DECIMAL(10,2) = 0,
	@Activo CHAR(1) = ''
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO DetalleVenta(VentaId, ProductoId, Cantidad, Precio, DesctUni, Activo)
		VALUES (@VentaId, @ProductoId, @Cantidad, @Precio, @DesctUni, '1')
	END
	
	IF @Opcion = '4'
	BEGIN
		SELECT 
			dv.Id,
			dv.VentaId, 
			dv.ProductoId,
			p.Descripcion as Producto,
			dv.Cantidad,
			dv.Precio,
			dv.DesctUni,
			dv.Activo
		FROM DetalleVenta dv JOIN Producto p on dv.ProductoId = p.Id
		WHERE dv.VentaId = @VentaId AND dv.Activo = '1'
	END
END