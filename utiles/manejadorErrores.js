// Middleware para manejar errores

export const manejarErrores = (error, req, res, next) => {
    console.error(error.stack)
    res.status(500).send(`Ha ocurrido un error: ${error}`)
  };