================= Workout Tracker =======================

The Idea : this is a workout tracker API it will allow you to create a user and add workouts.
each workout has exercises in it with each exercise having it sets count and reps count.

at the end you will have a progress log that will show your wight , calories and last updated.

Core Features (MVP):

- Authentication-> ✅
- Validation using joi
- Create workouts-> ✅
- Add exercises-> ✅
- Track progress-> ✅
- View workout history-> ✅
- rate limiter
- swagger to track all this

Database Design:-> ✅

user: {-> ✅
role, // (admin , user)
username,
email,
password
},
workout: {-> ✅
userId,// user created this workout
allowedUsers[],// allowed users to see this workout
title,
exercises[]{
name,
sets,
reps,
},
createdAt
},
progress_Log:{-> ✅
userId,
current_weight,
all_wights[],
updatedAt
}

API Design:-> ✅

---> ✅
POST /auth/register
POST /auth/login
---> ✅
GET /workouts
POST /workouts
GET /workouts/:id
DELETE /workouts/:id
PATCH /workouts/:id
--
POST /progres-> ✅
GET /progress/history-> ✅

Some Validation:

- password too short
- invalid email
- missing token
- negative wight

response shape:-> ✅
{
data:
}
