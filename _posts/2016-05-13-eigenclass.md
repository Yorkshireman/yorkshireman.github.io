---
layout: default
title: 'class << self and Eigenclass'
author: Andrew Stelmach
date: 2016-05-13
categories: ruby, eigenclass
---

Instance Methods, Singleton Methods, Class Methods, and the Eigenclass, in Ruby
------

***Instance Methods*** are methods that are available to all _instances_ of the class. For example:
{% highlight ruby %}
class Square
  def say_something
    "hello!"
  end
end

square = Square.new
=> #<Square:0x007fec3c116b30>

square.say_something
=> "hello!"

Square.say_something
#=> NoMethodError: undefined method `say_something' for Square:Class
# ...because say_something is not a Class Method - more on this later.
{% endhighlight %}

***Singleton Methods*** are methods that are available only to a specific instance of a class. For example:
{% highlight ruby %}
class Square
end

square = Square.new
=> #<Square:0x007fec3c112f30>

def square.say_something
  "hello!"
end

square.say_something
=> "hello!"
{% endhighlight %}

Class Methods
------

First of all, let's cover Class _Variables_.

***Class Variables*** eg `@@name` are available to *all* instances of that class. For example:
{% highlight ruby %}
class Square
  @@sides = 4

  def sides
    @@sides
  end
end

square = Square.new
=> #<Square:0x007fec2c116b30>

square.sides
=> 4
{% endhighlight %}

When using an _Instance Variable_, the same is not true:
{% highlight ruby %}
class Square
  @sides = 4

  def sides
    @sides
  end
end

square = Square.new
=> #<Square:0x007fed2c416b30>

square.sides
=> nil
{% endhighlight %}

***Class Methods*** are methods that are only available to the class itself.

In our Ruby apps, we often want to do something like `Square.sides` and have it return a value.  Because class variables are available to all instances of that class (and therefore all classes that inherit from it), it can cause difficult debugging and 'ghost' issues in large codebases. It is therefore generally preferred that they are not used (this is also why Rubocop doesn't allow Class Variables).

Another way to achieve the ability to be able to do `Square.sides` and have it return a value, without it referencing a Class Variable, is to use a Class Method that returns an Instance Variable.

{% highlight ruby %}
class Square
  def self.sides
    @sides
  end

  def self.four_sides
    @sides = 4
  end

  def self.where_am_I?
    "I'm in the Eigenclass!"
  end
end

#is the same as:

class Square
  class << self
    def sides
      @sides
    end

    def four_sides
      @sides = 4
    end

    def where_am_I?
      "I'm in the Eigenclass!"
    end
  end
end
{% endhighlight %}

So, in both cases:
{% highlight ruby %}
Square.sides
=> nil

Square.four_sides
=> 4

Square.sides
=> 4

Square.where_am_I?
=> "I'm in the Eigenclass!"

square = Square.new
=> #<Square:0x007fec3c116b30>

square.where_am_I?
#=> NoMethodError: undefined method 'where_am_I?' for #<Circle:0x007fb231233aa8>

#Define a Singleton method:
def square.where_am_I?
  "I'm also in the Eigenclass!"
end

square.where_am_I?
=> "I'm also in the Eigenclass!"

{% endhighlight %}

Class methods are placed in the Eigenclass which is an anonymous class that Ruby places in the hierarchy chain, so as not to affect _instances_ of that class.

You may never do the following, but it drives home the above; lets create a `Square` class containing Instance Methods _and_ Class Methods:

{% highlight ruby %}
class Square
  def sides
    @sides
  end

  def four_sides
    @sides = 4
  end

  class << self
    def sides
      @sides
    end

    def four_sides
      @sides = 4
    end
  end
end

square = Square.new
=> #<Square:0x007fec2fc116b30>

square.sides
=> nil

Square.sides
=> nil

Square.four_sides
=> 4

Square.sides
=> 4

square.sides
=> nil

square.four_sides
=> 4

square.sides
=> 4
{% endhighlight %}

`square` is an instance of `Square`, whereas `Square` is an instance of `Class`; the `Eigenclass` holds `Square`'s class methods its variable `@sides`. Well, that's the way I think about it anyway! (Need to dig into this and understand it a bit more).

If we reload this code and do it the other way round, the same sort of thing occurs:
{% highlight ruby %}
square = Square.new
=> #<Square:0x007fec3c14ab30>

square.sides
=> nil

square.four_sides
=> 4

Square.sides
=> nil

Square.four_sides
=> 4

Square.sides
=> 4
{% endhighlight %}

Much Tidier Uses of this Pattern
------

{% highlight ruby %}
class Square
  class << self
    attr_reader :sides

    def four_sides
      @sides = 4
    end
  end
end

Square.sides
=> nil

Square.four_sides
=> 4

Square.sides
=> 4
{% endhighlight %}

{% highlight ruby %}
class Square
  class << self
    attr_accessor :sides
  end
end

Square.sides
=> nil

Square.sides = 4
=> 4

Square.sides
=> 4
{% endhighlight %}

Ta da!
