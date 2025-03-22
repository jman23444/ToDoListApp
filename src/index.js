import './styles/main.css';
import appController from './modules/controller/appController.js';
import dom from './modules/view/dom.js';

appController.init();

const render = (projectIndex) => {
  dom.renderDashboard(appController.projects[projectIndex], 
    () => {
      // Create Task
      dom.showTaskModal(null, (taskData) => {
        appController.addTaskToProject(projectIndex, taskData.title, taskData.description, taskData.dueDate, taskData.status);
        render(projectIndex);
      });
    },
    (taskIndex) => {
      // Edit Task
      const task = appController.projects[projectIndex].tasks[taskIndex];
      dom.showTaskModal(task, (taskData) => {
        appController.editTask(projectIndex, taskIndex, taskData);
        render(projectIndex);
      }, true);
    },
    (taskIndex) => {
      // Delete Task
      dom.showDeleteTaskModal(
        () => {
          appController.deleteTask(projectIndex, taskIndex);
          render(projectIndex);
        },
        () => {
          // Cancel deletion
        }
      );
    }
  );
};

// Initial render
dom.renderApp(appController.projects, render, 
  () => {
    // Create Task (initial placeholder, will be overridden by project-specific render)
  },
  () => {
    // Edit Task (initial placeholder)
  },
  () => {
    // Delete Task (initial placeholder)
  }
);

// Render the "To Do" project by default
render(0);

console.log("Hello, Webpack!");

