---
layout: default
title:  "Modules vs Classes"
author: "Andrew Stelmach"
date: 2016-06-01
categories: ruby
---

There is more to this subject than what is currently in this post but, for now, this is a cool design approach that I lynched from the community-driven [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide).

For a long time I have been quite the fan of [Service Objects](http://brewhouse.io/blog/2014/04/30/gourmet-service-objects.html).

However, for a while I've been uncomfortable with how I've been using them; they were doing more than one thing and they never needed to be instantiated. Therefore, they would probably be better off as Modules. However, I didn't want to relinquish being able to use the class method - I liked being able to do `ServiceObject.call`.

This is one of my 'Service Objects' that I wasn't happy with being a Service Object:

{% highlight ruby %}
# lib/services/get_data.rb

require 'curb'
require 'json'

class GetData
  class << self
    def open_pull_requests(repo_name, repo_query="pulls?state=open")
      data = Curl.get("https://api.github.com/repos/sky-uk/" + repo_name + "/" + repo_query) do |http|
        http.headers['Authorization'] = 'token ' + ENV['GH_PULLS_ACCESS_TOKEN']
        http.headers['User-Agent'] = 'curl/7.43.0'
        http.headers['Accept'] = '*/*'
      end
      data = JSON.parse(data.body_str)
      !any_open_pull_requests?(data) ? (return nil) : data
    end

    private

    def any_open_pull_requests?(data)
      (data.class == Array) && (data.count > 0)
    end
  end
end
{% endhighlight %}

This is useful because you can do `GetData.open_pull_requests(args)` from anywhere in a file that you've required `get_data.rb` in.

However, it's arguably not appropriate being a Service Object; arguably, it does more than one 'thing'.

## `module_function` to the Rescue

{% highlight ruby %}
require 'curb'
require 'json'

module GetData
  module_function

  def open_pull_requests(repo_name, repo_query="pulls?state=open")
    data = Curl.get("https://api.github.com/repos/sky-uk/" + repo_name + "/" + repo_query) do |http|
      http.headers['Authorization'] = 'token ' + ENV['GH_PULLS_ACCESS_TOKEN']
      http.headers['User-Agent'] = 'curl/7.43.0'
      http.headers['Accept'] = '*/*'
    end
    data = JSON.parse(data.body_str)
    !any_open_pull_requests?(data) ? (return nil) : data
  end

  def any_open_pull_requests?(data)
    (data.class == Array) && (data.count > 0)
  end
end
{% endhighlight %}
  
### Benefits:  
* Class-Method-Like functionality maintained (`GetData.open_pull_requests(args)`)  
* More readable  
* No need to `include` it anywhere in order to use it.  
