const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../models')
const NotFoundError = require('../errors/notFoundError')

// @desc    Fetch all course
// @route   GET /api/courses
// @access  Public
const getCourses = (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 0
  const order = req.query.order || 'ASC'

  db.Courses.findAll({
    offset: page,
    limit: pageSize,
    order: [['title', order]],
    include: [db.Lesson]
  })
    .then((courses) => {
      // queryUtils.paginate({ page, pageSize })
      res.json({ courses, page, pageSize }).status(200)
    })
    .catch((err) => res.json({ err }).status(400))
}

// @desc    Add individual course
// @route   POST /api/courses/add
// @access  Public
const addCourse = async (req, res) => {
  let thumbnail = ''
  if (req.file) {
    thumbnail = req.file.filename
  }
  const course = await db.Courses.create({ ...req.body, thumbnail })
  res.status(201).json({
    status: true,
    message: ' new course added successfully',
    data: course
  })
}

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Public
const updateCourse = (req, res) => {
  const {
    title,
    description,
    languageOfInstruction,
    memberLimit,
    method,
    gradeLevel,
    subjectLevel,
    creator,
    steps
  } = req.body
  const id = req.params.id
  db.Courses.findByPk(id).then((product) => {
    if (product) {
      const { id } = product
      db.Courses.update(
        {
          _attachments: 'uploads/' + req.file.filename,
          title,
          description,
          languageOfInstruction,
          memberLimit,
          method,
          gradeLevel,
          subjectLevel,
          creator,
          steps
        },
        { where: { id }, include: [db.Lesson] }
      )
        .then(() => res.json({ message: 'Course Updated !!!' }).status(200))
        .catch((err) => res.json({ error: err.message }).status(400))
    }
    res.status(404)
    throw new Error('Course not found')
  })
}

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  const { id } = req.params
  const course = await db.Courses.findOne({
    where: { id },
    include: [db.Lesson]
  })
  if (!course) {
    throw new NotFoundError()
  }
  res.status(200).json({
    status: true,
    message: 'fetched course successfully',
    data: course
  })
}

// @desc    Delete a course
// @route   delete /api/courses/:id
// @access  Public
const deleteCourse = (req, res) => {
  const id = req.params.id
  db.Courses.findOne({
    where: {
      id: id
    }
  }).then((resource) => {
    if (resource) {
      const { id } = resource
      db.Courses.destroy({ where: { id } })
        .then(() =>
          res.json({ message: 'Course Deleted Successfully' }).status(200)
        )
        .catch((err) => res.json({ error: err.message }).status(400))
    } else {
      res.status(404)
      throw new Error('Course not found')
    }
  })
}

// @desc    Search title
// @route   POST /api/courses/search
// @access  Private
const searchCoursesTitle = (req, res) => {
  const { title } = req.query
  const order = req.query.order || 'ASC'

  db.Courses.findAll({
    where: { title: { [Op.iLike]: '%' + title + '%' } },
    order: [['title', order]]
  })
    .then((title) => res.json({ title }).status(200))
    .catch((err) => res.json({ error: err }).status(400))
}

module.exports = {
  addCourse,
  getCourses,
  updateCourse,
  getCourseById,
  deleteCourse,
  searchCoursesTitle
}
