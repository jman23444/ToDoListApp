import createProject from '../model/project.js';

const projectController = {
  createProject(name) {
    return createProject(name);
  },
  addTaskToProject(project, task) {
    project.tasks.push(task);
  },
};

export default projectController;
