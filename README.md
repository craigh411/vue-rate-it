# Vue-rate-it - Extensible Rating Component for Vue.js 2


[![Build Status](https://travis-ci.org/craigh411/vue-rate-it.svg?branch=master)](https://travis-ci.org/craigh411/vue-rate-it)

Vue-rate-it is an extensible, highly customisable rating system for Vue.js 2. It includes four built-in rating components for rating with stars, hearts.

## Features

- Rate with Stars, Hearts, Images or any Font Awesome glyph.
- Extensible - Create your own SVG raters by extending the included components.
- Includes port of nerly 700 font awesome glyphs to use as rating items.
- Customisable rating increments - Use any increment you want from 0.01 onwards.
- Customisable styles - Change colours, borders, sizes and spacing.
- Create read-only ratings.
- Uses scalable SVG images.
- Supports v-model for easy syncing (vue 2.2+)

[Check out the detailed docs with examples on the vue-rate-it Github Pages](https://craigh411.github.io/vue-rate-it/#/)

# Getting Started

Below you can see the simple markup required to create a rating component:

### Stars

[![star-rating.png](https://s22.postimg.org/6g6r6q6i9/star-rating-screenshot.png)](https://craigh411.github.io/vue-rate-it/#/docs/stars)

[Try on JSFiddle](https://jsfiddle.net/craig_h_411/cmyqv9nr/)

```HTML
<star-rating></star-rating>
```



### Hearts

[![heart-rating.png](https://s22.postimg.org/ouhaapisx/heart-rating-ss.png)](https://craigh411.github.io/vue-rate-it/#/docs/hearts)

[Try on JSFiddle](https://jsfiddle.net/craig_h_411/zhjxuorw/)

```HTML
<heart-rating></heart-rating>
```
### Images

[![image-rating.png](https://s24.postimg.org/edc6jr3xx/image-rating-ss.png )](https://craigh411.github.io/vue-rate-it/#/docs/images)

[Try on JSFiddle](https://jsfiddle.net/craig_h_411/e2vx9v4r/)

```HTML
<image-rating src="/images/vueLogo.png"></image-rating>
```

### Font Awesome Thumbs-up Glyph

[![fa-thumbs-up.png](https://s24.postimg.org/rrp9fsalx/fa-thumbs-up-ss.png)](https://craigh411.github.io/vue-rate-it/#/docs/font-awesome)

[Try on JSFiddle](https://jsfiddle.net/craig_h_411/rpwtbx63/)

```HTML
<fa-rating glyph="thumbs-up"></fa-rating>
```

## Setup

### NPM

It is recommended that you install vue-rate-it via npm:

`npm install vue-rate-it`

Once installed you can import the rating components like so:

```javascript
import {StarRating} from 'vue-rate-it';
import {HeartRating} from 'vue-rate-it';
import {FaRating} from 'vue-rate-it';
import {ImageRating} from 'vue-rate-it';
```

You may also import all of the components at once, however, you will still need to register each component individually:

```javascript
import Raters from 'vue-rate-it';
```

##### Important

You will need to ensure that you have added [vue-loader](https://www.npmjs.com/package/vue-loader) and [babel-loader](https://www.npmjs.com/package/babel-loader) to your list of modules if using webpack. If you are using browserify you will require the [vueify](https://www.npmjs.com/package/vueify) and [babelify](https://www.npmjs.com/package/babelify) transforms to be installed. You will also need to ensure that you have installed and setup [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015).

#### Using Webpack

If you are using webpack there's a good chance that you are excluding "node_modules" from being processed by babel-loader, however, vue-rate-it is written in ES2015 and does not export pre-transpiled JS code, so you need to ensure that you have included the following is in your webpack config:

```javascript
module: {
  rules: [{
    test: /\.vue$/,
    loader: 'vue-loader',
  }, {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules\/(?!(vue-rate-it)\/).*/
  }]
},
```

#### Setting up Babel

Whether you are using Browserify or Webpack you will need to make sure you have babel-preset-es2015 installed to correctly transpile the ES2015 code, and have included the following in your .babelrc file in the root of your project:

```json
{
  "presets": ["es2015"]
}
```

### Registering the Rating Components

#### Global Registration

You can register your raters globally by doing the following:
import Raters from 'vue-star-rating';

```javascript
Vue.component('star-rating', Raters.StarRating);
Vue.component('heart-rating', Raters.HeartRating);
Vue.component('fa-rating', Raters.FaRating);
Vue.component('image-rating', Raters.ImageRating);
```

#### Local Registration

You can register your raters in the components that you want to use them in by doing the following:

```javascript
import {StarRating} from 'vue-rate-it';

export default{
  components:{
    StarRating
  }
}
```

### Using the CDN

It is recommended that you use vue-rate-it via NPM, however, each rating component does have a dist file available via unpkg. To use the raters via CDN simply include the following in your web page:

#### Star Rating

```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/star-rating.min.js">
```

#### Heart Rating
```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/heart-rating.min.js">
```

#### Fa Rating (Font-awesome)

```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/fa-rating.min.js">
```

#### Image Rating

```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/image-rating.min.js">
```

## Syncing Ratings between Parent and Child

The first thing you will want to do is sync your ratings between the parent and the rating component. If you are using Vue 2.2 and above the simplest way to sync the rating is to use v-model:

#### Basic Markup

```HTML
<heart-rating v-model="rating"></heart-rating>
```

#### Complete Example

```HTML
<template>
  <div>
    <heart-rating v-model="rating"></heart-rating>
    <div>Currently Selected: {{rating}}</div>
    <div><a href="#" @click.prevent="rating = 0">Reset Rating</a></div> 
  </div>
</template>

<script type="text/javascript">   
import HeartRating from 'vue-rate-it';

export default{
  components: {
    HeartRating
  },
  data(){
    return {
      rating: 3
    }
  }
}
</script>
```

## Syncing Ratings in Vue 2.1 and below

It isn't possible to use v-model on the component in Vue.js 2.1 and below, however, the following is the equivalent of the `v-model` example above:

#### Basic Markup

```HTML
<heart-rating @rating-selected="rating = $event" :rating="rating"></heart-rating>
```

#### Complete Example

```HTML
<template>
  <div>
    <heart-rating @rating-selected="rating = $event" :rating="rating"></heart-rating>
    <div>Currently Selected: {{rating}}</div>
    <div><a href="#" @click.prevent="rating = 0">Reset Rating</a></div> 
  </div>
</template>

<script type="text/javascript">   
import HeartRating from 'vue-rate-it';

export default{
  components: {
    HeartRating
  },
  data(){
    return {
      rating: 3
    }
  }
}
</script>
```

## What Next

Once you have everything up and running, you can check out the detailed docs on the [vue-rate-it docs github pages](https://craigh411.github.io/vue-rate-it/)
