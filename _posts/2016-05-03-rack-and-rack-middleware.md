---
layout: default
title: 'Rack and Rack Middleware'
author: Andrew Stelmach
date: 2016-05-03
categories: ruby, rack
---

What is Rack?
------
Rack provides a minimal interface between between webservers supporting Ruby and Ruby frameworks. Using Rack you can write a Rack Application.

Rack will pass the Environment hash (a Hash consisting of CGI-like headers) to your Rack Application which can use things contained in this hash to do whatever it wants.

What is a Rack Application?
------
A Rack Application is an object (not a class) that responds to `#call`.
`#call` takes exactly one argument, the 'environment' (typically defined `env`).
`#call` returns an Array of exactly three values: the 'status', the 'headers', and the 'body'.

You can write a Rack Application to return an array of these three values which will be sent back to your client, by Rack, inside a response.

A Very Simple Rack Application:
------
- `gem install rack`
- Create a config.ru file - Rack knows to look for this.

We will create a tiny Rack Application that returns an array that contains a body consisting of a String: "Hello, World!".
We will fire up a local server using the command `rackup`.
When visiting the relevant port in our browser we will see "Hello, World!" rendered in the viewport.

{% highlight ruby %}
#./message_app.rb
class MessageApp
  def call(env)
    [200, {}, ['Hello, World!']]
  end
end
{% endhighlight %}

{% highlight ruby %}
#./config.ru
require_relative './message_app'

run MessageApp.new
{% endhighlight %}

Fire up a local server with `rackup` and visit [localhost:9292](http://localhost:9292) and you should see 'Hello, World!' rendered.

Making a Rack Application interact with the Incoming Environment hash
---
In our little Rack app, we can interact with the `env` hash (see [here](http://rack.rubyforge.org/doc/SPEC.html) for more about the Environment hash).

We will implement the ability for the user to input their own query string into the URL, hence, that string will be present in the HTTP request, encapsulated as a value in one of the key/value pairs of the Environment hash.

Our Rack app will access that query string from the Environment hash and send that back to the viewport via the Body in the Response.

From the Rack docs on the Environment Hash:
**"QUERY_STRING: The portion of the request URL that follows the ?, if any. May be empty, but is always required!"**

{% highlight ruby %}
#./message_app.rb
class MessageApp
  def call(env)
    message = env['QUERY_STRING']
    [200, {}, [message]]
  end
end
{% endhighlight %}

Rack Middleware
---
We will:

- insert a piece of Rack Middleware into our codebase - a class: `MessageSetter`,
- the Environment hash will hit this class first and will be passed in as a parameter: `env`,
- `MessageSetter` will insert a `'MESSAGE'` key into the env hash, its value being `'Hello, World!'` if `env['QUERY_STRING']` is empty; `env['QUERY_STRING']` if not,
- finally, it will return `@app.call(env)` - `@app` being the next app in the 'Stack': `MessageApp`.

First, the 'long-hand' version:
{% highlight ruby %}
#config.ru
require_relative './message_app'
require_relative './middleware/message_setter'

app = Rack::Builder.new do
  use MessageSetter
  run MessageApp.new
end

run app
{% endhighlight %}

{% highlight ruby %}
#./middleware/message_setter.rb
class MessageSetter
  def initialize(app)
    @app = app
  end

  def call(env)
    if query_string_empty?(env)
      env['MESSAGE'] = 'Hello, World!'
    else
      env['MESSAGE'] = env['QUERY_STRING']
    end
    @app.call(env)
  end

  private

  def query_string_empty?(env)
    env['QUERY_STRING'] == ""
  end
end
{% endhighlight %}

From the [Rack::Builder docs](http://www.rubydoc.info/github/rack/rack/Rack/Builder) we see that `Rack::Builder` implements a small DSL to iteratively construct Rack applications. This basically means that you can build a 'Stack' consisting of one or more Middlewares and (for the purposes of this discussion) an Application to dispatch to. All requests will through to your application will be first processed by your Middleware(s).

`#use` specifies middleware to use in a stack. It takes the middleware as an argument.

Rack Middleware must:

- have a constructor that takes the next application in the stack as a parameter,
- respond to the `call` method that takes the Environment hash as a parameter.

So here, because of what `Rack::Builder` does under the hood, `@app` is `MessageApp`. Each piece of Middleware essentially 'passes down' the existing Environment hash to the next application in the chain.

`#run` takes an argument that is an object that responds to `#call` and returns a Rack response (an instance of `Rack::Response`).

Using `Rack::Builder` you can construct chains of Middleware and any request to your application will be processed by each Middleware in turn before finally being processed by the final piece in the stack (in our case, `MessageApp`). This is extremely useful because it separates-out different stages of processing requests. In terms of 'separation of concerns', it couldn't be much cleaner!

You can construct a 'request pipeline' consisting of several Middlewares that deal with things such as:

- Authentication
- Authorisation
- Caching
- Decoration
- Performance & Usage Monitoring
- Execution (actually handle the request and provide a response)

(above bullet points from [here](http://stackoverflow.com/questions/2256569/what-is-rack-middleware))

As a final note, our `config.ru` can be written in a short-hand style, producing exactly the same functionality (and this is what you'll typically see):
{% highlight ruby %}
require_relative './message_app'
require_relative './middleware/message_setter'

use MessageSetter
run MessageApp.new
{% endhighlight %}

And to show more explicitly what `MessageApp` is doing, here is its 'long-hand' version that explicitly shows that `#call` is creating a new instance of `Rack::Response`, with the required three arguments.
{% highlight ruby %}
class MessageApp
  def call(env)
    Rack::Response.new([env['MESSAGE']], 200, {})
  end
end
{% endhighlight %}

### Useful links:

- [Complete code for this post (Github repo commit)](https://github.com/Yorkshireman/rack_middleware_practice/tree/9310bce29006e7d846fcb6257bca66d183cce5f0)
- [Good Blog Post, "Introduction to Rack Middleware"](https://www.amberbit.com/blog/2011/07/13/introduction-to-rack-middleware/)
- [An excellent Stack Overflow response to, "What is Rack Middleware?"](http://stackoverflow.com/questions/2256569/what-is-rack-middleware)
- [Some good Rack documentation](http://rack.rubyforge.org/doc/SPEC.html)
