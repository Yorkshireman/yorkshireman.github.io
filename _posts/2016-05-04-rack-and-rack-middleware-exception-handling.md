---
layout: default
title: 'Rack and Rack Middleware Exception Handling'
author: Andrew Stelmach
date: 2016-05-03
categories: ruby, rack
---

In [this]({% post_url 2016-05-03-rack-and-rack-middleware %}) post we saw how to construct a very simple Rack application with some Middleware.

Now, we're going to raise an exception in `MessageApp` and rescue it in the `MessageSetter` middleware which sits one level up in the application stack.

{% highlight ruby %}
#./config.ru
require_relative './message_app'
require_relative './middleware/message_setter'

use MessageSetter
run MessageApp.new
{% endhighlight %}

{% highlight ruby %}
#./message_app.rb
class MessageApp
  def call(env)
    raise
    [200, {}, [env['MESSAGE']]]
  end
end
{% endhighlight %}

{% highlight ruby %}
#./message_setter.rb
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

    begin
      @app.call(env)
    rescue
      puts "CAUGHT"
      Rack::Response.new([env['MESSAGE'], ' (caught an exception along the way!)'], 200, {})
    end
  end

  private

  def query_string_empty?(env)
    env['QUERY_STRING'] == ""
  end
end
{% endhighlight %}

When running the application now you get "CAUGHT" printed to your server readout and "Hello, World! (caught an exception along the way!)" rendered in the viewport.

sdgf