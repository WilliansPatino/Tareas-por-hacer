const Task = require('./Task');

class Tasks {

  _listing = {
    'any': null
  };

  get tasksArray() {

    const listing = [];
    Object.keys( this._listing ).forEach( key => {
        const task = this._listing[ key ];
        listing.push(task);

    });
    return listing;
  }

  constructor( _listing ) {
    this._listing = {};

  }

  deleteTask( id = '' ) {

    if ( this._listing[id] ) {
        delete this._listing[id];
    }

  }

  loadTasksFromArray( tasks = [] ) {

   // if ( Array.isArray(this._listing) ) { // validate before
    tasks.forEach( task => {
        this._listing[task.id] = task;
    });  

  }

  createTask( description, category ) {


      // this.id = id;
      this.description = description;
      // this.concluded = concluded;
      this.category = category;

    /*  console.log(`Se recibe estos campos:
          Id: ${this.id}
          Desc: ${this.description}
          Status: ${this.concluded}
          Label: ${this.category}

          `);*/

      const task = new Task(this.id, this.description, this.concluded, this.category);
      this._listing[task.id] = task;

  }

  listAllTasks() {


      console.log();
      this.tasksArray.forEach( (task, i) => {
          const idx = `${ i + 1}.`.green;
          const { description, concluded, category } = task;
          const situation = ( concluded )
                      ? 'Completada/Concluido'.blue
                      : 'Pendiente'.yellow;
          const label = ( category )
                      ? category.bgBlue
                      : 'Sin clasificar'.bgGray;
          console.log(`${ idx } ${ label } ${ description } :: ${ situation }`);

      });
  }

  listConcludedTask( isConcluded = true ) {

    console.log();
    let counter = 0;

    this.tasksArray.forEach( task => { 

        const { description, concluded, category } = task;
        // console.log('d:', description, 'c:', concluded, 'l:',category);

        const situation = ( concluded )
                      ? 'Completada/Concluido'.blue
                      : 'Pendiente'.yellow;
        const label = ( category )
                      ? category.bgBlue
                      : 'Sin clasificar'.bgGray;
        
        if ( isConcluded ) {
          // show concluded tasks
          if ( concluded ) {
            counter += 1;
            console.log(`${ (counter + '.').green } ${ label } ${ description } : ${ concluded+''.blue } `);
          }
        } else {
          // show pending tasks
          if ( !concluded ) {
            counter += 1;
            console.log(`${ (counter + '.').green } ${ label }  ${ description } : ${ situation }`);

          }
        }
    });
  }

  tickOffPendingTask( ids = [] ) {

      ids.forEach( id => {

          const task = this._listing[id];

          if ( !task.concluded ) {
            task.concluded = new Date().toISOString();
          }
      });

      this.tasksArray.forEach( task => {

          if ( !ids.includes(task.id) ) {
            this._listing[task.id].concluded = null;
          }
      });
  }
}

module.exports  = Tasks;