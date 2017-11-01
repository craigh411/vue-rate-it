<template>
    <div class="ui basic segment" style="font-size:1.1em;">
        <h1 class="ui header">Getting Started</h1>
        <div class="ui divider"></div>

        <p> Vue-rate-it is an extensible rating system for Vue.js 2. It includes four built-in rating components for rating with stars, hearts, images and over 600 font awesome glyphs, check out how simple it is to use:</p>

        <div id="app">
            <h3 class="ui header">Stars</h3>

            <star-rating></star-rating>
            <div class="ui segment">
                <div class="ui basic segment" style="padding:0;">
                    <!-- HTML generated using hilite.me -->
                    <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;star</span><span style="color: #1e90ff">-rating</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/star-rating&gt;</span>
</pre></div>
                </div>
            </div>
            <h3 class="ui header">Hearts</h3>

            <heart-rating :spacing="5"></heart-rating>
            <div class="ui segment">
                <div class="ui basic segment" style="padding:0;">
                    <!-- HTML generated using hilite.me -->
                    <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;heart</span><span style="color: #1e90ff">-rating</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/heart-rating&gt;</span>
</pre></div>
                </div>
            </div>

            <h3 class="ui header">Images</h3>

            <image-rating src="images/vueLogo.png"></image-rating>

            <div class="ui segment">
                <!-- HTML generated using hilite.me -->
                <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;image</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff">src=</span><span style="color: #aa5500">&quot;/images/vueLogo.png&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/image-rating&gt;</span>
</pre></div>

            </div>

            <h3 class="ui header">Font Awesome Thumbs-up Glyph</h3>

            <fa-rating :glyph="thumbsUp" active-color="#ffcd94"></fa-rating>
            <div class="ui segment">
                <div class="ui basic segment" style="padding:0;">
                    <!-- HTML generated using hilite.me -->
                    <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;fa</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff">:glyph=</span><span style="color: #aa5500">&quot;thumbsUp&quot;</span> <span style="color: #1e90ff">active-color=</span><span style="color: #aa5500">&quot;#ffcd94&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/fa-rating&gt;</span>
</pre></div>

                </div>


            </div>

            <div class="ui info message" style="font-size:0.9em;">
                <div class="header">Registering Icons</div>
                <p><i class="info circle icon"></i> vue-rate-it comes with a port of font awesome icons. Before you can use an icon you must register it in your vue instance. See the <router-link to="docs/font-awesome">Font Awesome Rater Docs</router-link> for more info.</p>
            </div>

            <h1 class="ui header">Setup</h1>
            <div class="ui divider"></div>
            <h2>NPM</h2>
            <p>It is recommended that you install vue-rate-it via npm:</p>

            <pre class="code">npm install vue-rate-it</pre>

            <p>Once installed you can import the rating components like so:</p>
            <div class="ui segment">
                <!-- HTML generated using hilite.me -->
                <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> {StarRating} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> {HeartRating} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> {FaRating} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> {ImageRating} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
</pre></div>
            </div>
            <p>You may also import all of the components at once, however, you will still need to register each component individually:
                <p>
                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> Raters from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
</pre></div>

                    </div>

                    <h3 class="ui header">Registering the Rating Components</h3>

                    <h4 class="ui header">Global Registration</h4> You can register your raters globally by doing the following:
                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> Raters from <span style="color: #aa5500">&#39;vue-star-rating&#39;</span>;

