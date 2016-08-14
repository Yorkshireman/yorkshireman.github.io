---
layout: default
title: 'Useful Notes for Makers Grads'
author: Andrew Stelmach
date: 2016-08-10
categories: tips, resources, wisdom
custom_js:
- anchorjs.js
- contents-table.js
---

I enjoy helping out Makers Grads in whatever way I can and I figured it would be useful to create a central place where I store recommendations and tips. So here it is!

At the time of writing I've been in my new job for 4 months and 3 days - enough time to feel I can start imparting some reasonable conclusions.

Contents:

{% include contents-table.html %}

Things I Recommend Makers Grads Do After Finishing Makers
---

### 1. Fill-in Basic Knowledge Gaps

When I started at Sky, holes in my knowledge were immediately exposed; I had to get my head around the massive architecture and how all the different apps, backend services, middlewares etc fit together and talk to each other.

I quickly realised that I didn't _really_ understand the simple basics of servers, http requests and responses, Rack and Rack middleware. So my Senior Dev set me to task reading up on Rack and how a stack of Rack Middlewares worked.

I wrote a blog post to consolidate my learning and I can't recommend working through this highly enough. But don't just read it - actually do it or you won't learn much. Here's the link:

- [Rack and Rack Middleware]({% post_url 2016-05-03-rack-and-rack-middleware %})

_Your_ "Gaps" might be different but, as well as working through the above blog post, I recommend you identify gaps in your knowledge of the genre, "Stuff That Isn't About Code", and work on that; this Stuff could be, for example, Object Oriented Design Principles, Domain Modelling, Testing Principles. Only you can identify your own 'Stuff'.

### 2. Read Sandi Metz's Practical Object-Oriented Design in Ruby: An Agile Primer

This book is _awesome_. I can't recommend it highly enough for post-Makers reading. It consolidates beautifully what you've already learned and builds on it. You will literally instantly level-up by reading this book. Whilst reading it you will constantly get "ah-ha" moments, inspired to immediately modify one of your Ruby codebases. It's actually quite hard to get through it because you keep stopping to write Ruby while you're reading it!

### 3. Do Tech Tests and Get Them Reviewed by Developers

Do this at the same time you're reading the above book. Do a tech test and get a Dev to review it for you, discuss the comments with them (I recommend doing this in Github Issues on the repo in question), iterate over it to improve the code based on their comments, and repeat, and repeat again, and again and again until it's basically perfect.

And then do it all again with a different tech test. And then another one, and then.. (you get the idea).

And f*** it, _pay_ someone if you have to - there are websites you can use for this.

I'll help you for free though, if you like (message me on Makers Slack - you can find my name through the Github link in the footer of this page).

### 4. Subscribe to Safari Books Online

