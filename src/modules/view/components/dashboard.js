import { format } from 'date-fns';

const dashboard = {
  renderDashboard(project, onCreateTask, onEditTask, onDeleteTask) {
    console.log('Rendering dashboard');
    const dashboard = document.createElement('div');
    dashboard.id = 'dashboard';

    // Maintain filter state
    let currentFilter = 'All'; // Default filter: show all tasks

    // Dashboard Header Part 1
    const header1 = document.createElement('div');
    header1.className = 'dashboard-header';
    const header1Group1 = document.createElement('div');
    header1Group1.className = 'nav-title-group';
    const mobileMenuSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mobileMenuSvg.id = 'mobile-menu';
    mobileMenuSvg.setAttribute('width', '24');
    mobileMenuSvg.setAttribute('height', '24');
    mobileMenuSvg.setAttribute('viewBox', '0 0 24 24');
    mobileMenuSvg.setAttribute('fill', 'none');
    mobileMenuSvg.setAttribute('stroke', 'currentColor');
    mobileMenuSvg.setAttribute('stroke-width', '2');
    mobileMenuSvg.setAttribute('stroke-linecap', 'round');
    mobileMenuSvg.setAttribute('stroke-linejoin', 'round');
    mobileMenuSvg.innerHTML = `
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    `;
    mobileMenuSvg.addEventListener('click', () => {
      document.getElementById('sidebar').style.display = 'block';
      document.getElementById('mobile-menu-overlay').style.display = 'block';
    });
    const taskSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    taskSvg.id = 'task-svg';
    taskSvg.setAttribute('width', '32');
    taskSvg.setAttribute('height', '32');
    taskSvg.setAttribute('viewBox', '0 0 32 32');
    taskSvg.setAttribute('fill', 'none');
    taskSvg.innerHTML = `
      <path d="M20.0001 2.66663H12.0001C11.2637 2.66663 10.6667 3.26358 10.6667 3.99996V6.66663C10.6667 7.40301 11.2637 7.99996 12.0001 7.99996H20.0001C20.7365 7.99996 21.3334 7.40301 21.3334 6.66663V3.99996C21.3334 3.26358 20.7365 2.66663 20.0001 2.66663Z" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.3333 5.33337H23.9999C24.7072 5.33337 25.3854 5.61433 25.8855 6.11442C26.3856 6.61452 26.6666 7.2928 26.6666 8.00004V26.6667C26.6666 27.374 26.3856 28.0522 25.8855 28.5523C25.3854 29.0524 24.7072 29.3334 23.9999 29.3334H7.99992C7.29267 29.3334 6.6144 29.0524 6.1143 28.5523C5.6142 28.0522 5.33325 27.374 5.33325 26.6667V8.00004C5.33325 7.2928 5.6142 6.61452 6.1143 6.11442C6.6144 5.61433 7.29267 5.33337 7.99992 5.33337H10.6666" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 14.6666H21.3333" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 21.3334H21.3333" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.6667 14.6666H10.6801" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.6667 21.3334H10.6801" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    const tasksText = document.createElement('p');
    tasksText.textContent = 'Tasks';
    header1Group1.appendChild(mobileMenuSvg);
    header1Group1.appendChild(taskSvg);
    header1Group1.appendChild(tasksText);

    const header1Group2 = document.createElement('div');
    header1Group2.className = 'nav-title-group';
    const emailIcon = document.createElement('div');
    emailIcon.id = 'email-icon';
    const emailLetter = document.createElement('p');
    emailLetter.id = 'email-letter';
    emailLetter.textContent = 'J';
    emailIcon.appendChild(emailLetter);

    const shareContainer = document.createElement('div');
    shareContainer.className = 'svg-container';
    const shareText = document.createElement('p');
    shareText.textContent = 'Share';
    shareContainer.appendChild(shareText);

    const starContainer = document.createElement('div');
    starContainer.className = 'svg-container';
    const starSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    starSvg.id = 'star-icon';
    starSvg.setAttribute('width', '32');
    starSvg.setAttribute('height', '32');
    starSvg.setAttribute('viewBox', '0 0 32 32');
    starSvg.setAttribute('fill', 'none');
    starSvg.innerHTML = `
      <path d="M15.3665 3.05994C15.4249 2.94189 15.5152 2.84252 15.6271 2.77304C15.739 2.70356 15.8681 2.66675 15.9998 2.66675C16.1315 2.66675 16.2606 2.70356 16.3725 2.77304C16.4844 2.84252 16.5747 2.94189 16.6331 3.05994L19.7131 9.29861C19.916 9.70923 20.2155 10.0645 20.586 10.3339C20.9564 10.6033 21.3866 10.7788 21.8398 10.8453L28.7278 11.8533C28.8583 11.8722 28.9809 11.9272 29.0818 12.0122C29.1826 12.0972 29.2577 12.2087 29.2985 12.3341C29.3393 12.4595 29.3442 12.5938 29.3126 12.7219C29.281 12.8499 29.2142 12.9665 29.1198 13.0586L24.1385 17.9093C23.8099 18.2294 23.5642 18.6246 23.4222 19.0608C23.2803 19.497 23.2465 19.9611 23.3238 20.4133L24.4998 27.2666C24.5228 27.3971 24.5087 27.5314 24.4591 27.6542C24.4095 27.777 24.3264 27.8834 24.2192 27.9613C24.112 28.0391 23.9851 28.0853 23.8529 28.0945C23.7208 28.1037 23.5887 28.0755 23.4718 28.0133L17.3145 24.7759C16.9088 24.5629 16.4574 24.4516 15.9991 24.4516C15.5409 24.4516 15.0895 24.5629 14.6838 24.7759L8.52779 28.0133C8.4109 28.0752 8.27899 28.103 8.14706 28.0936C8.01514 28.0842 7.88849 28.038 7.78152 27.9602C7.67456 27.8824 7.59157 27.7762 7.542 27.6536C7.49243 27.5309 7.47827 27.3969 7.50113 27.2666L8.67579 20.4146C8.75339 19.9622 8.71977 19.4978 8.57785 19.0613C8.43592 18.6249 8.18994 18.2295 7.86113 17.9093L2.8798 13.0599C2.78459 12.968 2.71712 12.8511 2.68508 12.7227C2.65304 12.5943 2.65771 12.4594 2.69857 12.3335C2.73942 12.2076 2.81482 12.0957 2.91616 12.0106C3.01751 11.9254 3.14073 11.8705 3.2718 11.8519L10.1585 10.8453C10.6121 10.7793 11.043 10.604 11.4139 10.3346C11.7848 10.0652 12.0847 9.70963 12.2878 9.29861L15.3665 3.05994Z" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    starContainer.appendChild(starSvg);

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'svg-container';
    const dotsSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dotsSvg.id = 'three-dots';
    dotsSvg.setAttribute('width', '32');
    dotsSvg.setAttribute('height', '32');
    dotsSvg.setAttribute('viewBox', '0 0 32 32');
    dotsSvg.setAttribute('fill', 'none');
    dotsSvg.innerHTML = `
      <path d="M15.9998 17.3333C16.7362 17.3333 17.3332 16.7363 17.3332 16C17.3332 15.2636 16.7362 14.6666 15.9998 14.6666C15.2635 14.6666 14.6665 15.2636 14.6665 16C14.6665 16.7363 15.2635 17.3333 15.9998 17.3333Z" fill="#373530" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25.3333 17.3333C26.0697 17.3333 26.6667 16.7363 26.6667 16C26.6667 15.2636 26.0697 14.6666 25.3333 14.6666C24.597 14.6666 24 15.2636 24 16C24 16.7363 24.597 17.3333 25.3333 17.3333Z" fill="#373530" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.66683 17.3333C7.40321 17.3333 8.00016 16.7363 8.00016 16C8.00016 15.2636 7.40321 14.6666 6.66683 14.6666C5.93045 14.6666 5.3335 15.2636 5.3335 16C5.3335 16.7363 5.93045 17.3333 6.66683 17.3333Z" fill="#373530" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    dotsContainer.appendChild(dotsSvg);

    header1Group2.appendChild(emailIcon);
    header1Group2.appendChild(shareContainer);
    header1Group2.appendChild(starContainer);
    header1Group2.appendChild(dotsContainer);
    header1.appendChild(header1Group1);
    header1.appendChild(header1Group2);
    dashboard.appendChild(header1);

    // Dashboard Header Part 2
    const header2 = document.createElement('div');
    header2.className = 'dashboard-header';
    const header2Title = document.createElement('h1');
    header2Title.textContent = "Brad's To-Do List";
    const iconHolder = document.createElement('div');
    iconHolder.className = 'icon-holder';
    const plusContainer = document.createElement('div');
    plusContainer.className = 'svg-container';
    const plusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    plusSvg.setAttribute('width', '32');
    plusSvg.setAttribute('height', '32');
    plusSvg.setAttribute('viewBox', '0 0 32 32');
    plusSvg.setAttribute('fill', 'none');
    plusSvg.innerHTML = `
      <path d="M6.6665 16H25.3332" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 6.66663V25.3333" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    plusSvg.addEventListener('click', onCreateTask);
    plusContainer.appendChild(plusSvg);

    const listContainer = document.createElement('div');
    listContainer.className = 'svg-container filter-container';
    const listSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    listSvg.setAttribute('width', '32');
    listSvg.setAttribute('height', '32');
    listSvg.setAttribute('viewBox', '0 0 32 32');
    listSvg.setAttribute('fill', 'none');
    listSvg.innerHTML = `
      <path d="M4 8H28" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.3335 16H22.6668" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.3335 24H18.6668" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    listContainer.appendChild(listSvg);

    // Create the filter dropdown
    const filterDropdown = document.createElement('div');
    filterDropdown.className = 'filter-dropdown';
    filterDropdown.style.display = 'none'; // Hidden by default

    const filterOptions = ['All', 'To Do', 'In Progress', 'Completed', 'Archived'];
    filterOptions.forEach(option => {
      const filterItem = document.createElement('div');
      filterItem.className = 'filter-item';
      if (option === currentFilter) {
        filterItem.classList.add('selected');
      }
      filterItem.textContent = option;
      filterItem.addEventListener('click', () => {
        currentFilter = option;
        console.log('Filter changed to:', currentFilter);
        filterDropdown.style.display = 'none'; // Hide dropdown after selection
        // Update selected state
        filterDropdown.querySelectorAll('.filter-item').forEach(item => item.classList.remove('selected'));
        filterItem.classList.add('selected');
        renderTasks(); // Re-render tasks with the new filter
      });
      filterDropdown.appendChild(filterItem);
    });
    listContainer.appendChild(filterDropdown);

    // Toggle dropdown on click
    listSvg.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = filterDropdown.style.display === 'block';
      filterDropdown.style.display = isVisible ? 'none' : 'block';
      console.log('Filter dropdown toggled:', filterDropdown.style.display);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!listContainer.contains(e.target)) {
        filterDropdown.style.display = 'none';
        console.log('Filter dropdown closed (clicked outside)');
      }
    });

    iconHolder.appendChild(plusContainer);
    iconHolder.appendChild(listContainer);
    header2.appendChild(header2Title);
    header2.appendChild(iconHolder);
    dashboard.appendChild(header2);

    // Separator
    const separator1 = document.createElement('div');
    separator1.className = 'seperator';
    dashboard.appendChild(separator1);

    // Tasks Container
    const tasksContainer = document.createElement('div');
    tasksContainer.id = 'tasks';
    dashboard.appendChild(tasksContainer);

    // Function to render tasks based on the current filter
    const renderTasks = () => {
      tasksContainer.innerHTML = ''; // Clear existing tasks
      console.log('Rendering tasks with filter:', currentFilter);
      if (project.tasks && Array.isArray(project.tasks)) {
        project.tasks.forEach((task, index) => {
          console.log(`Processing task ${index}:`, task);
          // Apply filter: show all tasks for "All" filter or match the task status
          if (currentFilter === 'All' || task.status === currentFilter) {
            try {
              const taskElement = this.renderTask(task, index, onEditTask, onDeleteTask);
              tasksContainer.appendChild(taskElement);
              const separator = document.createElement('div');
              separator.className = 'seperator';
              tasksContainer.appendChild(separator);
              console.log(`Task ${index} appended to tasksContainer`);
            } catch (error) {
              console.error(`Error rendering task ${index}:`, error, 'Task data:', task);
            }
          } else {
            console.log(`Skipping task ${index}: status ${task.status} does not match filter ${currentFilter}`);
          }
        });
      } else {
        console.log('No tasks to render or project.tasks is not an array.');
      }
    };

    // Initial render of tasks
    renderTasks();

    return dashboard;
  },

  renderTask(task, index, onEditTask, onDeleteTask) {
    console.log('Rendering task:', task);
    // Validate task properties
    if (!task.title || !task.status || !task.dueDate) {
      throw new Error('Task is missing required properties (title, status, or dueDate)');
    }

    const taskElement = document.createElement('div');
    taskElement.className = `task ${task.status.toLowerCase().replace(' ', '-')}-task`;
    console.log('Created task element with class:', taskElement.className);

    const taskTitleTags = document.createElement('div');
    taskTitleTags.className = 'task-title-tags';
    console.log('Created taskTitleTags element');

    // Define status-to-color mapping
    const statusColors = {
      'To Do': { stroke: '#487CA5', fill: '#E9F3F7' },
      'In Progress': { stroke: '#C29343', fill: '#FAF3DD' },
      'Completed': { stroke: '#548164', fill: '#EEF3ED' },
      'Archived': { stroke: '#787774', fill: '#F1F1EF' }
    };

    const statusColor = statusColors[task.status] || statusColors['To Do'];
    console.log('Status color for task:', statusColor);

    const taskSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    taskSvg.id = 'status-task';
    taskSvg.setAttribute('width', '32');
    taskSvg.setAttribute('height', '32');
    taskSvg.setAttribute('viewBox', '0 0 32 32');
    taskSvg.setAttribute('fill', 'none');
    taskSvg.innerHTML = `
      <path d="M16.0001 29.3333C23.3639 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63616 23.3639 2.66663 16.0001 2.66663C8.63628 2.66663 2.66675 8.63616 2.66675 16C2.66675 23.3638 8.63628 29.3333 16.0001 29.3333Z" fill="${statusColor.fill}" stroke="${statusColor.stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    console.log('Created taskSvg element');

    const titleTags = document.createElement('div');
    titleTags.className = 'title-tags';
    console.log('Created titleTags element');

    const taskTitle = document.createElement('p');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.title;
    console.log('Created taskTitle element with text:', task.title);

    const tags = document.createElement('div');
    tags.className = 'tags';
    console.log('Created tags element');

    const statusTag = document.createElement('div');
    statusTag.className = `status-tag ${task.status.toLowerCase().replace(' ', '-')}`;
    statusTag.textContent = task.status;
    console.log('Created statusTag element with class:', statusTag.className, 'text:', task.status);

    const dueDate = document.createElement('p');
    dueDate.className = 'due-date';
    console.log('Formatting dueDate:', task.dueDate);
    // Parse the dueDate string (YYYY-MM-DD) into a Date object
    const [year, month, day] = task.dueDate.split('-');
    const parsedDate = new Date(year, month - 1, day);
    console.log('Parsed date:', parsedDate);
    dueDate.innerHTML = task.status === 'Completed' || task.status === 'Archived'
      ? `${task.status === 'Completed' ? 'Completed On' : 'Archived'}: <span class="date">${format(parsedDate, 'M/d/yyyy')}</span>`
      : `Due Date: <span class="date">${format(parsedDate, 'M/d/yyyy')}</span>`;
    console.log('Created dueDate element with HTML:', dueDate.innerHTML);

    tags.appendChild(statusTag);
    tags.appendChild(dueDate);
    titleTags.appendChild(taskTitle);
    titleTags.appendChild(tags);
    taskTitleTags.appendChild(taskSvg);
    taskTitleTags.appendChild(titleTags);

    const taskControls = document.createElement('div');
    taskControls.className = 'task-controls';
    console.log('Created taskControls element');

    const editContainer = document.createElement('div');
    editContainer.className = 'svg-container';
    const editSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    editSvg.classList.add('edit-task');
    editSvg.setAttribute('width', '32');
    editSvg.setAttribute('height', '33');
    editSvg.setAttribute('viewBox', '0 0 32 33');
    editSvg.setAttribute('fill', 'none');
    editSvg.innerHTML = `
      <path d="M28.2322 9.58265C28.9372 8.87788 29.3333 7.92194 29.3334 6.92512C29.3335 5.9283 28.9377 4.97226 28.2329 4.26731C27.5281 3.56237 26.5722 3.16626 25.5754 3.16614C24.5786 3.16601 23.6225 3.56188 22.9176 4.26665L5.1229 22.0653C4.81333 22.374 4.58439 22.754 4.45624 23.172L2.6949 28.9746C2.66045 29.09 2.65784 29.2124 2.68737 29.3291C2.7169 29.4458 2.77747 29.5523 2.86263 29.6373C2.9478 29.7223 3.0544 29.7827 3.17112 29.8121C3.28783 29.8414 3.41032 29.8386 3.52557 29.804L9.32957 28.044C9.74713 27.917 10.1271 27.6894 10.4362 27.3813L28.2322 9.58265Z" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 7.16669L25.3333 12.5" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    editSvg.addEventListener('click', () => onEditTask(index));
    editContainer.appendChild(editSvg);
    console.log('Created editContainer with editSvg');

    const deleteContainer = document.createElement('div');
    deleteContainer.className = 'svg-container';
    const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    deleteSvg.id = 'delete-task';
    deleteSvg.setAttribute('width', '32');
    deleteSvg.setAttribute('height', '33');
    deleteSvg.setAttribute('viewBox', '0 0 32 33');
    deleteSvg.setAttribute('fill', 'none');
    deleteSvg.innerHTML = `
      <path d="M4 8.5H28" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25.3332 8.5V27.1667C25.3332 28.5 23.9998 29.8333 22.6665 29.8333H9.33317C7.99984 29.8333 6.6665 28.5 6.6665 27.1667V8.5" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.6665 8.49996V5.83329C10.6665 4.49996 11.9998 3.16663 13.3332 3.16663H18.6665C19.9998 3.16663 21.3332 4.49996 21.3332 5.83329V8.49996" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.3335 15.1667V23.1667" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.6665 15.1667V23.1667" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
    deleteSvg.addEventListener('click', () => onDeleteTask(index));
    deleteContainer.appendChild(deleteSvg);
    console.log('Created deleteContainer with deleteSvg');

    taskControls.appendChild(editContainer);
    taskControls.appendChild(deleteContainer);

    taskElement.appendChild(taskTitleTags);
    taskElement.appendChild(taskControls);

    console.log('Task element fully created:', taskElement);
    return taskElement;
  },
};

export default dashboard;