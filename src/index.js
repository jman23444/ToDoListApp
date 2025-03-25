import './styles/main.css';
import appController from './modules/controller/appController.js';
import dom from './modules/view/dom.js';

appController.init();

let isSidebarOpen = false; // Track the sidebar's toggle state in mobile view
let isMobileToggled = false; // Track if the user explicitly toggled the sidebar in mobile view
let isMobileView = window.innerWidth <= 1152; // Track the current view mode

// Debounce function to limit rapid resize event firing
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Function to set up event listeners for the mobile menu, sidebar close button, and overlay
const setupSidebarEventListeners = () => {
  const sidebar = document.getElementById('sidebar');
  const mobileMenu = document.getElementById('mobile-menu');
  const sidebarX = document.getElementById('sidebar-X');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

  if (mobileMenu) {
    mobileMenu.removeEventListener('click', toggleSidebar);
    mobileMenu.addEventListener('click', toggleSidebar);
  } else {
    console.error('Mobile menu button not found!');
  }

  if (sidebarX) {
    sidebarX.removeEventListener('click', closeSidebar);
    sidebarX.addEventListener('click', closeSidebar);
  } else {
    console.error('Sidebar close button not found!');
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.removeEventListener('click', closeSidebar);
    mobileMenuOverlay.addEventListener('click', closeSidebar);
  } else {
    console.error('Mobile menu overlay not found!');
  }

  // Function to toggle the sidebar
  function toggleSidebar() {
    console.log('Mobile menu clicked, current isSidebarOpen:', isSidebarOpen);
    isSidebarOpen = !isSidebarOpen;
    isMobileToggled = isSidebarOpen; // Track that the user toggled in mobile view
    updateSidebarVisibility();
  }

  // Function to close the sidebar
  function closeSidebar() {
    console.log(
      'Sidebar close button or overlay clicked, current isSidebarOpen:',
      isSidebarOpen
    );
    isSidebarOpen = false;
    isMobileToggled = false; // Reset mobile toggle state
    updateSidebarVisibility();
  }

  // Function to update sidebar visibility based on viewport size
  function updateSidebarVisibility() {
    const viewportWidth = window.innerWidth;
    const wasMobileView = isMobileView;
    isMobileView = viewportWidth <= 1152;

    if (viewportWidth > 1152) {
      // Transitioning from mobile view to laptop view
      if (wasMobileView && !isMobileView) {
        // Ensure the sidebar starts from the hidden position if it was hidden in mobile view
        if (!isMobileToggled) {
          sidebar.classList.add('hidden'); // Start from hidden position
        }
        sidebar.style.display = 'flex';
        sidebar.classList.remove('hidden'); // Slide in from the left
      } else {
        // Already in laptop view, ensure sidebar is visible
        sidebar.classList.remove('hidden');
        sidebar.classList.remove('collapse');
        sidebar.style.display = 'flex';
      }

      mobileMenuOverlay.style.display = 'none';
      mobileMenuOverlay.classList.remove('visible');
      isSidebarOpen = true;
    } else {
      // Mobile view: Hide by default unless explicitly toggled
      if (!wasMobileView && isMobileView) {
        // Transitioning from laptop view to mobile view
        isSidebarOpen = false;
        isMobileToggled = false;
      }

      // In mobile view, only show if the user explicitly toggled it
      isSidebarOpen = isMobileToggled;

      if (isSidebarOpen) {
        sidebar.style.display = 'flex';
        mobileMenuOverlay.style.display = 'block';
        setTimeout(() => {
          sidebar.classList.remove('hidden');
          sidebar.classList.remove('collapse');
          mobileMenuOverlay.classList.add('visible');
        }, 10);
      } else {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('collapse');
        mobileMenuOverlay.classList.remove('visible');
        setTimeout(() => {
          sidebar.style.display = 'none';
          mobileMenuOverlay.style.display = 'none';
          console.log(
            'Slide-out complete: Sidebar classList:',
            sidebar.classList.toString(),
            'transform:',
            window.getComputedStyle(sidebar).transform
          );
        }, 300);
      }
    }
  }

  // Initial call to set the correct state on page load
  updateSidebarVisibility();

  // Add debounced resize event listener
  window.removeEventListener('resize', updateSidebarVisibility);
  window.addEventListener('resize', debounce(updateSidebarVisibility, 100));
};

// Render function
const render = (projectIndex) => {
  dom.renderDashboard(
    appController.projects[projectIndex],
    () => {
      // Create Task
      dom.showTaskModal(null, (taskData) => {
        appController.addTaskToProject(
          projectIndex,
          taskData.title,
          taskData.description,
          taskData.dueDate,
          taskData.status
        );
        render(projectIndex);
      });
    },
    (taskIndex) => {
      // Edit Task
      const task = appController.projects[projectIndex].tasks[taskIndex];
      dom.showTaskModal(
        task,
        (taskData) => {
          appController.editTask(projectIndex, taskIndex, taskData);
          render(projectIndex);
        },
        true
      );
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

  // Re-attach event listeners after rendering the dashboard
  setupSidebarEventListeners();
};

// Initial render
dom.renderApp(
  appController.projects,
  render,
  () => {
    // Create Task (initial placeholder)
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

console.log('Hello, Webpack!');
