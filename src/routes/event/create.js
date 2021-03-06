import express from 'express';
import Event from '../../models/event';
import User from '../../models/user';
import { isCreator } from '../common/authCheck';

const router = express.Router();

router.get('/', isCreator, (req, res) => {
  res.locals.options.page = 'create';
  res.render('create', res.locals.options);
});

router.post('/', isCreator, (req, res) => {
  console.log(req.body)
  let { eventName, summary, eventTag, address, startDate, endDate, fullDesc, capacity, lng, lat, promoCode, discount, price } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  Event.create({
    eventName,
    summary,
    address,
    startDate,
    endDate,
    fullDesc,
    capacity,
    eventTag,
    promoCode,
    discount,
    price,
  }).then(event => {
    User.findOneAndUpdate(
      { username: res.locals.options.username },
      {
        $push: {
          history: {
            action: `Created event <a href="/event/id/${event.eventId}">${event.eventName}</a>`,
            time: Date.now()
          }
        }
      }
    ).then(() => res.status(201).json({ id: event.eventId }));
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error when creating event' });
  });
});

export default router;