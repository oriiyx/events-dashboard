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

Interceptors similar to events design implementation?

I guess not... looks like they can actually 