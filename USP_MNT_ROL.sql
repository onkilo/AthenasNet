CREATE OR ALTER PROCEDURE USP_MNT_ROL
(
	@Opcion CHAR(1) = '',
	@Id INT = 0,
	@Nombre VARCHAR(100) = '',
	@Usuario INT = 0,
	@Activo CHAR(1) = '1'
)
AS
BEGIN
	IF @Opcion = '1'
	BEGIN
		INSERT INTO Rol(Nombre,Activo) 
		VALUES (@Nombre ,'1');
	END

	IF @Opcion = '2'
	BEGIN
		UPDATE Rol SET Nombre = @Nombre
		WHERE Id = @Id AND Activo = '1';
	END

	IF @Opcion = '3'
	BEGIN
		UPDATE Rol SET Activo = '0' WHERE Id = @Id;
	END

	IF @Opcion = '4'
	BEGIN
		SELECT 
			r.Id
			,Nombre
			,r.Activo
		FROM Rol r LEFT JOIN RolUsuario ru ON r.Id = ru.RolId
		WHERE (@Id = 0 OR r.Id = @Id) AND  r.Activo = '1' 
		AND (r.Nombre) LIKE '%' + @Nombre +'%' 
		AND (@Usuario = 0 OR ru.UsuarioId = @Usuario) 
		AND ru.Activo = '1' ;
	END

	IF @Opcion = '5'
	BEGIN
		INSERT INTO RolUsuario(RolId, UsuarioId, Activo)
		VALUES (@Id, @Usuario, '1')
	END

	IF @Opcion = '6'
	BEGIN
		UPDATE RolUsuario SET Activo = '0' WHERE UsuarioId = @Usuario AND RolId = @Id
	END
END