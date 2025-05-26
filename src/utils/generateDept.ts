const departments = ['HR', 'Engineering', 'Marketing', 'Finance', 'Support'];

export function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}
