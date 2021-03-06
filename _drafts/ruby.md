---
layout: default
title:  "Ruby"
categories: ruby
---

## Variables

**Global**:    `$global_variable` good practice to be all upper or lowercase.
**Constant**: `UPPERCASE_VARIABLE`
**Local**:     `lowercase_variable` and sometimes also underscored
**Instance**:  `@instance_variable` lowercase.

The difference between an instance variable and a local variable is that instance variables are accessible throughout a class. For example:
{% highlight ruby %}
def something
  @instancevariable
end

def anothersomething
  #I could access the instance variable from here
end
{% endhighlight %}

Classes are usually written in camelcase. Eg `Burger`, or `BurgerFirst`.


## Control Flow

{% highlight ruby %}
a=5

if a==3
  puts "a = 3"
elsif a==4
  puts "a = 4"
else
  puts "I have no fucking idea what 'a' is."
end
{% endhighlight %}

Better:
{% highlight ruby %}
a=3

case a
when 3
  puts "a = 3"
when 4
  puts "a = 4"
else
  puts "I have no fucking idea what 'a' is."
end
{% endhighlight %}

#### 'OR' operator: **||**

{% highlight ruby %}
print "What's your favourite number?"
number = gets.chomp.to_i

if (number == 3) || (number == 5)
  puts "That's one of my favourite numbers too!"
end
{% endhighlight %}

Same as:
{% highlight ruby %}
if (number == 3)
  puts "That's one of my favourite numbers too!"
elsif (number == 5)
  puts "That's one of my favourite numbers too!"
end
{% endhighlight %}

#### 'AND' operator: **&&**

#### **.even? .odd?**

{% highlight ruby %}
print "What's your favourite number?"
number = gets.chomp.to_i

if (number == 3) || (number ==5)
  puts "That's one of my favourite numbers too!"
elsif (number > 10) && (number.even?)
  puts "That number is greater than 10 and even!"
elsif (number.odd?)
  puts "That number is odd!"
end
{% endhighlight %}

#### 'MODULUS' operator: **%**

{% highlight ruby %}
elsif (number % 3 == 0)
  print "That number is divisible by 3!"
end
{% endhighlight %}

Means "the remainder is equal to zero when 'number' is divided by 3".


#### 'NOT' operator: **!**

{% highlight ruby %}
car_speed1 = 50
car_speed2 = 60

if car_speed1 == car_speed2
  puts "Car 1 speed is equal to car 2 speed."
end
#=> nothing

if !(car_speed1 == car_speed2)
  puts "Car 1 speed is not equal to car 2 speed."
end
#=> Car 1 speed is not equal to car 2 speed.
{% endhighlight %}

## Objects and Classes

Non-Object Oriented programming languages: In these you would type your commands generally in a series.

In object oriented programming languages, however, your **Objects** are going to be _representations_ or structures that **hold data** and **perform actions or calculations on that data**. **These _representations_ are called Classes**. And the process of figuring out what these Classes _are_ is generally called **'Domain Modelling'** - you're picking a small part of your problem domain and modelling your program around it. In the real world we might be programming something like a bank account.

The bank account would be responsible for all the data associated with it, such as the name of the bank account holder etc etc. In Ruby we would create a `BankAccount` Class that would contain all of that data.

If we were to work with an individual account, we would first have to '**instantiate**' the class. This means creating an **Instance** of the Class. In this case, we would create an Instance of the Class `BankAccount`.

And when we're working with an individual account, that's called an **Object**.

This can be a bit confusing in Ruby because, in Ruby, everything is an object.

You can find out what kind of a class an object is by called the `class` method on an object:
{% highlight ruby %}
bankaccount1.class
#=> BankAccount
{% endhighlight %}

## Interpolation

irb:

{% highlight ruby %}
name = "Andrew"
name
#=> "Andrew"

puts 'Hello #{name}'
#=> Hello #{name}

puts "Hello #{name}"
#=> Hello Andrew
{% endhighlight %}

When using double-quotes, the variable is being Interpolated, which means it's calling the value of the variable.

Another way of creating a variable that you want to be interpolated is:
{% highlight ruby %}
name = %{Andrew}
name
#=> "Andrew"
{% endhighlight %}

For more on this, including escaping etc, see [here]("https://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Literals#Interpolation").

### Special Characters:

`\n` new line
`\b` backspace (deletes a character)
`\n` new line
`\t` tab
`\v` vertical table (new line followed by a tab)

## Strings

{% highlight ruby %}
name = "Andrew"
name[0]
#=> "A"

name = gets
Andrew Stelmach
#=> "Andrew Stelmach\n"

name.replace("Andy")
#=> "Andy"
name
#=> "Andy"

name.index("n")
#=> 1

name.reverse
name.upcase
name.downcase

name.swapcase
"aNDY"

name.length

name.concat(". That's your name.")
#=> "Andy. That's your name."
name
#=> Andy. That's your name."
{% endhighlight %}


## Numbers

{% highlight ruby %}
number = 100
#=> 100
number.class
#=> Fixnum

number = 100.5
#=> 100.5
number.class
#=> Float

number = "100"
#=> "100"
number.class
#=> String
number.to_i
#=> 100
 number.to_f
#=> 100.0

number = "100.50"
number.to_i
#=> 100
number.to_f
#=> 100.5

5e5
#=> 500000.0

number = 10
number + 10
#=> 20
number
#=> 10
number += 10
#=> 20
number
#=> 20
{% endhighlight %}

**+=**
**-=**
**/=**
***=**
etc

****** = exponential

{% highlight ruby %}
A = 10
B = 20
A == B
#=> False
A != B
#=> True

A > B
#=> False
A < B
#=> True
{% endhighlight %}

**<=** less than or equal to
**>=**

#### Combined Comparison operator:
**<=>** returns 0 if both sides are equal, 1 if left side is greater, and -1 if right side is greater.

{% highlight ruby %}
A=10
B=10
A.eql?(B)
#=> True
{% endhighlight %}

(Because they are the same Type AND Value.)

## Floating Point Maths

{% highlight ruby %}
7.3 - 7.2
=> 0.999999999999994

require "bigdecimal"
=> true
A = Big.Decimal.new("7.3")
B = Big.Decimal.new("7.2")
A - B
#=> Gives fairly indecipherable gibberish, so use 'put string':

puts A-B
=> 0.1E0
{% endhighlight %}

## Money

{% highlight ruby %}
gem install money
{% endhighlight %}

