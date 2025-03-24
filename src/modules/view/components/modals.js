const taskModal = {
  // Show Create/Edit Task Modal
  showTaskModal(task, onSubmit, isEdit = false) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = isEdit ? 'edit-task-modal' : 'create-task-modal';
    modal.innerHTML = `
      <div class="modal-content" id="${isEdit ? 'edit-task-modal' : 'create-task-modal'}">
        <div class="modal-header">
          <h2>${isEdit ? 'Edit Task' : 'Create Task'}</h2>
          <button class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form id="create-task-form">
          <div class="form-group">
            <label for="task-name">Task Name</label>
            <input type="text" id="task-name" name="task-name" placeholder="Enter Name" value="${task ? task.title : ''}" required>
          </div>
          <div class="form-group">
            <label for="task-status">Task Status</label>
            <select id="task-status" name="task-status" required>
              <option value="" disabled ${!task ? 'selected' : ''}>Select Option</option>
              <option value="To Do" ${task && task.status === 'To Do' ? 'selected' : ''}>To Do</option>
              <option value="In Progress" ${task && task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Completed" ${task && task.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Archived" ${task && task.status === 'Archived' ? 'selected' : ''}>Archived</option>
            </select>
          </div>
          <div class="form-group">
            <label for="due-date">Due Date</label>
            <input type="date" id="due-date" name="due-date" value="${task ? task.dueDate.split('T')[0] : ''}" required>
          </div>
          <div class="form-group">
            <label for="task-description">Task Description</label>
            <textarea id="task-description" name="task-description" placeholder="Enter Description" rows="4">${task ? task.description : ''}</textarea>
          </div>
          <button type="submit" class="modal-btn submit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
      console.log('Modal opened: classList:', modal.classList.toString(), 'modal-content opacity:', window.getComputedStyle(modal.querySelector('.modal-content')).opacity, 'transform:', window.getComputedStyle(modal.querySelector('.modal-content')).transform);
    }, 10);

    const form = modal.querySelector('#create-task-form');
    const closeBtn = modal.querySelector('.close-btn');
    const modalContent = modal.querySelector('.modal-content');

    const closeModal = () => {
      console.log('Before modal close: classList:', modal.classList.toString(), 'modal-content opacity:', window.getComputedStyle(modal.querySelector('.modal-content')).opacity, 'transform:', window.getComputedStyle(modal.querySelector('.modal-content')).transform);
      modal.classList.add('reflow');
      modal.classList.remove('show');
      console.log('After removing show: classList:', modal.classList.toString());
      setTimeout(() => {
        modal.remove();
        console.log('Modal closed and removed');
      }, 300);
    };

    // Close modal when clicking the background (but not the modal content)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { // Only close if the click is on the backdrop, not the modal content
        closeModal();
      }
    });

    // Prevent clicks on the modal content from bubbling up to the backdrop
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('task-name').value;
      const status = document.getElementById('task-status').value;
      const dueDate = document.getElementById('due-date').value;
      const description = document.getElementById('task-description').value;

      if (title && dueDate && status) {
        onSubmit({ title, status, dueDate, description });
        closeModal();
      }
    });

    closeBtn.addEventListener('click', closeModal);
  },

  // Show Delete Task Modal
  showDeleteTaskModal(onConfirm, onCancel) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'delete-task-modal';
    modal.innerHTML = `
      <div class="modal-content" id="delete-task-modal">
        <div class="modal-header">
          <h2>Delete Task?</h2>
          <button class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-buttons-container">
          <button class="modal-btn" id="delete-task-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
          <button class="modal-btn" id="keep-task-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M24 8L8 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 8L24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
      console.log('Modal opened: classList:', modal.classList.toString(), 'modal-content opacity:', window.getComputedStyle(modal.querySelector('.modal-content')).opacity, 'transform:', window.getComputedStyle(modal.querySelector('.modal-content')).transform);
    }, 10);

    const deleteBtn = modal.querySelector('#delete-task-button');
    const keepBtn = modal.querySelector('#keep-task-button');
    const closeBtn = modal.querySelector('.close-btn');
    const modalContent = modal.querySelector('.modal-content');

    const closeModal = () => {
      console.log('Before modal close: classList:', modal.classList.toString(), 'modal-content opacity:', window.getComputedStyle(modal.querySelector('.modal-content')).opacity, 'transform:', window.getComputedStyle(modal.querySelector('.modal-content')).transform);
      modal.classList.add('reflow');
      modal.classList.remove('show');
      console.log('After removing show: classList:', modal.classList.toString());
      setTimeout(() => {
        modal.remove();
        console.log('Modal closed and removed');
      }, 300);
    };

    // Close modal when clicking the background (but not the modal content)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { // Only close if the click is on the backdrop, not the modal content
        closeModal();
      }
    });

    // Prevent clicks on the modal content from bubbling up to the backdrop
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    deleteBtn.addEventListener('click', () => {
      onConfirm();
      closeModal();
    });

    keepBtn.addEventListener('click', () => {
      onCancel();
      closeModal();
    });

    closeBtn.addEventListener('click', () => {
      onCancel();
      closeModal();
    });
  },
};

export default taskModal;