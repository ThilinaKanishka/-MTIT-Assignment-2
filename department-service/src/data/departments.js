const { randomUUID } = require("crypto");

// In-memory data store with sample departments
const departments = [
  {
    id: randomUUID(),
    department_name: "Information Technology",
    head_of_department: "Dr. James Wilson",
  },
  {
    id: randomUUID(),
    department_name: "Business Administration",
    head_of_department: "Prof. Sarah Johnson",
  },
];

// List of fields that can be updated
const allowedFields = ["department_name", "head_of_department"];

/**
 * Retrieve all departments
 * @returns {Array} Array of all departments
 */
function getAll() {
  return departments;
}

/**
 * Find a department by ID
 * @param {string} id - Department ID
 * @returns {Object|undefined} Department object or undefined if not found
 */
function findById(id) {
  return departments.find((dept) => dept.id === id);
}

/**
 * Create a new department
 * @param {Object} payload - Department data (department_name, head_of_department)
 * @returns {Object} Newly created department
 */
function create(payload) {
  const department = {
    id: randomUUID(),
    department_name: payload.department_name,
    head_of_department: payload.head_of_department,
  };
  departments.push(department);
  return department;
}

/**
 * Update an existing department
 * @param {string} id - Department ID
 * @param {Object} payload - Data to update
 * @returns {Object|null} Updated department or null if not found
 */
function update(id, payload) {
  const department = findById(id);
  if (!department) {
    return null;
  }

  // Update only allowed fields
  Object.keys(payload).forEach((key) => {
    if (allowedFields.includes(key) && payload[key] !== undefined) {
      department[key] = payload[key];
    }
  });

  return department;
}

/**
 * Remove a department by ID
 * @param {string} id - Department ID
 * @returns {boolean} True if deleted, false if not found
 */
function remove(id) {
  const index = departments.findIndex((dept) => dept.id === id);
  if (index === -1) {
    return false;
  }
  departments.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
