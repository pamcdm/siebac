# Siebac - Should I Ever Buy A Car

[![Build Status](https://snap-ci.com/bymarkone/siebac/branch/master/build_image)](https://snap-ci.com/bymarkone/siebac/branch/master)

Siebac is a demo application that I've used before to experiment and demo concepts and best practices on Javascript technologies, microservices, web frameworks, languages, language paradigms and devops.

The domain is quite simple: let's imagine you are thinking is buying a car. How should you know that the cost/benefit of your investment will pay itself against alternative scenarios - right now a combination of using public transportation, taxi's and rent car eventually. **The application allows you to play with several variables for both scenarios trying to find the situation which fit's the most to your reality. Then it calculates the real cost and benefit of both alternatives allowing you to have more information to take a decision.**

We will be slowly moving some code we have spread in several places to this project. The priority right now, and you know how priorities can change, is doing this migration and improve the code in the following order:

1. Siebac javascript application (React.JS, Flux, Director), build pipeline (Gulp.js, Bower) and unit testing toolset (Karma, Mocha, Chai, Sinon, Q).

2. Migrate financial services to a web application with Scala (using probably Scalatra as web frameworks - but perhaps something more feasible with akka and the actor model).

3. Build a basic dev, qa, stage and prod infrastructure using Vagrant, Puppet and Terraform.

4. Build samples 


