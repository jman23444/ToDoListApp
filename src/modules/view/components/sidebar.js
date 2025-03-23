
const sidebar = {
    // Render Sidebar (already implemented in the previous step)
    renderSidebar(projects, onProjectClick) {
        const sidebar = document.createElement('nav');
        sidebar.id = 'sidebar';

        // Sidebar close button (for mobile)
        const sidebarX = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sidebarX.id = 'sidebar-X';
        sidebarX.setAttribute('width', '32');
        sidebarX.setAttribute('height', '32');
        sidebarX.setAttribute('viewBox', '0 0 32 32');
        sidebarX.setAttribute('fill', 'none');
        sidebarX.innerHTML = `
        <path d="M24 8L8 24" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 8L24 24" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        //
        sidebarX.addEventListener('click', () => {
            sidebar.style.display = 'none';
            document.getElementById('mobile-menu-overlay').style.display = 'none';
            
        });
        //
        sidebar.appendChild(sidebarX);
        // Sidebar menu
        const sidebarMenu = document.createElement('ul');
        sidebarMenu.id = 'sidebar-menu';
        

        // User profile menu option
        const userSelect = document.createElement('li');
        userSelect.className = 'menu-item';
        userSelect.id = 'user-select-menu-option';
        const userSelectLink = document.createElement('a');
        userSelectLink.href = '#';
        const userSelectGroup = document.createElement('div');
        userSelectGroup.className = 'nav-title-group';
        const userProfileSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        userProfileSvg.id = 'user-profile-svg';
        userProfileSvg.setAttribute('width', '32');
        userProfileSvg.setAttribute('height', '32');
        userProfileSvg.setAttribute('viewBox', '0 0 32 32');
        userProfileSvg.setAttribute('fill', 'none');
        userProfileSvg.innerHTML = `
        <path d="M24 28C24 25.8783 23.1571 23.8434 21.6569 22.3431C20.1566 20.8429 18.1217 20 16 20C13.8783 20 11.8434 20.8429 10.3431 22.3431C8.84286 23.8434 8 25.8783 8 28" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.0001 20C18.9456 20 21.3334 17.6122 21.3334 14.6667C21.3334 11.7212 18.9456 9.33337 16.0001 9.33337C13.0546 9.33337 10.6667 11.7212 10.6667 14.6667C10.6667 17.6122 13.0546 20 16.0001 20Z" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M25.3333 4H6.66667C5.19391 4 4 5.19391 4 6.66667V25.3333C4 26.8061 5.19391 28 6.66667 28H25.3333C26.8061 28 28 26.8061 28 25.3333V6.66667C28 5.19391 26.8061 4 25.3333 4Z" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        const userSelectText = document.createElement('p');
        userSelectText.textContent = "Brad's To-Do List";
        userSelectGroup.appendChild(userProfileSvg);
        userSelectGroup.appendChild(userSelectText);
        const userSelectArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        userSelectArrow.setAttribute('width', '32');
        userSelectArrow.setAttribute('height', '32');
        userSelectArrow.setAttribute('viewBox', '0 0 32 32');
        userSelectArrow.setAttribute('fill', 'none');
        userSelectArrow.innerHTML = `
        <path d="M8 12L16 20L24 12" stroke="#373530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        userSelectLink.appendChild(userSelectGroup);
        userSelectLink.appendChild(userSelectArrow);
        userSelect.appendChild(userSelectLink);
        sidebarMenu.appendChild(userSelect);

        // Search menu option
        const searchItem = document.createElement('li');
        searchItem.className = 'menu-item';
        searchItem.id = 'search-menu-option';
        const searchLink = document.createElement('a');
        searchLink.href = '#';
        const searchGroup = document.createElement('div');
        searchGroup.className = 'nav-title-group';
        const searchSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        searchSvg.classList.add('menu-icon');
        searchSvg.setAttribute('width', '32');
        searchSvg.setAttribute('height', '32');
        searchSvg.setAttribute('viewBox', '0 0 32 32');
        searchSvg.setAttribute('fill', 'none');
        searchSvg.innerHTML = `
        <path d="M14.6667 25.3333C20.5577 25.3333 25.3333 20.5577 25.3333 14.6667C25.3333 8.77563 20.5577 4 14.6667 4C8.77563 4 4 8.77563 4 14.6667C4 20.5577 8.77563 25.3333 14.6667 25.3333Z" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M27.9999 28.0001L22.2666 22.2667" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        const searchText = document.createElement('p');
        searchText.textContent = 'Search';
        searchGroup.appendChild(searchSvg);
        searchGroup.appendChild(searchText);
        searchLink.appendChild(searchGroup);
        searchItem.appendChild(searchLink);
        sidebarMenu.appendChild(searchItem);

        // Tasks menu option
        const tasksItem = document.createElement('li');
        tasksItem.className = 'menu-item';
        tasksItem.id = 'tasks-menu-option';
        const tasksLink = document.createElement('a');
        tasksLink.href = '#';
        const tasksGroup = document.createElement('div');
        tasksGroup.className = 'nav-title-group';
        const tasksSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tasksSvg.classList.add('menu-icon');
        tasksSvg.setAttribute('width', '32');
        tasksSvg.setAttribute('height', '32');
        tasksSvg.setAttribute('viewBox', '0 0 32 32');
        tasksSvg.setAttribute('fill', 'none');
        tasksSvg.innerHTML = `
        <path d="M20.0001 2.66663H12.0001C11.2637 2.66663 10.6667 3.26358 10.6667 3.99996V6.66663C10.6667 7.40301 11.2637 7.99996 12.0001 7.99996H20.0001C20.7365 7.99996 21.3334 7.40301 21.3334 6.66663V3.99996C21.3334 3.26358 20.7365 2.66663 20.0001 2.66663Z" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21.3333 5.33337H23.9999C24.7072 5.33337 25.3854 5.61433 25.8855 6.11442C26.3856 6.61452 26.6666 7.2928 26.6666 8.00004V26.6667C26.6666 27.374 26.3856 28.0522 25.8855 28.5523C25.3854 29.0524 24.7072 29.3334 23.9999 29.3334H7.99992C7.29267 29.3334 6.6144 29.0524 6.1143 28.5523C5.6142 28.0522 5.33325 27.374 5.33325 26.6667V8.00004C5.33325 7.2928 5.6142 6.61452 6.1143 6.11442C6.6144 5.61433 7.29267 5.33337 7.99992 5.33337H10.6666" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 18.6667L14.6667 21.3333L20 16" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        const tasksText = document.createElement('p');
        tasksText.textContent = 'Tasks';
        tasksGroup.appendChild(tasksSvg);
        tasksGroup.appendChild(tasksText);
        const tasksArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tasksArrow.setAttribute('width', '32');
        tasksArrow.setAttribute('height', '32');
        tasksArrow.setAttribute('viewBox', '0 0 32 32');
        tasksArrow.setAttribute('fill', 'none');
        tasksArrow.innerHTML = `
        <path d="M8 12L16 20L24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        tasksLink.appendChild(tasksGroup);
        tasksLink.appendChild(tasksArrow);
        tasksItem.appendChild(tasksLink);
        sidebarMenu.appendChild(tasksItem);

        // Nested menu options (To Do, In Progress, Completed, Archived)
        const nestedOptions = [
        { id: 'to-do-tasks-menu-option', text: 'To Do', svg: `
            <path d="M15.9999 28C21.891 28 26.6666 23.2244 26.6666 17.3334C26.6666 11.4423 21.891 6.66669 15.9999 6.66669C10.1089 6.66669 5.33325 11.4423 5.33325 17.3334C5.33325 23.2244 10.1089 28 15.9999 28Z" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66675 4L2.66675 8" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M29.3333 8L25.3333 4" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.50659 24.9333L5.33325 28" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.52 24.8933L26.6667 28" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17.3334L14.6667 20L20 14.6667" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        ` },
        { id: 'in-progress-tasks-menu-option', text: 'In Progress', svg: `
            <path d="M16 2.66669V8.00002" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.6001 10.4L25.4668 6.53333" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 16H29.3333" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.6001 21.6L25.4668 25.4666" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 24V29.3333" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.53345 25.4666L10.4001 21.6" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.66675 16H8.00008" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.53345 6.53333L10.4001 10.4" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        ` },
        { id: 'completed-tasks-menu-option', text: 'Completed', svg: `
            <path d="M5.33325 26V6.00002C5.33325 5.11597 5.68444 4.26812 6.30956 3.643C6.93468 3.01788 7.78253 2.66669 8.66659 2.66669H25.3333C25.6869 2.66669 26.026 2.80716 26.2761 3.05721C26.5261 3.30726 26.6666 3.6464 26.6666 4.00002V28C26.6666 28.3536 26.5261 28.6928 26.2761 28.9428C26.026 29.1929 25.6869 29.3334 25.3333 29.3334H8.66659C7.78253 29.3334 6.93468 28.9822 6.30956 28.357C5.68444 27.7319 5.33325 26.8841 5.33325 26ZM5.33325 26C5.33325 25.116 5.68444 24.2681 6.30956 23.643C6.93468 23.0179 7.78253 22.6667 8.66659 22.6667H26.6666" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 12.6667L14.6667 15.3333L20 10" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        ` },
        { id: 'archived-tasks-menu-option', text: 'Archived', svg: `
            <path d="M28.0001 4H4.00008C3.2637 4 2.66675 4.59695 2.66675 5.33333V9.33333C2.66675 10.0697 3.2637 10.6667 4.00008 10.6667H28.0001C28.7365 10.6667 29.3334 10.0697 29.3334 9.33333V5.33333C29.3334 4.59695 28.7365 4 28.0001 4Z" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.33325 10.6667V25.3334C5.33325 26.0406 5.6142 26.7189 6.1143 27.219C6.6144 27.7191 7.29267 28 7.99992 28H23.9999C24.7072 28 25.3854 27.7191 25.8855 27.219C26.3856 26.7189 26.6666 26.0406 26.6666 25.3334V10.6667" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.3333 16H18.6666" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        ` },
        ];

        // Create a container for nested options to manage visibility
        const nestedContainer = document.createElement('div');
        nestedContainer.className = 'nested-menu-container';
        nestedContainer.style.maxHeight = '0'; // Initially hidden
        nestedContainer.style.overflow = 'hidden';
        nestedContainer.style.transition = 'max-height 0.2s ease-in-out';

        nestedOptions.forEach((option, index) => {
            const nestedItem = document.createElement('li');
            nestedItem.className = 'nested-menu-option';
            nestedItem.id = option.id;
            const nestedLink = document.createElement('a');
            nestedLink.href = '#';
            const nestedGroup = document.createElement('div');
            nestedGroup.className = 'nav-title-group';
            const nestedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            nestedSvg.classList.add('menu-icon');
            nestedSvg.setAttribute('width', '32');
            nestedSvg.setAttribute('height', '32');
            nestedSvg.setAttribute('viewBox', '0 0 32 32');
            nestedSvg.setAttribute('fill', 'none');
            nestedSvg.innerHTML = option.svg;
            const nestedText = document.createElement('p');
            nestedText.textContent = option.text;
            nestedGroup.appendChild(nestedSvg);
            nestedGroup.appendChild(nestedText);
            nestedLink.appendChild(nestedGroup);
            nestedItem.appendChild(nestedLink);

            nestedItem.addEventListener('click', () => onProjectClick(index)); // Map each category to a project
            sidebarMenu.appendChild(nestedItem);
            //
            nestedContainer.appendChild(nestedItem);
        });
        
        // Append nested container to sidebarMenu
        sidebarMenu.appendChild(nestedContainer);

        // Add click event to toggle nested menu visibility
        let isNestedVisible = false;
        tasksLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            console.log('Tasks link clicked, current visibility:', isNestedVisible);
            isNestedVisible = !isNestedVisible;

            if (isNestedVisible) {
                // Calculate the total height of the nested items
                const nestedHeight = nestedContainer.scrollHeight + 'px';
                console.log('Expanding nested menu, setting maxHeight to:', nestedHeight);
                nestedContainer.style.maxHeight = nestedHeight;
                tasksArrow.style.transform = 'rotate(180deg)';
            } else {
                console.log('Collapsing nested menu, setting maxHeight to 0');
                nestedContainer.style.maxHeight = '0';
                tasksArrow.style.transform = 'rotate(0deg)';
            }
        });


        // Sidebar footer
        const sidebarFooter = document.createElement('div');
        sidebarFooter.className = 'sidebar-footer';

        // Settings footer item
        const settingsItem = document.createElement('div');
        settingsItem.className = 'footer-item';
        const settingsLink = document.createElement('a');
        settingsLink.href = '#';
        settingsLink.id = 'settings';
        const settingsGroup = document.createElement('div');
        settingsGroup.className = 'nav-title-group';
        const settingsSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        settingsSvg.setAttribute('width', '32');
        settingsSvg.setAttribute('height', '32');
        settingsSvg.setAttribute('viewBox', '0 0 32 32');
        settingsSvg.setAttribute('fill', 'none');
        settingsSvg.innerHTML = `
        <path d="M16.2933 2.66666H15.7067C14.9994 2.66666 14.3211 2.94761 13.8211 3.4477C13.321 3.9478 13.04 4.62608 13.04 5.33332V5.57332C13.0395 6.04096 12.9161 6.50024 12.6821 6.90511C12.448 7.30997 12.1117 7.64617 11.7067 7.87999L11.1333 8.21332C10.728 8.44737 10.2681 8.57059 9.8 8.57059C9.3319 8.57059 8.87205 8.44737 8.46667 8.21332L8.26667 8.10666C7.65476 7.75367 6.92779 7.65791 6.24534 7.8404C5.56289 8.02289 4.98074 8.4687 4.62667 9.07999L4.33334 9.58666C3.98035 10.1986 3.88459 10.9255 4.06708 11.608C4.24957 12.2904 4.69538 12.8726 5.30667 13.2267L5.50667 13.36C5.9097 13.5927 6.24483 13.9268 6.47874 14.3291C6.71265 14.7314 6.83719 15.188 6.84 15.6533V16.3333C6.84187 16.8032 6.71954 17.2653 6.48539 17.6727C6.25125 18.0801 5.91361 18.4184 5.50667 18.6533L5.30667 18.7733C4.69538 19.1274 4.24957 19.7095 4.06708 20.392C3.88459 21.0744 3.98035 21.8014 4.33334 22.4133L4.62667 22.92C4.98074 23.5313 5.56289 23.9771 6.24534 24.1596C6.92779 24.3421 7.65476 24.2463 8.26667 23.8933L8.46667 23.7867C8.87205 23.5526 9.3319 23.4294 9.8 23.4294C10.2681 23.4294 10.728 23.5526 11.1333 23.7867L11.7067 24.12C12.1117 24.3538 12.448 24.69 12.6821 25.0949C12.9161 25.4997 13.0395 25.959 13.04 26.4267V26.6667C13.04 27.3739 13.321 28.0522 13.8211 28.5523C14.3211 29.0524 14.9994 29.3333 15.7067 29.3333H16.2933C17.0006 29.3333 17.6789 29.0524 18.179 28.5523C18.6791 28.0522 18.96 27.3739 18.96 26.6667V26.4267C18.9605 25.959 19.0839 25.4997 19.318 25.0949C19.552 24.69 19.8884 24.3538 20.2933 24.12L20.8667 23.7867C21.2721 23.5526 21.7319 23.4294 22.2 23.4294C22.6681 23.4294 23.128 23.5526 23.5333 23.7867L23.7333 23.8933C24.3452 24.2463 25.0722 24.3421 25.7547 24.1596C26.4371 23.9771 27.0193 23.5313 27.3733 22.92L27.6667 22.4C28.0197 21.7881 28.1154 21.0611 27.9329 20.3787C27.7504 19.6962 27.3046 19.1141 26.6933 18.76L26.4933 18.6533C26.0864 18.4184 25.7488 18.0801 25.5146 17.6727C25.2805 17.2653 25.1581 16.8032 25.16 16.3333V15.6667C25.1581 15.1968 25.2805 14.7347 25.5146 14.3273C25.7488 13.9199 26.0864 13.5816 26.4933 13.3467L26.6933 13.2267C27.3046 12.8726 27.7504 12.2904 27.9329 11.608C28.1154 10.9255 28.0197 10.1986 27.6667 9.58666L27.3733 9.07999C27.0193 8.4687 26.4371 8.02289 25.7547 7.8404C25.0722 7.65791 24.3452 7.75367 23.7333 8.10666L23.5333 8.21332C23.128 8.44737 22.6681 8.57059 22.2 8.57059C21.7319 8.57059 21.2721 8.44737 20.8667 8.21332L20.2933 7.87999C19.8884 7.64617 19.552 7.30997 19.318 6.90511C19.0839 6.50024 18.9605 6.04096 18.96 5.57332V5.33332C18.96 4.62608 18.6791 3.9478 18.179 3.4477C17.6789 2.94761 17.0006 2.66666 16.2933 2.66666Z" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        const settingsText = document.createElement('p');
        settingsText.textContent = 'Settings';
        settingsGroup.appendChild(settingsSvg);
        settingsGroup.appendChild(settingsText);
        settingsLink.appendChild(settingsGroup);
        settingsItem.appendChild(settingsLink);
        sidebarFooter.appendChild(settingsItem);

        // Log out footer item
        const logoutItem = document.createElement('div');
        logoutItem.className = 'footer-item';
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.id = 'log-out';
        const logoutGroup = document.createElement('div');
        logoutGroup.className = 'nav-title-group';
        const logoutSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        logoutSvg.setAttribute('width', '32');
        logoutSvg.setAttribute('height', '32');
        logoutSvg.setAttribute('viewBox', '0 0 32 32');
        logoutSvg.setAttribute('fill', 'none');
        logoutSvg.innerHTML = `
        <path d="M12 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.219C4.28095 26.7189 4 26.0406 4 25.3333V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H12" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21.3333 22.6667L27.9999 16L21.3333 9.33334" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M28 16H12" stroke="#787774" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        const logoutText = document.createElement('p');
        logoutText.textContent = 'Log Out';
        logoutGroup.appendChild(logoutSvg);
        logoutGroup.appendChild(logoutText);
        logoutLink.appendChild(logoutGroup);
        logoutItem.appendChild(logoutLink);
        sidebarFooter.appendChild(logoutItem);

        // Append menu and footer to sidebar
        sidebar.appendChild(sidebarMenu);
        sidebar.appendChild(sidebarFooter);

        return sidebar;
    },
};

export default sidebar;