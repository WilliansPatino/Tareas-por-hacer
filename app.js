require('colors');

const { saveDB, readDB, openDB, closeDB } = require('./helpers/file');

const { inquirerMenu,
  pauseMenu,
  inputData,
  readInput,
  // readCategory,
  listTasksForDelete,
  confirmOption,
  showChecklist
// } = require('./helpers/inquirer-orig');
} = require('./helpers/inquirer');

/*const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer-orig');*/



const Tasks = require('./models/Tasks');

const main = async() => {

  let menuOptions;


  const tasks = new Tasks();

  const processDB = readDB();

  if (processDB) { // load tasks
      tasks.loadTasksFromArray(processDB);
  }


  do {
    // menu
    menuOptions = await inquirerMenu();

    switch (menuOptions) {
      case '1':
        // create task   ( ./helpers/inquirer)
        const  d   = await readInput() ;
        // const { description, category } await inputData();
        // const description = await leerInput('Descripción:');
        // const categ = await readCategory('Etiqueta:');
        tasks.createTask(d.description, d.category);
      break;
      case '2':
        // list tasks
        tasks.listAllTasks();
      break;
      case '3':
        // list concluded tasks
        tasks.listConcludedTask(true);
      break;
      case '4':
        // list pending tasks
        tasks.listConcludedTask(false);
      break;
      case '5':
        // tick off tasks ( ./helpers/inquirer )
        const ids = await showChecklist( tasks.tasksArray);
        // const ids = await mostrarListadoChecklist( tasks.tasksArray);
        // mark/umark     ( ./models/tasks )
        tasks.tickOffPendingTask(ids);
      break;
      case '6':
        // delete task  ( ./helpers/inquirer)
        const id = await listTasksForDelete(tasks.tasksArray);
        // const id = await listadoTareasBorrar(tasks.tasksArray);
        // console.log(id, tasks[id]);
        if ( id !== '0') {
          
          // ( ./helpers/inquirer)
          // const ok = await confirmar('¿Está seguro?');
          const ok = await confirmOption('¿Está seguro?');
          
          if (ok) {
            tasks.deleteTask(id);
            console.log('Tarea eliminada');
          }
        }
      break;

    }

    // console.log('Data: ',tasks.tasksArray);
    saveDB(tasks.tasksArray);

      // ( ./helpers/inquirer)
    await pauseMenu();
    // await pausa();

  } while ( menuOptions !== '0');

   // save data before ...
    // console.log('Backup Data  as ', tasks.tasksArray);
    saveDB(tasks.tasksArray);
    closeDB();

}

main();