Simply awesome. Any book you could wish for about coding, all for free (once you're subscribed, of course!) (the Sandi Metz book I mentioned above is there, btw). There are also excellent video series. For example, instead of reading Clean Code, you can watch the videos instead! Which brings me onto...

### 5. Read Clean Code, by Robert Cecil Martin

### 6. [egghead.io](https://egghead.io/courses)

This is especially good if you want to get better with Javascript frameworks. I'm working through the React tutorials at the moment and they're excellent, and free!

By the way, I'm not saying this because you need to know React to get a job (you don't!) - I'm using these tutorials because we're starting to use it at work so I have to use it, and if you want to learn a JS framework, I can recommend this resource. However, I do have a dream of one day building a [Rails API with a Javascript framework on top, deployed separately](https://github.com/Yorkshireman/wordlists_uids)! :-) So learning React is good, but it might not necessarily be the best tool - Angular 2 might be better for this, but it all depends on what features you want, at the end of the day.

### 7. Follow Makers' CV Advice

They're really good at that. I just followed their template and got a [really good CV](https://github.com/Yorkshireman/CV) together (I think :-) ).

### 8. Maintain Belief

I finished Makers and thought that I might struggle to get a job without getting better at JS and one or two JS frameworks because (apparently) Ruby is rubbish, not cool, and everyone needs to know React because "everyone's using it" and it's cool.

Nonsense. See my [Tips for Phone Interview](#tips-for-phone-interview), [Tips for Tech Tests](#tips-for-tech-tests), and [Tips for Office Visit/Pairing/Interview](#tips-for-office-visitpairinginterview) for more on this.

Tips for Tech Tests
---

I've only done two tech tests, but in my relatively limited experience, tech tests are surprisingly 'easy'. However, that doesn't mean you can't make a mess of it. Bad code is bad code and any half-decent Developer can 'smell' 'code-smells' a mile off :-)

Tech tests present you with a very simple task and it's up to you to make a mess of it or make something that's simple, elegant, and beautiful.

One employer asked me not to put their tech test specification online, so I can't show you that one, but this one I can: my [Sky Tech Test](https://github.com/Yorkshireman/bill_unattended#bill-unattended-test).

I didn't really understand what it meant by "JSON must be consumed by a server acting as a proxy", so I asked a Developer friend of mine! It just means that your app must use a server to 'fetch' that JSON i.e. your app calls that URL to get the JSON, rather than you copy/pasting the JSON directly into your code.

Here are my top tips for tech tests:

1. ***Do what Makers Taught You***

2. There is no Number 2 ;-)

Ok, bad joke, but it's true - if you follow the process you were taught at Makers, you will deliver an excellent Tech Test to your potential employer; start by sketching out your Doman, code it using _proper_ TDD, and SOLID principles. And that's it.

Tips for Phone Interview
---

My two phone interviews were both after the Tech Tests. Standard recruitment procedure seems to be Application, Tech Test, Phone Interview, Office Visit/Pairing/Interview.

Remember, if you've got this far, a Developer has already checked out your code and they liked it. I think the phone interview is mainly about everything except your code, so that means:

- your back story,
- your motivations,
- what drives you,
- what you like,
- what you don't like,
- your personality.

Therefore, treat it more like a conversation than an interview, it's always worked for me.

Obviously, there will be moments when you know you have to 'give a good answer' but, remember: _they have already approved your tech test_; they want to get a feeling for Everything Else because they don't want to invite you to their office and waste your time and their's by finding out that you have some particularly undesirable qualities or wants/needs after you arrive.

_Having said all that_, I _would_ recommend you make sure you talk about TDD and SOLID principles at some point in the phone interview. I brought these things up while I was talking about why I liked coding in one phone interview and it knocked his socks off! I didn't even go into much detail about SOLID because he just stopped me and said, "just the fact that you've mentioned 'SOLID' is quite impressive and tells me you're ahead of the game."

I was a bit bemused at the time because, to me (AS A MAKERS GRAD!), these things were normal and accepted practice. Now I've been in the industry a while, I now know that the reason he was so impressed is because a lot of Devs are kind of 'Old School' - they were self-taught and learned through lots of experimentation in the beginning, on their home computers, so they often only heard about SOLID later on in their journey; I even heard one experienced Developer refer to it as 'advanced knowledge'. Self-taught Devs and Computer-Science-Grads-plus-In-House-Training are the old breed of Junior Devs - we're the New Breed :-)

When it comes to talking about TDD, I recommend you talk about the Testing Cycle (as you were taught at Makers) and talk about writing only the minimum amount of code to make that test pass, and why that's important (test coverage).

_Having said all_ ***that***, the most important thing is that you talk about what gets you psyched.

Tips for Office Visit/Pairing/Interview
---

To be honest, if you've got this far, the job is yours for the taking.

That really is what I think!

It's yours for the taking, but it's also yours to f&$% up. But here's the thing - you can only f&$% it up by believing it's not already yours and trying to explicitly or implicitly persuade them that you're right for the role.

