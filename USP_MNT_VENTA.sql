CREATE OR ALTER PROCEDURE USP_MNT_VENTA 
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@ClienteId INT = 0,
	@TrabajadorId INT = 0,
	@Fecha DATE = '',
	@DescTotal DECIMAL(10,2) = 0,
	@NomCliente VARCHAR(500) = '',-- PARA EL FILTRO
	@Activo CHAR(1) = ''
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO Venta(ClienteId, TrabajadorId, Fecha, DescTotal, Activo)
		VALUES (@ClienteId, @TrabajadorId, GETDATE(), @DescTotal, '1')

		SELECT SCOPE_IDENTITY() AS Id;
	END
	
	IF @Opcion = '3'
	BEGIN
		UPDATE Venta SET Activo = '0' WHERE Id = @Id AND Activo = '1'
	END

	IF @Opcion = '4'
	BEGIN
		SELECT 
			v.Id,
			v.ClienteId,
			c.Nombre as NomCliente,
			c.Apellido as ApeCliente,
			c.DNI as DNICliente,
			c.Telefono as TelCliente,
			v.TrabajadorId,
			t.Nombre as NomTrabajador,
			t.Apellido as ApeTrabajador,
			v.Fecha,
			v.DescTotal,
			v.Activo
		FROM Venta v JOIN Trabajador t on v.TrabajadorId = t.Id
		JOIN Cliente c ON v.ClienteId = c.Id 
		WHERE (@Id = 0 OR v.Id = @Id) 
		AND (@NomCliente = '' OR (c.Nombre + ' ' + c.Apellido) LIKE ('%' + @NomCliente +  '%'))
		AND (@TrabajadorId = 0 OR t.Id = @TrabajadorId)
		AND v.Activo = '1'
	END 
END