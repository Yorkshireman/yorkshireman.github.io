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
`gem install rack`  
Create a config.ru file - Rack knows to look for this.  
We will create a tiny Rack Application that returns an array that contains a body consisting of a String: "Hello, World!". We will fire up a local server using the command `rackup`. When visiting the relevant port in our browser we will see "Hello, World!" rendered in the viewport.  
  
{% highlight ruby %}
#./message_app.rb
class MessageApp
  def call(env)
    [200, {}, ['Hello, World!']
  end
end
{% endhighlight %}

{% highlight ruby %}
#./config.ru
require_relative './message_app'

run MessageApp.new
{% endhighlight %}
