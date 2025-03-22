import storage from '../model/storage.js';
import taskController from './taskController.js';
import projectController from './projectController.js';

const appController = {
  projects: [],
  init() {
    this.projects = storage.load();
    // Ensure there are projects for each category (To Do, In Progress, Completed, Archived)
    if (this.projects.length === 0) {
      // Create the projects
      this.projects = [
        projectController.createProject('To Do'),
        projectController.createProject('In Progress'),
        projectController.createProject('Completed'),
        projectController.createProject('Archived'),
      ];
    }

    // Add test tasks to the "To Do" project (index 0) if it has no tasks
    if (!this.projects[0].tasks || this.projects[0].tasks.length === 0) {
      const testTasks = [
        taskController.createTask(
          'Test Task 1',
          'This is a test task',
          '2025-03-21',
          'To Do',
          0 // projectId for "To Do" project
        ),
        taskController.createTask(
          'Test Task 2',
          'Another test task',
          '2025-03-22',
          'To Do',
          0 // projectId for "To Do" project
        ),
      ];

      // Add the test tasks to the "To Do" project
      testTasks.forEach((task) => {
        projectController.addTaskToProject(this.projects[0], task);
      });

      this.save();
    }

  },
  save() {
    storage.save(this.projects);
  },
  addProject(name) {
    const project = projectController.createProject(name);
    this.projects.push(project);
    this.save();
  },
  addTaskToProject(projectIndex, title, description, dueDate, status) {
    const task = taskController.createTask(title, description, dueDate, status, projectIndex);
    projectController.addTaskToProject(this.projects[projectIndex], task);
    this.save();
  },
  editTask(projectIndex, taskIndex, updates) {
    const task = this.projects[projectIndex].tasks[taskIndex];
    const updatedTask = taskController.editTask(task, updates);
    this.projects[projectIndex].tasks[taskIndex] = updatedTask;
    this.save();
  },
  deleteTask(projectIndex, taskIndex) {
    taskController.deleteTask(this.projects[projectIndex], taskIndex);
    this.save();
  },
};

export default appController;