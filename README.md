# Vue-rate-it - Extensible Rating Component for Vue.js 2


[![Build Status](https://travis-ci.org/craigh411/vue-rate-it.svg?branch=master)](https://travis-ci.org/craigh411/vue-rate-it)

Vue-rate-it is an extensible, highly customisable rating system for Vue.js 2. It includes four built-in rating components for rating with stars, hearts, images or any [Font Awesome](http://fontawesome.io) glyph.

## Features

- Rate with Stars, Hearts, Images or any Font Awesome glyph.
- Extensible - Create your own SVG raters by extending the included components.
- Includes port of nerly 700 font awesome glyphs to use as rating items.
- Customisable rating increments - Use any increment you want from 0.01 onwards.
- Customisable styles - Change colours, borders, sizes and spacing.
- Create read-only ratings.
- Uses scalable SVG images.
- Supports v-model for easy syncing (vue 2.2+)
- Supports RTL (right-to-left)

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
<fa-rating v-bind:glyph="thumbsUp"></fa-rating>
```

**Note:** The `fa-rating` component requires you to first register the font-awesome glyph you want to use in your Vue instance, which is why this example uses `v-bind` (see: [font-awesome rating component docs](https://craigh411.github.io/vue-rate-it/#/docs/font-awesome))

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

### Registering the Rating Components

#### Global Registration

You can register your raters globally by doing the following:

```javascript
import Raters from 'vue-star-rating';
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

**You can find details about all the available props, events and options on [the docs github pages](https://craigh411.github.io/vue-rate-it/)**

### Using the CDN

It is recommended that you use `vue-rate-it` via NPM, however, each rating component does have a dist file available via unpkg. To use the raters via CDN simply include the following in your web page. These components are registered automatically:

#### Star Rating

```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/cdn/star-rating.min.js">
```

#### Heart Rating
```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/cdn/heart-rating.min.js">
```

#### Fa Rating (Font-awesome)

```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/cdn/fa-rating.min.js">
```

**Note:** The `fa-rating` component CDN is intended for demonstrative purposes only. It contains an entire port of font-awesome glyphs which makes it more than 700kB in size. It is strongly recommended that you use this component via NPM where you can specify the glyphs that you want to import.

#### Image Rating

```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/cdn/image-rating.min.js">
```

#### All Features

You may also include all features and raters via CDN by doing:

```HTML
<link rel="stylesheet" href="https://unpkg.com/vue-rate-it/dist/cdn/vue-rate-it.min.js">
```

**Note:** This CDN file is intended for demonstrative purposes only. It contains an entire port of font-awesome glyphs which makes it more than 700kB in size. It is strongly recommended that you use NPM where you can specify any glyphs that you want to import.

#### Registering the Raters

When importing all features via CDN, the raters are not automatically registered, so you will need to register them yourself by doing:

```javascript
Vue.component('star-rating', VueRateIt.StarRating);
Vue.component('heart-rating', VueRateIt.HeartRating);
Vue.component('image-rating', VueRateIt.ImageRating);
Vue.component('fa-rating', VueRateIt.FaRating);
```

You may also register them in your view model:

```javascript
new Vue({
  el: "#app",
  components:{
    'star-rating': VueRateIt.StarRating
  }
});
```

**You can find details about all the available props, events and options on [the docs github pages](https://craigh411.github.io/vue-rate-it/)**

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
import {HeartRating} from 'vue-rate-it';

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
import {HeartRating} from 'vue-rate-it';

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
