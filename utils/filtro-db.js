const crearFiltroDB = (valor) => valor ? new RegExp(valor, 'gi') : undefined;

export default crearFiltroDB;