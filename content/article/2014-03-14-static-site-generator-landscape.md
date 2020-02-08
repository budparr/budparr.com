---
class: dev
date: 2014-03-14T00:00:00Z
tags:
- Static Site Generators
title: The No-db Landscape (part 1) 
draft: false
url: /2014/03/14/static-site-generator-landscape/
---

It's no coincidence that as I've become obsessed with website performance I've also become enamored with building sites with no database. They're unequivocally faster, simpler to maintain and build, and more secure and stable than database-driven websites. There are tradeoffs of course, but in my view well worth it. I don't understand the talk I see about static sites being for "hackers" or small or simple sites. I've seen some [large](http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/), [complex](http://developmentseed.org/blog/2013/09/19/relaunching-undp-portal/) and [highly trafficked](http://developmentseed.org/blog/2013/10/24/its-called-jekyll/) sites built this way. See my earlier [post](/article/2014/03/06/static-site-generators-introduction/) in this series for more information.

For the most part I've been using two applications. For purely static sites I use [**Jekyll**](http://jekyllrb.com) and for "flat-file" CMS sites I've used [**Statamic**](http://statamic.com). Each is excellent in its own right, yet serves a different purpose than the other.

This article is aimed squarely at the designer/developer building websites for clients. Choosing the right technology is an important part of a developer's job so I'll go into my thinking here about when I why I might choose either.



### So what is the difference between a "Flat File CMS" and a "Static Site Generator"?
Both flat-file CMSs (or file-based CMSs) and statically generated websites have no database at all. That alone is significant. All of your site's content is merely a collection of text files.

This is what a document might look like in a flat-file site (or see [this post as a raw text file](https://raw.github.com/budparr/budparr.github.io/master/article/_posts/2014-03-14-static-site-generator-landscape.md)):

~~~
---
title: Title   
draft: true
category: Category  
layout: article  
date: November 10, 2013  
author: authorname  
---  
content goes here



~~~

Generally speaking templates and layout schemes tend to be similar in both types of sites in that they use a central default or base layout and some easy way to include partials in your templates. While this layout scheme is not unique to no-db websites, it's a natural fit. In contrast to some of the popular, "traditional" content management systems, these apps assume nothing about your design, thankfully.

All of the no-db applications organize content similarly in pages that can be organized around collections or categories, though folder structures and the way URL schemes vary from one app to another.

#### The similarities end there.
**Static site generators** do little more than the name implies. They compile text-based content files (when I say text file that may mean any sort of text file, depending on the app, including markdown or text) into HTML pages using templates to determine the layout of the page. Depending on the app, they may process Sass/Less or other files to help make development more efficient.

Once the site is compiled you get a folder with your website in it. None of these are currently what you would call a CMS because there is no control panel and no inherent asset/content organizing principle or interface. And not a single bell or whistle to be found.

Most, though not all, of these apps run on a local computer via command line and once the site is compiled it can be moved to pretty much any server. There are more direct methods of deployment, including, prominently, Jekyll's integration with Github's Pages hosting service, which builds the site for you whenever you update your site's Github repo.

The beauty of purely static sites, besides the significant performance gain, is that you can create all the complex queries you want in your templates and the end user will not be impacted because they're not run when the page loads, but at build time. Personally, this is a revelation. The value of a well organized website is that it should keep content creators from repeating themselves while simultaneously creating rich relationships and context around the content of a site. Static sites give me the freedom to create all the complex relationships I like, using content from wherever appropriate, with near total impunity in terms of performance.

Keep in mind, that since the site is purely static, calendars or  other dynamic elements will need to be done outside of the site. I've been using javascript for calendaring in Jekyll, so this so far has not proven to be a problem.

While both types of software could be called flat-file, what we mean when we say **"flat-file CMS"** is likely to be a dynamic application that creates HTML pages on the fly when the page loads. These are a terrific go-between the traditional CMS and static site generators because there are no issues with deployment and no problems with dynamic content like calendars while still maintaining the benefits of storing your content in text files. Optionally, you can offer content creators a control panel and WYSIWYG editor, which is very often necessary for client work.

#### Flat-file CMS

Among the flat-file CMSs there are only a handful that have held my attention. [**Pico**](http://pico.dev7studios.com/) is a very lightweight flat-file CMS created by Gilbert Pellegrom from Dev7studios (interestingly, a Wordpress plugin shop). [**Kirby**](http://getkirby.com/) is the creation of Bastian Allgeier, which at $39.00 per site appears to be a sophisticated system at a low cost.

[**Statamic**](http://statamic.com/), which is also commercial and priced at $99 per site for developers, is an elegant CMS that is my go-to when I need to have a control panel for clients. You can give them the option of writing in Markdown, text, or WYSIWG. The feedback I've gotten from clients is that it's extremely easy to use, though some people get confused about what is a page and what is a post and how to create them.

Statamic uses a templating language that is simple yet fully featured. Organizing complex sites is doable but there's a learning curve. I've tripped up here and there figuring out how to create field groups for a particular content collection, as well as figuring out how URL structures and navigation work, but I've never felt that there was anything I could not create.

I really put Statamic through its paces last year when I had--under a very tight deadline--to put together a conference [website](http://www.americaslatinofestival.org/events) where I had to bring together schedules for events from various disparate parts of the conference (in addition to the main conference there was a film festival and a children's festival and an art festival). For all the events there were related participants, and related venues. You'll see if you visit the page that it loads fairly quickly given its size (the content is greyed out because I wanted to show past events but make them grey as the event's time past). Each event, participant and venue page listed out all the other relationships as well.

Statamic enjoys an active developer community and has a growing number of very polished add-ons. A Statamic site can get fairly expensive, given that integrated search and contact forms  will cost you $49 each, bringing a fully featured site to about $200, but the use-case here is for when you need to have a control panel that is confidently designed and a broad feature set.

Here are some additional examples of sites I've built in Statamic: [1](http://jackwhyland.com/), [2](http://themothbook.org/), [3](http://www.americasforconservation.org/).


#### Static Site Generators

I have a feeling that the best of the static site generators will surface as "web architectures" rather than just static site generators. That's the phrase [**Docpad**](http://docpad.org/) uses to describe itself and even though what it does is precisely generate a website, Docpad is indeed an extensible tool set for building any sort of website, even one with a database, or with dynamic characteristics.

Likewise, [**Harp**](http://harpjs.com/) bills itself as a web server, making the distinction between generating a website and all the other processes that go into a modern website, like Sass, or Jade templates, or coffeeScript. Similarly, [**Middleman**](http://middlemanapp.com/) describes itself as simply a collection of tools.

Ingeniously, the developers behind Harp have also built a commercial [platform](https://www.harp.io/) for deploying sites (the server itself is open source) that appears to be as simple as placing files in a Dropbox folder. I like to have a sense that a project will have longevity, so open source projects, in my view, should have a business model close at hand so that the core developers are able to continue on with the project.

Many of the static site generators are open source. There are three exceptions that I'm aware of. Both [**Cactus**](http://cactusformac.com/) and [**Mixture.io**](http://mixture.io/) are focused on making the developer’s life easier, and though Mixture defines itself as a prototyping tool, you could easily deploy sites generated with it in production.

On the other side of the coin, there's [**Siteleaf**](http://www.siteleaf.com/), also a commercial product, which, uniquely, provides a control panel for content entry. With Siteleaf it appears that you can manage multiple sites from one control panel and deploy to any number of servers.

One reason I love static site generators is that you can define custom fields on the fly just by writing in the field in the front matter of a page, or defining it in a YAML file and then referencing it in your template. I'm not sure yet how this would work in Siteleaf because of the control panel, but I imagine for straight page-based sites where you have to give clients a control panel, it's a good choice. I should note that the control panel is nicely designed and seems extremely friendly, but that very friendliness makes it simplistic enough that I would hesitate to use it for larger clients who might prefer something more serious.

With [Jekyll](http://jekyllrb.com) sites--the only static site generator I've used in production--I've been using the [prose.io](Prose) content editor. Prose is terrific and works hand-in-hand with GitHub, allowing you to easily traverse all your repositories and files within. For each repository you can define files to exclude so content creators can only see files they'd want to work on. Prose also allows you to define your front-matter in a config file so the user can easily edit an entry’s metadata.

![Prose screenshot](/assets/img/proseio.jpg){: style="float: none"}

---

It's important to note that Prose’s development isn't terribly active as of this writing and it has some quirky behavior that makes it not entirely suitable for client use, but I don't feel it's that far away from being a great minimalist content editor. In fact, I've edited some of this post using it on my iPhone.

Jekyll is a Ruby app created by the founder of Github. It's the house-app for serving Github Pages, that company's free static website hosting service, and that alone gives it a leg up on most of these apps, even if just making deployment a bit easier than otherwise.

As of this writing, when used with GitHub Pages, Jekyll doesn't allow any plugins because of restrictions on the hosting platform. If deployment isn't an issue there are plugins put out there to overcome some of Jekyll’s--born a “blogging platform for hackers”--lacunae, and there will be a whitelist of plugins allowed in a future release and I've managed to get by fine without them.

Jekyll is also a bit more structured than many of the apps, using a post and page model where posts get taxonomies and chronological sorting whereas pages do not. The lack of taxonomies and sorting for pages is a big shortcoming, but I know that the project owners are working toward a more flexible, collections-based, model. All in all, I've enjoyed having to find creative solutions to Jekyll's constraints and have managed to create some fairly complex relationships between pieces of content, even if most everything has to be nested in little _posts folders scattered throughout the site.

I use Jekyll's data model liberally and have enjoyed the freedom of just dumping lists in a Yaml file to use anywhere on a site, like turning that data into JSON files for use in, say, a calendar, or tabular data, or relationships like authors on a multi-author site.

Here's an example of a data file for a list of articles I've used in Jekyll:

~~~

-
  title: "Biometric Privacy Trade-off Exposed in Missing Jet's Passports" 
draft: true
  date: 2014-03-10
  publication: "Bloomberg Businessweek"
  link_to_original: "http://www.businessweek.com/"
  category: Finance

-
  title: "New Details Emerge in Mystery of Bronze Apollo Held by Hamas" 
draft: true
  date: 2014-02-10
  link_to_original: "http://www.businessweek.com/"
  publication: "Bloomberg Businessweek"
  category: Ancient


~~~

To my mind there's nothing simpler than dumping some info in a text file, which compared to copying out each line of these into separate fields in a control panel is cumbersome.

One thing to be aware of for more complex sites is that for a large site the time to build the site can get pretty long. It's page generation that takes so long (though we're mostly talking about a matter of seconds) so I've moved anything I can into data files, which has proven to dramatically help build-times.

The guys running and contributing to the project are avid and thoughtful about where Jekyll is going and it's integration with Github make it the best place to start for anyone new to static site generators, particularly given its ease of deployment and use of the easy, if somewhat limited, [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) templating language.

My use case for Jekyll is for when I need a simple deployment and when I need to know the app will have a long life, which its Github backing would seem to ensure. Despite any shortcomings mention above, I really enjoy working with it, find it quite easy to use. The site this article was published on, [budparr.com](http://budparr.com) was created on Jekyll as well as several others, including a project I have in beta that has quite an involved content-set.

While Jekyll is my go-to app (and the app of choice for the firm that introduced me to static site generators, Development Seed) I'm actively looking at Middleman, also a Ruby app; Docpad, Harp, [Assemblejs](http://assemble.io/), and Siteleaf for use in a variety of projects. There are [myriad](http://staticsitegenerators.net/) choices to suit your needs.

With no-db websites in general, it's proven not difficult to move content and even site structure between apps, so it should be easy to get to know several of them so that you can always choose the right set of tools for the task at hand. I've never liked the way CMSs develop fan-bases rather than user-bases and welcome the change to choosing toolsets to get a job done.

If you want to get your feet wet without worry about setting up the proper environment for Jekyll, give [**Mixture**](http://mixture.io/) a try. While it's meant to be a prototyping tool, Mixture is well designed and easy to use so you can get a static site up an running pretty quickly, with a vareity of boilerplates to choose from to help you start as well.

I'll go into these more as I've gotten a chance to build some sites with them and report back.
