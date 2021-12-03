/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  if ((await Event.count()) > 0) {
    return generateAdmins();
  } else {
    await Event.createEach([
      {
        shortdescription: "shortdescription1",
        longdescription: "longdescription1",
        imageurl:
          "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
        eventdate: "2021-10-12",
        quota: "40",
        highlightevent: "true",
        eventname: "eventname1",
        organizer: "Music Society",
        starttime: "05:31",
        endtime: "05:31",
        venue: "Leadership Programme",
        regno: 2,
      },
      {
        shortdescription: "shortdescription2",
        longdescription: "longdescription2",
        imageurl:
          "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
        eventdate: "2021-10-13",
        quota: "30",
        highlightevent: "true",
        eventname: "eventname2",
        organizer: "Department of Computer Science",
        starttime: "05:34",
        endtime: "05:55",
        venue: "Career talk(IT industry)",
        regno: 1,
      },
      {
        shortdescription: "shortdescription3",
        longdescription: "longdescription3",
        imageurl:
          "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
        eventdate: "2021-9-13",
        quota: "60",
        highlightevent: "true",
        eventname: "eventname3",
        organizer: "Student Union",
        starttime: "15:34",
        endtime: "15:55",
        venue: "Computer Science Oday",
      },
      {
        shortdescription: "shortdescription4",
        longdescription: "longdescription4",
        imageurl:
          "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
        eventdate: "2021-10-16",
        quota: "10",
        highlightevent: "true",
        eventname: "eventname4",
        organizer: "Registry",
        starttime: "06:00",
        endtime: "07:00",
        venue: "CV Writing Workshop",
      },
      {
        shortdescription: "shortdescription5",
        longdescription: "longdescription5",
        imageurl:
          "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
        eventdate: "2021-10-20",
        quota: "10",
        highlightevent: "false",
        eventname: "eventname5",
        organizer: "Department of Computer Science",
        starttime: "13:00",
        endtime: "14:00",
        venue: "2021 Singing Contest",
      },
      {
        shortdescription: "shortdescription6",
        longdescription: "longdescription6",
        imageurl:
          "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
        eventdate: "2021-10-17",
        quota: "200",
        highlightevent: "false",
        eventname: "eventname6",
        organizer: "Student Union",
        starttime: "16:00",
        endtime: "18:00",
        venue: "Department of Computer Science",
      },
      // etc.
    ]);
    return generateAdmins();
  }

  async function generateAdmins() {
    if ((await User.count()) > 0) {
      return;
    } else {
      await User.createEach([
        { username: "admin", password: "123456", role: "admin" },
        { username: "admin2", password: "123456" },
        { username: "student", password: "123456" },
        { username: "student1", password: "123456" },
        { username: "student2", password: "123456" },
        { username: "student3", password: "123456" },
        { username: "student4", password: "123456" },
        // etc.
      ]);
    }
    const student1 = await User.findOne({ username: "student1" });
    const student2 = await User.findOne({ username: "student2" });
    const student3 = await User.findOne({ username: "student3" });
    const event1 = await Event.findOne({ eventname: "eventname1" });
    const event2 = await Event.findOne({ eventname: "eventname2" });
    const event3 = await Event.findOne({ eventname: "eventname3" });
    await User.addToCollection(student1.id, "regevents").members(event1.id);
    await User.addToCollection(student2.id, "regevents").members([
      event1.id,
      event2.id,
    ]);
  }
};
