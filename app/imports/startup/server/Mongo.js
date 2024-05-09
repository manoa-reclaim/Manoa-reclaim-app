import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Stuffs } from '../../api/stuff/Stuff';

Meteor.methods({
  'stuffs.remove'(stuffId) {
    check(stuffId, String);
    Stuffs.collection.remove(stuffId);
  },
});
// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default item list.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
