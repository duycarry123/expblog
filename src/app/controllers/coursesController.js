const Course = require('../model/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { renderSync } = require('sass');
class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                course = mongooseToObject(course);
                res.render('course/show', { course });
            })
            .catch(next);
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('course/create');
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        formData.slug = req.body.name;
        Course.create(formData)
            .then((course) => {
                res.redirect('/');
            })
            .catch(next);
    }

    // [GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('course/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/me/stored/course');
            })
            .catch(next);
    }
}

module.exports = new CourseController();
