const { v4: uudiv4 } = require('uuid');

class Task {
  
  id = '';
  description = '';
  concluded = null;
  category  = 'General';

  constructor(id, description, concluded=null, category = 'Default') {

    this.id = uudiv4();
    this.description = description;
    this.concluded = concluded;
    this.category = category;

  }

}


module.exports = Task;