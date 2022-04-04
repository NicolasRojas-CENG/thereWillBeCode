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

        const events = eventData.map(event => event.get({ plain: true }));

        var basketballArray = []
        var baseballArray = []
        var hockeyArray = []
        var tennisArray = []
        var soccerArray = []
        
        for (let i = 0; i < events.length; i++) {

          // EXAMPLE Basketball Array
          
          if (events[i].id === 104){

            basketballArray.push(events[i]);

          }

          // EXAMPLE Hockey Array

          if (events[i].id === 100){

            hockeyArray.push(events[i]);
            // console.log(hockeyArray);

          }

          // EXAMPLE Baseball Array

          if (events[i].id === 103){

            baseballArray.push(events[i]);
            // console.log(baseballArray);

          }

          // EXAMPLE Tennis Array

          if (events[i].id === 102){

            tennisArray.push(events[i]);
            // console.log(tennisArray);

          }

          // EXAMPLE Soccer Array

          if (events[i].id === 106){

            soccerArray.push(events[i]);
            // console.log(soccerArray);

          }
          
        }
  
          res.render('events-page', {
            basketballArray,
            baseballArray,
            hockeyArray,
            tennisArray,
            soccerArray,
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