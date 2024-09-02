# Ekipa7 dashboard

## Run the project

You need the following software installed on your local machine: **Docker**
After that you need to copy /backend/.env.sample to /backend/.env
Then you can run the following command in the root directory of the project:

```bash
docker-compose up -d --build
```

This will create backend that is available on localhost port 4000 and frontend that is available on localhost port 80.

Visit http://localhost to see the frontend.

If it doesn't work... god-damn... I used node version 20.13.1 to develop it locally - you could try to `npm install`
and `npm run dev` in the frontend directory and `npm install` and `npm run start:dev` in the backend directory.

May god have mercy on your soul.

## Development Journey

Huh... Writing an application in a new framework within a 7 days window?
I guess we'll have to accept the challenge.
The business logic is mostly CRUD with authentication so at least there isn't any research besides the framework that I
have to do.
Due to limited free time - I'll implement React on the frontend since I have very limited knowledge of Vue 2 compared to
React.

What surprised me was that there were unit test requirements - I'll see what make sense to test.
I'm not a big fan of doing things just for the sake of doing them - but I'll try to understand and see if there is
something that I can implement! The key is to leeeaaaaarn something new!
Even if this 'project' fails - I'll learn something out of it - hopefully :)

## Nestjs learning arc

During Nestjs documentation reading session I noticed that Nestjs really handles things similarly to how php, ruby,
go,... standard route serving with a http webserver.
Pretty cool - but of course... its javascript... we need to abstract everything - decorator patters everywhere, some
magic that shares almost everything across incoming request. I hate magic.
I like the dependency injection pattern used for services - I like this way of developing applications - I can divide
everything into services and separate the logic.

I like that you can declare and initialize services shorthand `constructor(private service: SomeService){}`

Pipes look interesting - I'll probably use them with zod to validate the data and throw error before the data comes to
the service

Guards will probably be used for authentication - interesting - I thought I'll use middleware for that and throw if
request is not authenticated

> Guards are executed after all middleware, but before any interceptor or pipe.

Interceptors similar to event listener design implementation?

## Lets start this

Ok so after reading the test pdf again - if I clip out everything I can read that I'm supposed to save information about
events.

Not to save events - but to create some sort of config for the events that some app is logging... so scalability is
really... not there in my mind for now.

The other entity are users.

Since the role/permission system is substituted with a user geolocation condition - I guess we can simplify the user
entity.

**Lol at 2. point xD You really shouldn't write such a requirement... I could slap nextjs for the frontend with a
minimal nestjs backend with clerk for authentication... you would see absolutely 0 skills that programmer can offer -
you would see if he can use libraries... It raises my eyebrows quite a lot, since javascript land is filled with these
libraries, and you can end up with next to 0 application logic - what are you testing then? If you can integrate 2-3
libraries? Chatgpt can do that for you... you're finding next to nothing from the developer your testing!**

## Entity planning

Ok usually I work with postgres - I could slap everything into a docker and just run it (mby I will - dunno)
But for this use case... I'll just go with sqlite - I love sqlite for use cases like this - you just have a .db file -
its so damn simpleeeee - sqlite is awesome if you're down for some ci/cd stuff as well - you literally just copy the .db
file and poof you can test live data - mmmm perfection.

![feel-good.png](assets/feel-good.png)

Due to having previous experience with Prisma. I'll just use Prisma - its pretty ez setup and it abstracts the database
layer which I don't like... but...

Ok we have 2 entities.
Users and Events.

Since I am using sqlite I have some restrictions with database functionality. So we have limitation on event types and
priorities.

Priorities can be between 0-10.
Types can be crosspromo, liveops, app and ads.

Other fields are all required - I like to have my database handle field validation on top of application layer.

```sqlite
createdAt   DateTime  @default(now())
updatedAt   DateTime  @updatedAt
```

for additional tracking of the data.
Additionally, I added published information - so that when user creates the new event - it is not published by default.

### this is the point where I gave up the first time

After coming back to the project after talking to Primož, I added authentication - following the nestjs documentation
mostly - not funny buisness - I wanted to have JWT token generated.
When I created a new user I wanted to have password hashed - I used bcrypt for that.

... Well since I had a lot of personal hardships I wasnt really in the mood of writing additional data when writing the
application...
I did try...
I was given a direction to focus on the frontend - but... what is the thing you have to focus on with frontend?
I would say the design, UX, SEO (if its needed), performance, accessibility, responsiveness, user flow etc

Since this is a dashboard - you loose SEO, responsiveness focus since it's not so important - people using it usually
work on desktops - so I focused on design, UX, performance, accessibility and user flow.

I wanted a simple, minimal design - since I am a shit designer I went with what I like - if you played Alien Isolation
game I think you'll find some relations with that game and the dashboard. UX and flow are pretty standard CRUD app.

Since I didn't have a lot of time I missed something's that I would implement if I had more time... Pagination, sorting,
filtering, refreshing JWT token, logging structure... so much to do with so little time :)

Frontend I used React + vite + typescript + shadcn for components + react-router-dom + nginx to add ability to navigate
directly inside SPA app with zod to do some runtime checks.

Prettier and eslint - eslint shows some warning and errors... but It's nothing major I think - some things are from
codegen stuff - one err is my own... god I hate js sometimes :P ability to shoot yourself in the foot is endless - you
really need to be experienced and skilled to be able to write normal code... but hey... it is what it is :)

I didn't have any bigger issues - I didn't over abstract - I like following
the https://andrewbrookins.com/technology/the-rule-of-three/ (good read, would recommend).

I tried to catch as many errors but... javascript is really a bad language when it comes to error handling...the
language doesn't tell you anything most of the time... modern software eh?

Backend I wrote test mostly to just generate data for myself - but when I ran it - I tested most of my code - but not
everything.

I think it shows some signs of what type of developer I am when it comes to JS land - I really like to keep it simple as
possible - I think NestJS is a step in that direction, but it includes a million things... Almost impossible to know
everything in a few days of learning, but I think I did an okay job... could be better of course :)


