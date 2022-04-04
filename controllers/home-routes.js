const router = require('express').Router();
const sequelize = require('../config/connection');
const db = require('../config/vanilla');
const { User, EventCreated } = require('../models');

router.get('/', (req, res) => {
  User.findAll({ })
  .then(eventData => {
    const users = eventData.map(user => user.get({ plain: true }));

        res.render('home-page', {
          users,
          // loggedIn: req.session.loggedIn,
          // session: req.session

        });
  })
.catch(err => {

    console.log(err);

    res.status(500).json(err);

});

});

router.get('/events', (req, res) => {
    EventCreated.findAll({
      where: {
        // user_id: req.session.user_id
      },
        attributes: [
            'id',
            'event_name',
            'members_needed',
            'description',
            'user_id',
            'location_id',
            'sport_id',
        ],
    //     include: [
    //     {
    //         model: Comment,
    //         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    //         include: {
    //             model: User,
    //             attributes: ['username', 'id']
    //         }
    //     },
    //     {
    //         model: User,
    //         attributes: ['username']
    //     }
    //   ]
    })
    
    .then(eventData => {

        const tests = eventData.map(test => test.get({ plain: true }));

        var basketballArray = []
        
        for (let i = 0; i < tests.length; i++) {
          
          if (tests[i].id === 104){

            basketballArray.push(tests[i]);
            console.log(basketballArray);

          }
          
        }

        const events = eventData.map(event => event.get({ plain: true }));
  
          res.render('events-page', {
            events,
            basketballArray,
            // loggedIn: req.session.loggedIn,
            // session: req.session
  
        });
    })
    .catch(err => {

        console.log(err);

        res.status(500).json(err);

    });

});

router.get('/event', (req, res) => {
  EventCreated.findOne({
    where: {
      id: 1, //testing... would be : req.params.id for /event:id
    },
      attributes: [
          'id',
          'event_name',
          'members_needed',
          'description',
          'user_id',
          'location_id',
          'sport_id',
      ],
  //     include: [
  //     {
  //         model: Comment,
  //         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
  //         include: {
  //             model: User,
  //             attributes: ['username', 'id']
  //         }
  //     },
  //     {
  //         model: User,
  //         attributes: ['username']
  //     }
  //   ]
  })
  
  .then(eventData => {
      // const events = eventData.map(event => event.get({ plain: true }));

        res.render('event-page', {
          eventData,
          // loggedIn: req.session.loggedIn,
          // session: req.session

      });
  })
  .catch(err => {

      console.log(err);

      res.status(500).json(err);

  });

});

module.exports = router;