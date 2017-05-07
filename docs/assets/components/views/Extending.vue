<template>
    <div class="ui basic segment" style="font-size:1.1em;">
        <h1 class="ui header">Building Your Own Components</h1>
        <div class="ui divider"></div>
        <p>vue-rate-it has been designed to be extensible, meaning you can create your own rating components by extending the base components, in fact each component in this project does just that.</p>

        <div class="ui message">This part of the docs is currently under development.</div>

        <h2 class="ui header">Basics</h2>
        <div class="ui divider"></div>

        <p>vue-rate-it comes out the box with a "rate-it" component that allows you to specify a rating item of your choice. In order to make creating a rating item easy, vue-rate-it comes with built in components that can be extended. To start we will look at the how to extend the FaBaseGlyph component so we only import the font awesome glyph we need.</p>

       <h3 class="ui header">Extending the FaBaseGlyph Component</h3>

       <p>If you've never extended a Vue component before, don't worry, it's easy. All you need to do is import the component you want to extend and use Vue's extend functionailty, so for our FaBaseGlyph component we just need to do:</p>


<div class="ui segment"><!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> {FaBaseGlyph} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span> FaBaseGlyph.extend({})
</pre></div>
</div>

<p>Now we have done that we can import the font awesome glyph we want from 'vue-rate-it/glyphs'. We can't use hyphens in constant names in JavaScript, so they have been replaced with underscores. So let's import the fa-thumbs-up glyph:</p>

<div class="ui segment">
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> {FaBaseGlyph} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> {fa_thumbs_up} from <span style="color: #aa5500">&#39;vue-rate-it/glyphs&#39;</span>

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span> FaBaseGlyph.extend({})
</pre></div>

</div>

Now the FaBaseGlyph component extends the Path component (more on that later), which allows us to supply an SVG path's points via the points data attribute, so all we need to do is add our imported glyph (which is actaully just an SVG path) to the points array, which we can do in the created hook:

<div class="ui segment">
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> {FaBaseGlyph} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> {fa_thumbs_up} from <span style="color: #aa5500">&#39;vue-rate-it/glyphs&#39;</span>

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span> FaBaseGlyph.extend({
  created(){
    <span style="color: #0000aa">this</span>.points = [fa_thumbs_up];
  }
})
</pre></div>
</div>

And that's it, we now have our thumbs up glyph component complete.

<h3 class="ui heading">Using the rate-it component</h3>

Now we have created our thumbs-up-glyph component we can import that with the RateIt component. Here I've assumed we have saved the above component as "components/thumbs-up-glyph.vue":

<div class="ui segment">
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;script </span><span style="color: #1e90ff">type=</span><span style="color: #aa5500">&quot;text/javascript&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
<span style="color: #0000aa">import</span> {RateIt} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> ThumbsUpGlyph from <span style="color: #aa5500">&#39;./comoponents/thumbs-up-glyph.vue&#39;</span>

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span>{
  components:{
    RateIt
  }
}
<span style="color: #1e90ff; font-weight: bold">&lt;/script&gt;</span>
</pre></div>
</div>


Finally we need to add our thumbs-up-glyph component to the data attribute so we can pass it as a prop to the rate-it component:

<div class="ui segment">
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;template&gt;</span>
<span style="color: #1e90ff; font-weight: bold">&lt;div&gt;</span>
  <span style="color: #1e90ff; font-weight: bold">&lt;rate</span><span style="color: #1e90ff">-it</span> <span style="color: #1e90ff">:with=</span><span style="color: #aa5500">&quot;thumbsUp&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/rate-it&gt;</span>
<span style="color: #1e90ff; font-weight: bold">&lt;/div&gt;</span>
<span style="color: #1e90ff; font-weight: bold">&lt;/template&gt;</span>

<span style="color: #1e90ff; font-weight: bold">&lt;script </span><span style="color: #1e90ff">type=</span><span style="color: #aa5500">&quot;text/javascript&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
<span style="color: #0000aa">import</span> {RateIt} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> ThumbsUpGlyph from <span style="color: #aa5500">&#39;./comoponents/thumbs-up-glyph.vue&#39;</span>

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span>{
  components:{
    RateIt
  },
  data(){
    <span style="color: #0000aa">return</span>{
      thumbsUp: ThumbsUpGlyph
    }
  }
}
<span style="color: #1e90ff; font-weight: bold">&lt;/script&gt;</span>
</pre></div>
</div>

And that's it, you can now pass all the same props as the <router-link to="/docs/font-awesome">font-awesome</router-link> component, without importing all 700 font-awesome glyphs!

    </div>
</template>
