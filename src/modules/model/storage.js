const storage = {
  save(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  },
  load() {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];
  },
};

export default storage;
