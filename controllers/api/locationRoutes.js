const router = require('express').Router();
const { Location } = require('../../models');
const withAuth = require('../../utils/auth');

// routes for '/locations'

// get locations based on the user selecting a name
router.get('/:name', withAuth, async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})


router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;