import createTask from '../model/task.js';

const taskController = {
  //
  createTask(title, description, dueDate, status, projectId) {
    return createTask(title, description, dueDate, status, projectId);
  },
  //
  editTask(task, updates) {
    return { ...task, ...updates };
  },
  //
  deleteTask(project, taskIndex) {
    project.tasks.splice(taskIndex, 1);
  },
  //
};

export default taskController;