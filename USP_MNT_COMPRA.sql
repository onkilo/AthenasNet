CREATE OR ALTER PROCEDURE USP_MNT_COMPRA
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@ProveedorId INT = 0,
	@TrabajadorId INT = 0,
	@Fecha DATE = '',
	@Estado INT = 0, -- 0: Registrado, 1: Recibido
	@RzProveedor VARCHAR(500) = '',-- PARA EL FILTRO
	@Activo CHAR(1) = ''
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO Compra(ProveedorId, TrabajadorId, Fecha, Estado, Activo)
		VALUES (@ProveedorId, @TrabajadorId, GETDATE(), 0, '1')

		SELECT SCOPE_IDENTITY() AS Id;
	END
	
	IF @Opcion = '2'
	BEGIN
		UPDATE Compra SET Estado = '1' WHERE Id = @Id AND Activo = '1'
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Compra SET Activo = '0' WHERE Id = @Id AND Activo = '1';
		Select Estado from Compra where Id = @Id And Activo = '0'
	END

	IF @Opcion = '4'
	BEGIN
		SELECT 
			c.Id,
			c.ProveedorId,
			pv.RzSocial as Proveedor,
			pv.Representante as Representante,
			pv.RUC as RUC,
			t.Nombre as NomTrabajador,
			t.Apellido as ApeTrabajador,
			c.Fecha,
			c.Estado,
			c.Activo,
			c.TrabajadorId
		FROM Compra c JOIN Trabajador t on c.TrabajadorId = t.Id
		JOIN Proveedor pv ON c.ProveedorId = c.Id 
		WHERE (@Id = 0 OR c.Id = @Id) 
		AND (@RzProveedor = '' OR pv.RzSocial LIKE ('%' + @RzProveedor +  '%'))
		AND c.Activo = '1'
	END 
END