Vue.component(<span style="color: #aa5500">&#39;star-rating&#39;</span>, Raters.StarRating);
Vue.component(<span style="color: #aa5500">&#39;heart-rating&#39;</span>, Raters.HeartRating);
Vue.component(<span style="color: #aa5500">&#39;fa-rating&#39;</span>, Raters.FaRating);
Vue.component(<span style="color: #aa5500">&#39;image-rating&#39;</span>, Raters.ImageRating);
</pre></div>

                    </div>

                    <h4 class="ui header">Local Registration</h4>
                    <p>You can register your raters in the components that you want to use them in by doing the following:</p>

                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> {StarRating} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span>{
  components:{
    StarRating
  }
}
</pre></div>
                    </div>

                    <h2 class="ui header">Using the CDN</h2>
                    <p>It is recommended that you use vue-rate-it via NPM, however, each rating component does have a dist file available via unpkg. To use the raters via CDN simply include the following in your webpage. These components are registered automatically:</p>

                    <h3 class="ui header">Star Rating</h3>
                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;link</span> <span style="color: #1e90ff">rel=</span><span style="color: #aa5500">&quot;stylesheet&quot;</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;https://unpkg.com/vue-rate-it/dist/cdn/star-rating.min.js&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
</pre></div>
                    </div>

                    <h3 class="ui header">Heart Rating</h3>
                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;link</span> <span style="color: #1e90ff">rel=</span><span style="color: #aa5500">&quot;stylesheet&quot;</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;https://unpkg.com/vue-rate-it/dist/cdn/heart-rating.min.js&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
</pre></div>
                    </div>
                    <h3 class="ui header">Fa Rating (Font-awesome)</h3>
                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;link</span> <span style="color: #1e90ff">rel=</span><span style="color: #aa5500">&quot;stylesheet&quot;</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;https://unpkg.com/vue-rate-it/dist/cdn/fa-rating.min.js&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
</pre></div>
                    </div>

                    <h3 class="ui header">Image Rating</h3>
                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;link</span> <span style="color: #1e90ff">rel=</span><span style="color: #aa5500">&quot;stylesheet&quot;</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;https://unpkg.com/vue-rate-it/dist/cdn/image-rating.min.js&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
</pre></div>
                    </div>

                    <h3 class="ui header">All Features</h3>
                    You may also add all vue-rate-it features and raters via CDN by doing:
                    <div class="ui segment">
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;link</span> <span style="color: #1e90ff">rel=</span><span style="color: #aa5500">&quot;stylesheet&quot;</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;https://unpkg.com/vue-rate-it/dist/cdn/vue-rate-it.min.js&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
</pre></div>
                    </div>

<h4 class="ui header">Registering the Raters</h4>

<p>When importing all features via CDN, the raters are not automatically registered, so you will need to register them yourself by doing:</p>
<div class="ui segment">
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">Vue.component(<span style="color: #aa5500">&#39;star-rating&#39;</span>, VueRateIt.StarRating);
Vue.component(<span style="color: #aa5500">&#39;heart-rating&#39;</span>, VueRateIt.HeartRating);
Vue.component(<span style="color: #aa5500">&#39;image-rating&#39;</span>, VueRateIt.ImageRating);
Vue.component(<span style="color: #aa5500">&#39;fa-rating&#39;</span>, VueRateIt.FaRating);
</pre></div>
</div>

<p>You may also register them in your view model:</p>

<div class="ui segment">
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">new</span> Vue({
  el: <span style="color: #aa5500">&quot;#app&quot;</span>,
  components:{
    <span style="color: #aa5500">&#39;star-rating&#39;</span>: VueRateIt.StarRating
  }
});
</pre></div>
</div>



                    <h1 class="ui header">Syncing Ratings between Parent and Child</h1>
                    <div class="ui divider"></div>

                    <p>The first thing you will want to do is sync your ratings between the parent and the rating component, here's an example of syncing in action: </p>

                    <div class="ui segment" style="font-size:1em;">
                        <heart-rating :border-width="3" v-model="rating"></heart-rating>
                        <div style="margin-top:20px;font-weight:bold;">Currently Selected: {{rating}}
                        </div>
                        <div style="margin-top:5px;"><a href="#" @click.prevent="rating = 0">Reset Rating</a></div>
                    </div>

                    <h3 class="ui header">Using v-model for Syncing in Vue 2.2 and above</h3>
                    <p>If you are using Vue 2.2 and above the simplest way to sync the rating is to use v-model:</p>

                    <h4 class="ui header">Basic Markup</h4>
                    <div class="ui segment" style="padding:0;padding-left:10px;">
                        <pre><span style="color: #1e90ff;">&lt;heart</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff">v-model=</span><span style="color: #aa5500">&quot;rating&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/heart-rating&gt;</span></pre>
                    </div>

                    <h4 class="ui header">Complete Example</h4>
                    <div class="ui segment" v-pre>
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;template&gt;</span>
  <span style="color: #1e90ff; font-weight: bold">&lt;div&gt;</span>
    <span style="color: #1e90ff; font-weight: bold">&lt;heart</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff">v-model=</span><span style="color: #aa5500">&quot;rating&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/heart-rating&gt;</span>
    <span style="color: #1e90ff; font-weight: bold">&lt;div&gt;</span>Currently Selected: {{rating}}<span style="color: #1e90ff; font-weight: bold">&lt;/div&gt;</span>
    <span style="color: #1e90ff; font-weight: bold">&lt;div&gt;&lt;a</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;#&quot;</span> <span style="color: #1e90ff; ">@</span><span style="color: #1e90ff">click</span><span style="color: #1e90ff;">.</span><span style="color: #1e90ff">prevent=</span><span style="color: #aa5500">&quot;rating = 0&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>Reset Rating<span style="color: #1e90ff; font-weight: bold">&lt;/a&gt;&lt;/div&gt;</span> 
  <span style="color: #1e90ff; font-weight: bold">&lt;/div&gt;</span>
<span style="color: #1e90ff; font-weight: bold">&lt;/template&gt;</span>

<span style="color: #1e90ff; font-weight: bold">&lt;script </span><span style="color: #1e90ff">type=</span><span style="color: #aa5500">&quot;text/javascript&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>   
<span style="color: #0000aa">import</span> HeartRating from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span>{
  components: {
    HeartRating
  },
  data(){
    <span style="color: #0000aa">return</span> {
      rating: <span style="color: #009999">3</span>
    }
  }
}
<span style="color: #1e90ff; font-weight: bold">&lt;/script&gt;</span>
</pre></div>
                    </div>

                    <h3>Syncing Ratings in Vue 2.1 and below</h3>

                    <p>It isn't possible to use v-model on the component in Vue.js 2.1 and below, however, the following is the equivelent of the v-model example above:</p>

                    <h4 class="ui header">Basic Markup</h4>
                    <div class="ui segment" style="padding:0;padding-left:10px;">
                        <pre><span style="color: #1e90ff;">&lt;heart</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff;">@</span><span style="color: #1e90ff">rating-selected=</span><span style="color: #aa5500">&quot;rating = $event&quot;</span> <span style="color: #1e90ff">:rating=</span><span style="color: #aa5500">&quot;rating&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff; ">&lt;/heart-rating&gt;</span></pre>

                    </div>

                    <h4 class="ui header">Complete Example</h4>

                    <div class="ui segment" v-pre>
                        <!-- HTML generated using hilite.me -->
                        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;template&gt;</span>
  <span style="color: #1e90ff; font-weight: bold">&lt;div&gt;</span>
    <span style="color: #1e90ff; font-weight: bold">&lt;heart</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff;">@</span><span style="color: #1e90ff">rating-selected=</span><span style="color: #aa5500">&quot;rating = $event&quot;</span> <span style="color: #1e90ff">:rating=</span><span style="color: #aa5500">&quot;rating&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff; ">&lt;/heart-rating&gt;</span>
    <span style="color: #1e90ff; font-weight: bold">&lt;div&gt;</span>Currently Selected: {{rating}}<span style="color: #1e90ff; font-weight: bold">&lt;/div&gt;</span>
    <span style="color: #1e90ff; font-weight: bold">&lt;div&gt;&lt;a</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;#&quot;</span> <span style="color: #1e90ff; ">@</span><span style="color: #1e90ff">click</span><span style="color: #1e90ff;">.</span><span style="color: #1e90ff">prevent=</span><span style="color: #aa5500">&quot;rating = 0&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>Reset Rating<span style="color: #1e90ff; font-weight: bold">&lt;/a&gt;&lt;/div&gt;</span> 
  <span style="color: #1e90ff; font-weight: bold">&lt;/div&gt;</span>
<span style="color: #1e90ff; font-weight: bold">&lt;/template&gt;</span>

<span style="color: #1e90ff; font-weight: bold">&lt;script </span><span style="color: #1e90ff">type=</span><span style="color: #aa5500">&quot;text/javascript&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>   
<span style="color: #0000aa">import</span> HeartRating from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span>{
  components: {
    HeartRating
  },
  data(){
    <span style="color: #0000aa">return</span> {
      rating: <span style="color: #009999">3</span>
    }
  }
}
<span style="color: #1e90ff; font-weight: bold">&lt;/script&gt;</span>
</pre></div>

                    </div>

<h2 class="ui header">What Next</h2>
<div class="ui divider"></div>
<p>Once you have everything up and running, you can check out the detailed docs for each component under the "docs" heading on the navigation menu.</p>
        </div>
    </div>
</template>

<script type="text/javascript">
import Rating from '../../../../src/index.js';
import ThumbsUp from '../../../../glyphs/thumbs_up.js';

export default {
    components: {
        'heart-rating': Rating.HeartRating,
        'star-rating': Rating.StarRating,
        'fa-rating': Rating.FaRating,
        'image-rating': Rating.ImageRating,
    },
    created(){
        this.thumbsUp = ThumbsUp;
    },
    data() {
        return {
            rating: 3,
            thumbsUp: ''
        }
    }
}
</script>
