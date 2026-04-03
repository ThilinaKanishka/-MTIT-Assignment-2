let nextId = 3;

const enrollments = [
  {
    id: 1,
    student_id: 1001,
    course_id: 2001,
  },
  {
    id: 2,
    student_id: 1002,
    course_id: 2002,
  },
];

const allowedFields = ["student_id", "course_id"];

function getAll() {
  return enrollments;
}

function findById(id) {
  return enrollments.find((enrollment) => enrollment.id === Number(id));
}

function create(payload) {
  const enrollment = {
    id: nextId,
    student_id: Number(payload.student_id),
    course_id: Number(payload.course_id),
  };
  nextId += 1;
  enrollments.push(enrollment);
  return enrollment;
}

function update(id, payload) {
  const enrollment = findById(id);
  if (!enrollment) {
    return null;
  }

  Object.keys(payload).forEach((key) => {
    if (allowedFields.includes(key) && payload[key] !== undefined) {
      enrollment[key] = Number(payload[key]);
    }
  });

  return enrollment;
}

function remove(id) {
  const index = enrollments.findIndex(
    (enrollment) => enrollment.id === Number(id),
  );
  if (index === -1) {
    return false;
  }
  enrollments.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
