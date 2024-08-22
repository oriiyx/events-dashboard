# Ekipa7 dashboard

Huh... Writing an application in a new framework within a 7 days window?
I guess we'll have to accept the challenge.
The business logic is mostly CRUD with authentication so at least there isn't any research besides the framework that I have to do.
Due to limited free time - I'll implement React on the frontend since I have very limited knowledge of Vue 2 compared to React.

What surprised me was that there were unit test requirements - I'll see what make sense to test.
I'm not a big fan of doing things just for the sake of doing them - but I'll try to understand and see if there is something that I can implement! The key is to leeeaaaaarn something new!
Even if this 'project' fails - I'll learn something out of it - hopefully :)

## Nestjs learning arc

During Nestjs documentation reading session I noticed that Nestjs really handles things similarly to how php, ruby, go,... standard route serving with a http webserver.
Pretty cool - but of course... its javascript... we need to abstract everything - decorator patters everywhere, some magic that shares almost everything across incoming request. I hate magic.
I like the dependency injection pattern used for services - I like this way of developing applications - I can divide everything into services and separate the logic.

I like that you can declare and initialize services shorthand `constructor(private service: SomeService){}`

Pipes look interesting - I'll probably use them with zod to validate the data and throw error before the data comes to the service

Guards will probably be used for authentication - interesting - I thought I'll use middleware for that and throw if request is not authenticated

> Guards are executed after all middleware, but before any interceptor or pipe.

Interceptors similar to event listener design implementation?

## Lets start this

Ok so after reading the test pdf again - if I clip out everything I can read that I'm supposed to save information about events.

Not to save events - but to create some sort of config for the events that some app is logging... so scalability is really... not there in my mind for now.

The other entity are users.

Since the role/permission system is substituted with a user geolocation condition - I guess we can simplify the user entity.

**Lol at 2. point xD You really shouldn't write such a requirement... I could slap nextjs for the frontend with a minimal nestjs backend with clerk for authentication... you would see absolutely 0 skills that programmer can offer - you would see if he can use libraries... It raises my eyebrows quite a lot, since javascript land is filled with these libraries, and you can end up with next to 0 application logic - what are you testing then? If you can integrate 2-3 libraries? Chatgpt can do that for you... you're finding next to nothing from the developer your testing!**

