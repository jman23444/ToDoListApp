import sidebar from './components/sidebar.js';
import dashboard from './components/dashboard.js';
import taskModal from './components/modals.js';

const dom = {
    renderApp(projects, onProjectClick, onCreateTask, onEditTask, onDeleteTask) {
      const app = document.getElementById('app');
      app.innerHTML = ''; // Clear the app container
  
      // Render Sidebar
      const sidebarElement = sidebar.renderSidebar(projects, onProjectClick);
      app.appendChild(sidebarElement);
  
      // Render Dashboard (initially empty, will be updated by project click)
      const dashboardElement = document.createElement('div');
      dashboardElement.id = 'dashboard';
      app.appendChild(dashboardElement);
    },
  
    renderDashboard(project, onCreateTask, onEditTask, onDeleteTask) {
      const dashboardElement = dashboard.renderDashboard(project, onCreateTask, onEditTask, onDeleteTask);
      const existingDashboard = document.getElementById('dashboard');
      existingDashboard.innerHTML = ''; // Clear previous content
      existingDashboard.appendChild(dashboardElement);
    },
  
    showTaskModal(task, onSubmit, isEdit = false) {
      taskModal.showTaskModal(task, onSubmit, isEdit);
    },
  
    showDeleteTaskModal(onConfirm, onCancel) {
      taskModal.showDeleteTaskModal(onConfirm, onCancel);
    },
  };
  
  export default dom;