<a href="https://travis-ci.org/caleorourke/mio?branch=gh-pages" target="_blank"><img src="http://travis-ci.org/caleorourke/mio.svg?branch=gh-pages"></a>
<a href="https://david-dm.org/caleorourke/mio#info=devDependencies" target="_blank"><img src="https://david-dm.org/caleorourke/mio/dev-status.svg?theme=shields.io"></a>
<a href="http://github.com/caleorourke/mio/blob/gh-pages/LICENSE" target="_blank"><img src="http://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"></a>

## Introducing Mio
Mio is a one-page template designed specifically for hosting on [GitHub Pages](http://pages.github.com) and serving locally using [Jekyll](http://jekyllrb.com).

## Prerequisites
Mio requires the minimum versions of Node and Ruby below.

* [Node 0.10.30](http://nodejs.org/download)
* [Ruby 2.0](http://www.ruby-lang.org/en/installation)

Run the commands below to determine which versions are currently installed.

~~~bash
# each command returns a version number
$ node --version
$ ruby -v
~~~

## Install Mio
Clone Mio from the `gh-pages` branch on GitHub and go into its directory.

~~~
$ git clone -b gh-pages https://github.com/caleorourke/mio.git
$ cd mio
~~~

Install Grunt and dev dependencies for Node.

~~~bash
$ sudo npm install -g grunt-cli
$ sudo npm install
~~~

Install Jekyll and other Ruby runtime dependencies.

~~~bash
$ sudo grunt install
~~~

## Start Using Mio
Mio leverages [Grunt](http://gruntjs.com) as a harness for installing Node and Ruby dependencies, in addition to serving the site locally.

### Commands
Run any of these commands to initiate a task.

* `$ grunt build`
* `$ grunt install`
* `$ grunt serve`
* `$ grunt test`

#### $ grunt build

1. Bundles and minifies `*.less` files to `*.css` using [RECESS](http://twitter.github.io/recess)
2. Bundles and minifies `*.js` files using [UglifyJS](https://www.npmjs.com/package/grunt-contrib-uglify)

#### $ grunt install

1. Updates RubyGems
2. Runs `gem install github-pages`

#### $ grunt serve

1. Bundles and minifies `*.less` files to `*.css` using [RECESS](http://twitter.github.io/recess)
2. Bundles and minifies `*.js` files using [UglifyJS](https://www.npmjs.com/package/grunt-contrib-uglify)
3. Builds the site locally in the `_site` directory
4. Starts a local environment on `http://localhost:4000`
5. Regenerates a new `_site` directory whenever a file is modified (except `.less` and `.js` assets)

> Serve mode lasts forever. It will not timeout after a period of non-usage. In order to stop it, press `CTRL+C`.

#### $ grunt test

1. Builds the website locally in the `_site` directory
2. Spits out any errors found during the build process

## Updating Mio
Dependencies are updated often by their original authors. To install the most recent versions, run `sudo npm update`.

If this fails for whatever reason, run the following commands to delete the original `node_modules` directory and build a new one.

~~~bash
$ sudo rm -r node_modules
$ sudo npm install
~~~

## Customization
A number of customization options are available.

#### Letter Animation

Adjust the settings for the intro's letter animation under the `textillate_options` var in `js/textillate.js`.

~~~js
var textillate_options = {
  loop:           false,
  minDisplayTime: 0,
  initialDelay:   0,
  autoStart:      false,
  inEffects:      ['fadeIn'],
  outEffects:     ['fadeOutDown'],
  'in': {
    effect:       'fadeIn',
    delayScale:   1.5,
    delay:        12,
    sync:         false,
    shuffle:      true,
    reverse:      false
  },
  out: {
    effect:       'fadeOutDown',
    delayScale:   1.5,
    delay:        8,
    sync:         false,
    shuffle:      true,
    reverse:      false
  }
};
~~~

#### Scroll Speed

Adjust the settings for scroll speed under the `onePageNav` function in `js/options.js`.

~~~js
$('#nav').onePageNav({
  currentClass:     'active',
  changeHash:       false,
  scrollSpeed:      750,
  scrollThreshold:  0.5,
  filter:           ':not(.contact)',
  easing:           'swing',
  begin:            function () {},
  end:              function () {},
  scrollChange:     function () {}
});
~~~

## Images

A number of images on this site were purchased from Shutterstock under the Standard License agreement. Those images are not free, nor are they available for reuse. Only the purchaser has the rights to use those images.

## License

Code and documentation licensed under the MIT license.
