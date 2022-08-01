import 'colors';


const Menu = () => {
  
  return new Promise( resolve => {
    
    console.clear();
    console.log('________________________'.green);
    console.log('  Seleccione una opción '.white);
    console.log('________________________'.green);
    
    console.log(`${ '1.'.green} Crear tarea`);
    console.log(`${ '2.'.green} Listar tarea`);
    console.log(`${ '3.'.green} Listar tareas completadas`);
    console.log(`${ '4.'.green} Listar tareas pendientes`);
    console.log(`${ '5.'.green} Completar tarea(s)`);
    console.log(`${ '6.'.green} Eliminar tarea`);
    console.log(`${ '0.'.green} Salir\n`);
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      ouput: process.stdout
    });
    
    readline.question('Seleccione una opción: ', (menuOption) => {
      readline.close();
      resolve(menuOption);
    })
  });
  
} // menu 

const pausa = () => {

  return new Promise(resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nPresione ${ '<ENTER>'.green } para continuar\n`, (menuOption) => {
      readline.close();
      resolve();
    })
  });

}

module.exports = {
   Menu,
  pausa
}