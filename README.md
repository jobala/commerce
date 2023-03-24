# crankwheel.com

Website structure, useful recipes

---

##Contents
* [Structure](#structure)
* [Development and blogging](#development-and-blogging)
	- [Editorconfig](#editorconfig)
	- [Data driven nav](#data-driven-nav)
	- [Post creation](#post-creation)
	- [Page creation](#page-creation)
	- [Markdown syntax](#markdown-syntax)

## Structure
Project based on [common Jekyll directory structure](http://jekyllrb.com/docs/structure/)
```
./
├── .editorconfig                          * dev config: indentation etc
├── CNAME                                  * Github Pages domain alias
├── README.md
├── Gemfile                                * Jekyll gems for website build
├── _config.yml                            * Jekyll settings
├── feed.xml                               * feed generator template
├── sitemap.xml                            * sitemap generator template
├── robots.txt
│
├── index.html
├── _data/                                 * jekyll data (i18n, locales)
|   ├── nav_top.yml                        * Header navigation links
|   └── nav_bottom.yml                     * Footer navigation links
|
├── _drafts/                               * drafts
|   └── Y-M-D-post-name.md                 * Template post for quick start
|
├── _layouts/                              * layouts for jekyll generation
|   ├── page.html                          * Template for index or blog
|   ├── page_inner.html                    * Inner page with or without sidebar
|   └── post.html                          * Blog post template
|
├── _posts/                                * posts (*.md, *.html, *.textile)
|   └── Y-M-D-post-name.md                 * Blog post
|
└── static/                                * static assets
	├── css/                               * stylesheets
	|
	├── images/                            * website and posts(pages) images
	|   ├── pages/                         * images for website pages
	|	|   └── page-name/                 * folder for page images
	|   ├── posts/                         * images for blog posts
	|	|   └── Y-M-D-post-name/           * folder for post images
	|   └── author/                        * Author avatars
	│
	├── js/                                * javascript
	|
	└── fonts/                             * custom webfonts and iconfonts

```

## Development and blogging

### Setup
To run locally on your computer, do the following:
* (Optional) Install rvm for easier management of ruby dependencies. `\curl -sSL https://get.rvm.io | bash -s stable`, and then execute `source ~/.rvm/scripts/rvm`.
* Install bundle `gem install bundle`
* Install dependencies `bundle install`
* If you receive an error installing Nokogiri run the following command `config build.nokogiri --use-system-libraries` and then run `bundle install` again.
* Everything should now be set up, run the project locally with `bundle exec jekyll serve`

Now you can visit `localhost:4000` from your browser.


### Editorconfig
This project contains .editorconfig file. It describes codestyle like indentation, trailing whitespaces etc. See more details [here](http://editorconfig.org/) 

### Data driven nav
This theme use special data from `_data/nav_top.yml` and `_data/nav_bottom.yml` to generate header and footer navigation. It's useful when you quickly change menu or even create nested navigation.

### Post creation
Here is a way to manually create posts:
* create new `Y-M-D-post-name.md` (keep this format year-month-day-post-name for correct Jekyll processing)e file at `_posts` directory using predefined draft from `_drafts` directory
* create folder in `static/images/posts/` with the same name as post for your post images. It's pretty simple and useful. It allows you to maintain the large amount of posts or pages and also create independent website units with encapsulated content that won't interfere with other pages or posts.

There is another way to maintain Jekyll website: using third-party services, like [prose.io](http://prose.io/)

### Page creation
The process almost the same as for posts, just use `page-name.md` layout from `_drafts` directory. Please note: custom designed pages, like homepage or blog page created using regular html markup for easy maintain.

**How to enable page sidebar and assign thumbnail for page or post?**
We're able to assign thumbnail for each page and post. It will be used in opengraph and twittercard meta tags and also as sidebar image for pages with sidebar. Default thumbnail configured in `_config.yml`. 

You're able to add thumbnail using `thumbnail` option in [YAML-frontmatter](http://jekyllrb.com/docs/frontmatter/) of page or post - just pass url to related image.

For inner pages we could turn-on `sidebar` option - it will add left sidebar to the page and place there page thumbnail. Just put `sidebar:true` and layout will be enabled.

**Note: You can use html markup inside *.md files (in posts or pages) to create complex or nested elements with specific classnames, ids or styles.**

### Markdown syntax
This website uses `kramdown` syntax for *.md files markup. [Here](http://kramdown.gettalong.org/syntax.html) you can find all necessary recipes how to create structural elements or text markup.
