const createTask = (title, description, dueDate, status, projectId) => {
  return {
    title,
    description,
    dueDate,
    status,
    projectId,
  };
};

export default createTask;
