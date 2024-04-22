import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ContactsCollection. It encapsulates state and variable values for stuff.
 */
class LostItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'LostItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      itemName: String,
      date: Number,
      email: String,
      location: {
        type: String,
        allowedValues: ['POST', 'Lower Campus', 'Hamilton Library', 'Shidler', 'Campus Center', 'other'],
        defaultValue: 'other',
      },
      image: String,
      description: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ContactsCollection.
 * @type {LostItemsCollection}
 */
export const LostItems = new LostItemsCollection();
