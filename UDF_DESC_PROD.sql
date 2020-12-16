CREATE OR ALTER FUNCTION UDF_DESC_PROD (@ProductoId INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
	DECLARE @Valor DECIMAL(10,2), @Tipo INT, @Desc DECIMAL(10,2)

	SELECT @Valor = pm.Valor, @Tipo = pm.Tipo, @Desc = pd.PrecioVenta
	FROM Producto pd JOIN Promocion pm ON pd.Id = pm.ProductoId
	WHERE GETDATE() BETWEEN pm.FechaInicio AND pm.FechaFin AND pm.Activo = '1'
	AND pd.Id = @ProductoId

	IF @Tipo = 0
	BEGIN
		SET @Desc = @Valor
	END
	ELSE
	BEGIN
		SET @Desc = @Desc * (@Valor / 100)
	END

	if @Desc IS NULL 
	BEGIN
		SET @Desc = 0
	END

	RETURN @Desc
END