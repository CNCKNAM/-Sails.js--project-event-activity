/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // action - create
  create: async function (req, res) {
    if (req.method == "GET") return res.view("event/create");

    var event = await Event.create(req.body).fetch();

    return res.redirect("/");
  },
  // action - home
  home: async function (req, res) {
    var everyevents = await Event.find({ highlightevent: "true" })
      .sort("createdAt DESC")
      .limit(4);
    return res.view("event/home", { events: everyevents });
  },
  // action - admin
  admin: async function (req, res) {
    var everyevents = await Event.find();

    return res.view("admin/home", { events: everyevents });
  },
  // action - read
  read: async function (req, res) {
    var thatEvent = await Event.findOne(req.params.id);

    if (!thatEvent) return res.notFound();

    return res.view("event/read", { event: thatEvent });
  },
  // action - update
  update: async function (req, res) {
    if (req.method == "GET") {
      var thatEvent = await Event.findOne(req.params.id);

      if (!thatEvent) return res.notFound();

      return res.view("event/update", { event: thatEvent });
    } else {
      var updatedEvent = await Event.updateOne(req.params.id).set(req.body);

      if (!updatedEvent) return res.notFound();

      return res.redirect("/");
    }
  },
  // action - delete
  delete: async function (req, res) {
    var deletedEvent = await Event.destroyOne(req.params.id);

    if (!deletedEvent) return res.notFound();

    return res.redirect("/");
  },
  // // search function
  // search: async function (req, res) {
  //   var whereClause = {};
  //   var whereClause2 = {};
  //   var perPage = Math.max(req.query.perPage, 2) || 2;

  //   if (req.query.eventname) {
  //     whereClause.eventname = { contains: req.query.eventname };
  //     whereClause2.eventname = { contains: req.query.eventname };
  //   }
  //   if (req.query.organizer) whereClause.organizer = req.query.organizer;
  //   if (req.query.starttime) whereClause.starttime = req.query.starttime;
  //   if (req.query.endtime) whereClause.endtime = req.query.endtime;
  //   if (req.query.venue) whereClause.venue = req.query.venue;

  //   var thoseEvents = await Event.find({
  //     where: whereClause,
  //     sort: "eventname",
  //     limit: perPage,
  //     skip: perPage * (Math.max(req.query.current - 1, 0) || 0),
  //   });
  //   var count = await Event.count();
  //   var length = thoseEvents.length;
  //   if ((length = "undefined")) {
  //     thoseEvents = await Event.find({
  //       where: whereClause2,
  //       sort: "eventname",
  //       limit: perPage,
  //       skip: perPage * (Math.max(req.query.current - 1, 0) || 0),
  //     });
  //   } else {
  //     console.log("have searched");
  //   }
  //   return res.view("event/search", { events: thoseEvents, total: count });
  // },

  populate: async function (req, res) {
    var event = await Event.findOne(req.params.id).populate("participants");
    if (!event) return res.notFound();
    var participants = event.participants;

    return res.view("admin/regstudpage", { participants: participants });
  },
  detail: async function (req, res) {
    var thatEvent = await Event.findOne(req.params.eventid);
    if (!thatEvent) return res.notFound();

    var event = await Event.findOne(req.params.eventid).populate(
      "participants"
    );
    if (!event) return res.notFound();
    var userid = parseInt(req.session.userid);
    var participants = await event.participants.find(({ id }) => id === userid);

    if (!participants) {
      checkifreg = "false";
    } else {
      checkifreg = "true";
    }

    return res.view("student/detail", {
      event: thatEvent,
      checkifreg: checkifreg,
    });
  },
  // action - baginate
  baginate: async function (req, res) {
    if (req.wantsJSON) {
      var whereClause = {};
      var whereClause2 = {};
      var perPage = Math.max(req.query.perPage, 2) || 2;

      if (req.query.eventname) {
        whereClause.eventname = { contains: req.query.eventname };
        whereClause2.eventname = { contains: req.query.eventname };
      }
      if (req.query.organizer) whereClause.organizer = req.query.organizer;
      if (req.query.starttime) whereClause.starttime = req.query.starttime;
      if (req.query.endtime) whereClause.endtime = req.query.endtime;
      if (req.query.venue) whereClause.venue = req.query.venue;

      var thoseEvents = await Event.find({
        where: whereClause,
        sort: "eventname",
        limit: perPage,
        skip: perPage * (Math.max(req.query.current - 1, 0) || 0),
      });
      var count = await Event.count();
      var length = thoseEvents.length;
      if ((length = "undefined")) {
        thoseEvents = await Event.find({
          where: whereClause2,
          sort: "eventname",
          limit: perPage,
          skip: perPage * (Math.max(req.query.current - 1, 0) || 0),
        });
      } else {
        console.log("have searched");
      }

      return res.json(thoseEvents);
    } else {
      var count = await Event.count();
      return res.view("event/baginate", { total: count });
    }
  },
};
