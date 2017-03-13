import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
 
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
            _id: Random.id(),
            title,
            year,
            haveRead: false
          }
        }
      }
    );
  },
  'seriesList.deleteVolume'(seriesID, volumeID) {
    check(seriesID, String);
    check(volumeID, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    SeriesList.update(
      {_id: seriesID},
      {$pull: 
        {volumes: 
          {
            _id: volumeID
          }
        }
      }
    );
  },
  'seriesList.updateHaveRead'(seriesID, volumeID, newHaveRead) {
    check(newHaveRead, Boolean);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    SeriesList.update(
      {_id: seriesID, "volumes._id": volumeID},
      {$set: {"volumes.$.haveRead": newHaveRead}}
    );

  }
});
