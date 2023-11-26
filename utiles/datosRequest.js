// Middleware para mostrar los datos enviados por quién consume el servidor

export const mostrarDatosRequest = (req, res, next) => {
    console.log('METHOD:', req.method);
    console.log('URL:', req.url);
   
    // Se llama al siguiente controlador de la cadena
    next();
   };