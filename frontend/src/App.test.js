import { Task, TaskStatus } from './models/tasks'; 


// Tests for the Task Model/Validation Logic (from tasks.js)
describe('Task Model Validation', () => {

  const mockValidData = {
    title: 'Unit tests',
    description: 'for both backend and frontnend',
    status: TaskStatus.IN_PROGRESS,
    dueDatetime: '2025-12-08T23:59',
  };

  test('should successfully create a task with valid data', () => {
    const task = new Task(
      mockValidData.title,
      mockValidData.description,
      mockValidData.status,
      mockValidData.dueDatetime
    );
    expect(task.title).toBe(mockValidData.title);
    expect(task.status).toBe(TaskStatus.IN_PROGRESS);
  });

  test('should throw an error if Title is missing or less than 2 charactors', () => {
    expect(() => {
      new Task('', 'desc', TaskStatus.DONE, mockValidData.dueDatetime);
    }).toThrow('Invalid Title');

    expect(() => {
        new Task(null, 'desc', TaskStatus.DONE, mockValidData.dueDatetime);
    }).toThrow('Invalid Title');

    expect(() => {
      new Task('a', 'desc', TaskStatus.DONE, mockValidData.dueDatetime);
    }).toThrow('Invalid Title');

    expect(() => {
      new Task('a ', 'desc', TaskStatus.DONE, mockValidData.dueDatetime);
    }).not.toThrow();
  });

  test("shouldn't throw error when Description is missing", () => {
    const task = new Task(mockValidData.title, null, undefined, mockValidData.dueDatetime);
    expect(task.description).toBe(null);
  });

  test('should use TODO as the default status', () => {
    const task = new Task(mockValidData.title, 'desc', undefined, mockValidData.dueDatetime);
    expect(task.status).toBe(TaskStatus.TODO);
    expect(() => {
      new Task(mockValidData.title, null, mockValidData.status, mockValidData.dueDatetime)
    }).not.toThrow();
  });

  test('should throw an error if dueDatetime is missing', () => {
    expect(() => {
      new Task(mockValidData.title, 'desc', TaskStatus.DONE, null);
    }).toThrow('Invalid Datetime');
  });

  test('should correctly format data with toJSON for backend', () => {
    const task = new Task(
      mockValidData.title,
      mockValidData.description,
      mockValidData.status,
      mockValidData.dueDatetime
    );
    expect(task.toJSON()).toEqual({
        'title': mockValidData.title,
        'description': mockValidData.description,
        'status': mockValidData.status,
        'due_datetime': mockValidData.dueDatetime // Checks the camelCase to snake_case mapping
    });
  });
});