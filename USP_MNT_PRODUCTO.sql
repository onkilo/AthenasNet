CREATE PROCEDURE USP_MNT_PRODUCTO
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@Descripcion VARCHAR(50) = '',
	@PrecioCompra DECIMAL(10,2) = 0,
	@PrecioVenta DECIMAL(10,2) = 0,
	@StockActual INT = 0,
	@StockMin INT = 0,
	@CategoriaId INT = 0,
	@Imagen VARCHAR(255) = '',
	@Activo CHAR(1) = '1'
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO 
			Producto(
			      Descripcion
				  ,PrecioCompra
				  ,PrecioVenta
				  ,StockActual
				  ,StockMin
				  ,CategoriaId
				  ,Imagen
				  ,Activo
				) 
			VALUES (
				@Descripcion ,
				@PrecioCompra,
				@PrecioVenta,
				@StockActual,
				@StockMin ,
				@CategoriaId ,
				@Imagen,
				'1'
			);
	END

	IF @Opcion = '2'
	BEGIN
		UPDATE Producto 
		SET 
			Descripcion = @Descripcion
			,PrecioCompra = @PrecioCompra
			,PrecioVenta = @PrecioVenta
			,StockActual = @StockActual
			,StockMin = @StockMin
			,CategoriaId = @CategoriaId
			,Imagen = @Imagen
		WHERE Id = @Id AND Activo = '1';
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Producto SET Activo = '0' WHERE Id = @Id;
	END

	IF @Opcion = '4'
	BEGIN
		SELECT 
			Id
			,Descripcion
			,PrecioCompra
			,PrecioVenta
			,StockActual
			,StockMin
			,CategoriaId
			,Imagen
			,Activo
		FROM Producto  WHERE (@Id = 0 OR Id = @Id) AND  Activo = @Activo;
	END
END