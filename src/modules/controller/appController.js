import storage from '../model/storage.js';
import taskController from './taskController.js';
import projectController from './projectController.js';

const appController = {
  projects: [],

  init() {
    console.log('Starting appController.init');
    // Load projects from storage
    const storedProjects = storage.load();
    console.log('Stored projects from storage:', storedProjects);

    // Always initialize with default projects if none exist or if they're empty
    if (!storedProjects || storedProjects.length === 0) {
      console.log('No stored projects found, initializing default projects');
      this.projects = [
        projectController.createProject('All', 0),
        projectController.createProject('To Do', 1),
        projectController.createProject('In Progress', 2),
        projectController.createProject('Completed', 3),
        projectController.createProject('Archived', 4),
      ];
    } else {
      this.projects = storedProjects;
      console.log('Loaded projects from storage:', this.projects);
    }

    // Ensure each project has a tasks array
    this.projects.forEach((project) => {
      if (!project.tasks || !Array.isArray(project.tasks)) {
        project.tasks = [];
      }
    });

    // Ensure the "All" project exists at index 0
    if (this.projects.length === 0 || this.projects[0].name !== 'All') {
      console.log('Adding "All" project at index 0');
      this.projects.unshift(projectController.createProject('All', 0));
      // Update project IDs to reflect new indices
      this.projects.forEach((project, index) => {
        project.id = index;
      });
    }

    // Check if any project has tasks; if not, initialize default tasks
    console.log('Checking if projects have tasks...');
    this.projects.forEach((project, index) => {
      console.log(`Project ${index} (${project.name}): tasks =`, project.tasks);
    });
    const hasTasks = this.projects.some(
      (project) => project.tasks && project.tasks.length > 0
    );
    console.log('hasTasks:', hasTasks);
    if (!hasTasks) {
      console.log('No projects have tasks, initializing default tasks');
      // Initialize each project with one task in the corresponding status
      const exampleTasks = [
        taskController.createTask(
          'To Do Task',
          'This is a test task for To Do status',
          '2025-03-21',
          'To Do',
          1 // projectId for "To Do" project
        ),
        taskController.createTask(
          'In Progress Task',
          'This is a test task for In Progress status',
          '2025-03-22',
          'In Progress',
          2 // projectId for "In Progress" project
        ),
        taskController.createTask(
          'Completed Task',
          'This is a test task for Completed status',
          '2025-03-23',
          'Completed',
          3 // projectId for "Completed" project
        ),
        taskController.createTask(
          'Archived Task',
          'This is a test task for Archived status',
          '2025-03-24',
          'Archived',
          4 // projectId for "Archived" project
        ),
      ];
      console.log('Test tasks created:', exampleTasks);

      // Assign each task to its corresponding project
      this.projects[0].tasks = [
        exampleTasks[0],
        exampleTasks[1],
        exampleTasks[2],
        exampleTasks[3],
      ]; // All Tasks in 'All' Project
      this.projects[1].tasks = [exampleTasks[0]]; // To Do task in "To Do" project
      this.projects[2].tasks = [exampleTasks[1]]; // In Progress task in "In Progress" project
      this.projects[3].tasks = [exampleTasks[2]]; // Completed task in "Completed" project
      this.projects[4].tasks = [exampleTasks[3]]; // Archived task in "Archived" project
      console.log('Projects after adding tasks:', this.projects);
    } else {
      console.log(
        'At least one project has tasks, updating "All" project tasks'
      );
      // Collect all tasks from other projects and assign to "All" project
      const allTasks = [];
      for (let i = 1; i < this.projects.length; i++) {
        allTasks.push(...this.projects[i].tasks);
      }
      this.projects[0].tasks = allTasks;
      console.log('"All" project tasks updated:', this.projects[0].tasks);
    }

    // Save the updated state to storage
    this.save();
    console.log('State saved to storage');
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
    const task = taskController.createTask(
      title,
      description,
      dueDate,
      status,
      projectIndex
    );
    projectController.addTaskToProject(this.projects[projectIndex], task);
    // Update the "All" project with the new task
    if (projectIndex !== 0) {
      this.projects[0].tasks.push(task);
    }
    this.save();
  },

  editTask(projectIndex, taskIndex, updates) {
    const task = this.projects[projectIndex].tasks[taskIndex];
    const updatedTask = taskController.editTask(task, updates);
    this.projects[projectIndex].tasks[taskIndex] = updatedTask;
    // Update the corresponding task in the "All" project
    if (projectIndex !== 0) {
      const allTasks = this.projects[0].tasks;
      const taskInAll = allTasks.find(
        (t) => t.title === task.title && t.projectId === task.projectId
      );
      if (taskInAll) {
        Object.assign(taskInAll, updatedTask);
      }
    }
    this.save();
  },

  deleteTask(projectIndex, taskIndex) {
    const task = this.projects[projectIndex].tasks[taskIndex];
    taskController.deleteTask(this.projects[projectIndex], taskIndex);
    // Remove the task from the "All" project
    if (projectIndex !== 0) {
      this.projects[0].tasks = this.projects[0].tasks.filter(
        (t) => !(t.title === task.title && t.projectId === task.projectId)
      );
    }
    this.save();
  },
};

export default appController;
