import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const SeriesList = new Mongo.Collection('seriesList');

Meteor.methods({
  'seriesList.insertSeries'(author,seriesTitle) {
    check(author, String);
    check(seriesTitle, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    SeriesList.insert({
      author,
      seriesTitle,
      volumes: [],
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },
  'seriesList.insertVolume'(seriesID, title, year) {
    check(title, String);
    check(year, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    SeriesList.update(
      {_id: seriesID},
      {$addToSet: 
        {volumes: 
          {
            _id: new Meteor.Collection.ObjectID(),
            title,
            year,
            haveRead: false
          }
        }
      }
    );
  }
});
