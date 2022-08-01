const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'selectedOptionInMenu',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${ '1'.cyan } Crear tarea`
      },
      {
        value: '2',
        name: `${ '2'.cyan } Listar todas las tareas`
      },
      {
        value: '3',
        name: `${ '3'.cyan } Listar tareas completadas`
      },
      {
        value: '4',
        name: `${ '4'.cyan } Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${ '5'.cyan } Concluir tarea(s) `
      },
      {
        value: '6',
        name: `${ '6'.cyan } Eliminar tarea`
      },
      {
        value: '0',
        name: `${ '7'.cyan } Salir`
      },
    ]
  }
];

const inquirerMenu = async() => {

  console.clear();
  console.log('======== Tareas ========='.green);
  console.log('  Seleccione una opción '.white);
  console.log('========================='.green);

  const { selectedOptionInMenu } = await inquirer.prompt(menuOptions);

  return selectedOptionInMenu;

}

const pauseMenu = async() => {

  const question = [
    {

      type: 'input',
      name: 'enter',
      message: `Pulse ${ '<ENTER>'.green } para continuar`
    }
  ];
  
  console.log('\n');
  await inquirer.prompt(question);
}


const inputData = async (message) => {


inquirer
  .prompt([
    {
      name: 'description',
      message: '¿Cuál es el nombre de la tarea?'
    },
    {
      name: 'category',
      message: '¿Clase de tarea?',
      default: 'Pendiente'
    },
  ])
  .then(answers => {
    console.info('Answers:', answers);
  });

}

const readInput = async( message ) => {

  const question = [
    {
      type: 'input',
      name: 'description',
      message: '¿Descripción:?',
      validate( answer ) {
        if (!answer) {
          return 'Incluya al menos algo breve';
        }
        return true;
      }
    },    // end input
     {
      type: 'input',
      name: 'category',
      message: '¿Categoría?',
      // default: 'General',
     /* validate( value ) {
        if (value.lenght === 0) {
          return 'Favor escribe una etiqueta para categorizar esta tarea';
        }
        return true;
      }*/
    }

  ];

  // const { description, category } = await inquirer.prompt(question);
  const q  = await inquirer.prompt(question);

  // console.log('Fue ingresado: ', q);

  return q;


}

/*const readCategory = async( message ) => {

  const question = [
    {
      type: 'input',
      name: 'category',
      message,
      validate( value ) {
        if (value.lenght === 0) {
          return 'Favor clasifique esta tarea';
        }
        return true;
      }
    }
  ];

  const { category } = await inquirer.prompt(question);
  return category;

}*/

const listTasksForDelete = async( tasks = [] ) => {

    const choices = tasks.map( (task, i) => {

      const idx = `${ i + 1}.`.green;

      return {
        value: task.id,
        name: `${ idx } ${ task.description }`
      }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const selectFromList = [
          {
            type: 'list',
            name: 'id',
            message: 'Has elegido eliminar >',
            choices
          }
      ]

      const { id } = await inquirer.prompt(selectFromList);
      return id;
}

const confirmOption = async(message) => {
    const question = [
        {
          type: 'confirm',
          name: 'ok',
          message: `¿Está seguro?`
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showChecklist = async ( tasks = [] ) => {

    const choices = tasks.map( (task, i) => { 
        const idx = `${ i + 1 }.`.green;

        return {
            value: task.id,
            name: `${ idx } ${ task.description }`,
            checked: ( task.concluded ) ? true : false
        }
    });

    const toSelectOrNot = [
        {
          type: 'checkbox',
          name: 'ids',
          message: 'Seleccione\n ',
          choices
        }
      ]

      const { ids } = await inquirer.prompt(toSelectOrNot);
      return ids;

}


module.exports = {
    inquirerMenu,
    pauseMenu,
    inputData,
    readInput,
    // readCategory,
    listTasksForDelete,
    confirmOption,
    showChecklist
}
