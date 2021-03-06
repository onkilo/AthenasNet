
CREATE OR ALTER   PROCEDURE [dbo].[USP_VALIDAPROMO]
(
	@ProductoId INT = 0,
	@FechaInicio DATE = '',
	@FechaFin DATE = '',
	@PromocionId INT = 0
)
AS
BEGIN
	SELECT COUNT(1) as Promociones FROM Promocion
	WHERE ProductoId = @ProductoId
	AND (
		(@FechaInicio BETWEEN FechaInicio and FechaFin) OR
		(@FechaFin BETWEEN FechaInicio and FechaFin) OR 
		(FechaInicio BETWEEN @FechaInicio and @FechaFin)
	)
	AND (@PromocionId = 0 OR Id != @PromocionId)
	AND Activo = 1
END