from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop existing collections
        db.users.drop()
        db.teams.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create users
        users = [
            User(_id=ObjectId(), username='user1', email='user1@example.com', password='password1'),
            User(_id=ObjectId(), username='user2', email='user2@example.com', password='password2'),
            User(_id=ObjectId(), username='user3', email='user3@example.com', password='password3'),
        ]
        User.objects.bulk_create(users)

        # Create teams
        team1 = Team(_id=ObjectId(), name='Team Alpha')
        team2 = Team(_id=ObjectId(), name='Team Beta')
        team1.save()
        team2.save()
        team1.members.add(users[0], users[1])
        team2.members.add(users[2])

        # Create activities
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Running', duration=timedelta(hours=1)),
            Activity(_id=ObjectId(), user=users[1], activity_type='Cycling', duration=timedelta(hours=2)),
            Activity(_id=ObjectId(), user=users[2], activity_type='Swimming', duration=timedelta(hours=1, minutes=30)),
        ]
        Activity.objects.bulk_create(activities)

        # Create leaderboard entries
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[0], score=100),
            Leaderboard(_id=ObjectId(), user=users[1], score=90),
            Leaderboard(_id=ObjectId(), user=users[2], score=95),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)

        # Create workouts
        workouts = [
            Workout(_id=ObjectId(), name='Morning Run', description='A refreshing morning run'),
            Workout(_id=ObjectId(), name='Evening Yoga', description='Relaxing yoga session'),
            Workout(_id=ObjectId(), name='Strength Training', description='Building muscle strength'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))