You've passed the application process, you've passed the Tech Test, you've passed the Phone Interview. They really do like you, they have discussed 'you' amongst themselves, there really is _very_ little to go wrong now. So chill out, relax, enjoy meeting the people there, get to know them, ask them questions about their job and their working environment, what they like about the job, what they don't like about the job (yes, asking people that question _won't_ do any harm - it's up to them how open they want to be with you - just don't be too prying about it - just ask the question once and listen to their response).

If you have to do some sort of formal pairing test, then just relax as best you can - remember, _you have already passed the Tech Test_ - they like your code, they want to see _what you're like to pair with_. So pair like you were taught at Makers, communicate like you were taught at Makers.

During your visit and after your visit, the decision-makers will ask around about what people thought about you, and then they will offer you the job ;-)

Questions I've Been Asked By Grads
---

***"How long did it take you to get a job?"***

Immediately after finishing Makers I was on a plane to the Middle East to do a 2 month contract in my old line of work. During that contract, I tried to get a proper TDD environment setup for Firebase (basically, trying to stub the database). I failed and gave up.

About two weeks before finishing the contract (and heading back to the UK) I applied for two jobs - one at Alliants in Southampton, through Makers, and my present job at Sky in Leeds. London?! Pah! I'll never leave Yorkshire!!

To cut a long story short, I got offered both two weeks after returning to the UK and I took the one at Sky in Leeds.

***"Did companies/interviewers ask you any hard questions?"***

Nope. Never. Not one. My only 'interviews' were:

- Phone Interviews which were more like casual conversations about my 'backstory' and coding,
- Pairing which was literally just pairing.

For Alliants they invited me to hang out in their office for a couple of days. There, I paired with developers who were working on real stuff. I hardly did anything, to be honest. I 'drove' a bit but it didn't really seem like they were expecting me to contribute much - I think this was because after their fairly comprehensive tech test process and possibly therefore already satisfied with my ability.

At Sky it felt more formal - they got one of their senior devs to pair with me on their standard tech test and he reported back to managers about what he made of me. But he was a very nice guy who made every effort to help me relax and _did_ **pair** with me i.e. he _helped_ me! He gave enough help so I didn't feel under too much pressure or got in a flap, and not _too_ much so he could also assess my ability. It was a comfortable and positive experience for me.

Final Thoughts
---

- When recruiting mid-level Devs, employers place more emphasis on skills than they do when they're hiring Juniors.

- A note on "Drive": employers like to recruit Junior Devs who are driven. If you did Makers, you're driven, particularly if you paid for it yourself - if you paid for it yourself, I recommend you drop that fact into the phone interview at some point and tell them how much it cost. Look, it might sound slightly arrogant and pretentious right now, but paying 8 grand out of your own pocket tangibly demonstrates how driven you are to become a Developer. I dropped it in when talking about my back story, how I arrived at the point of deciding to do Makers Academy, and that is was a big decision because it cost so much money. If you feel uncomfortable bringing this up, or you're not sure how to, tell them _why_ you are telling them these things and that should alleviate any discomfort for you and eliminate any misunderstanding or miscommunication.

- The ideal Junior is someone who is intelligent, enthusiastic, meets the skills standard for a new Junior Developer, driven, and is a likable person; I was told at Makers that one employer said:

> "You can train anyone to be a better Developer, but you can't train someone to not be a dick."

So true. Interpersonal skills are very important to contributing to the business and if there is one thing that everyone wants to avoid, it's working with someone who just pisses them off. People won't generally admit that professionally, but think about it, what would _you_ do if you were hiring?

- Be prepared to be slightly overwhelmed when you start your job, particularly if it's a large company and you're working on their own stuff. For me, Sky's architecture and the size of their codebases were overwhelming for a quite a while. It _does_ pass, but not for the reasons you might think.....

- Things get easier because you learn what to filter out. Probably the biggest and most beneficial change I have observed in myself that has improved me the most at work is that I now filter out and discard what I don't need to know right now. Early on, I realised that I don't need to understand and/or remember everything that I hear. Since then, I seem to be getting better and better at automatically discarding and forgetting what I don't need, and identifying what I do need to know and applying my time and energy to that. It's a weird and quite intangible skill, but I've discussed this with experienced Developers and they have all wholeheartedly agreed that this is a very real and important skill and one that you just get better and better at over time. It's impossible to seek to understand everything you hear all of the time - there isn't enough time and resource.
