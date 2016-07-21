---
layout: default
title:  "Rails respond_to (always use)"
author: "Robert from Arkency"
date: 2016-07-21
categories: ruby
---
  
## On using respond_to even when you only support HTML responses
You might think that if a controller action is only capable of rendering HTML, there is not much reason to use `respond_to`. After all, this is what Rails scaffold probably taught you.
{% highlight ruby %}
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end
{% endhighlight %}
There is, however, one very annoying situation in which this code will lead to an exception: when a silly client asks to get your page in XML format.

Try for yourself:  
`curl -H "Accept: application/xml" localhost:3000/posts`  

You will get an exception:  
`Missing template posts/index, ... :formats=>[:xml]`  

The client will get 500 error indicating that the problem was on the server side.
{% highlight html %}
<?xml version="1.0" encoding="UTF-8"?>
<hash>
  <status>500</status>
  <error>Internal Server Error</error>
</hash>
{% endhighlight %}
This problem will be logged by an exception tracker, that you use for your Rails app. However, there is nothing we can do about the fact that someone out there thinks they can get a random page in our app via XML. We don’t need a notification every time that happens. And the bigger your website, the more often such random crap happens.

But we also don’t want to ignore those errors completely when they occur. There could be a situation in which they can help us catch a real problem i.e. a refactoring which went wrong.

How can we fix the situation? Just add `respond_to` section indicating which formats we support. You don’t even need to pass a block to html method call.
{% highlight ruby %}
class PostsController < ApplicationController
  def index
    @posts = Post.all
    respond_to do |format|
      format.html
    end
  end
end
{% endhighlight %}
Alternatively, you can go with `respond_to :html`. But that itself is not sufficient and requires using it together with `respond_with`.
{% highlight ruby %}
class PostsController < ApplicationController
  respond_to :html

  def index
    @posts = Post.all
    respond_with @posts
  end
end
{% endhighlight %}
After such change, the client will get 406 error when the format is not supported.
{% highlight html %}
<?xml version="1.0" encoding="UTF-8"?>
<hash>
  <status>406</status>
  <error>Not Acceptable</error>
</hash>
{% endhighlight %}

And missing template exception leading to 500 error code will occur only when you really have a problem with the template for supported MIME types (HTML in our example).

Robert from Arkency
