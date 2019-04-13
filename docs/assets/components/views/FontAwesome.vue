<template>
    <div class="ui basic segment" style="font-size:1.1em;">
        <h1 class="ui header">Font Awesome Rating Component</h1>
        <div class="ui divider"></div>
        <p>vue-rate-it comes with a built in port of <a href="http://fontawesome.io">font-awesome</a> glyphs. You can check out all the available glyphs using the form below:
            <p>
                <form class="ui form">
                    <div class="four fields">
                        <div class="field">
                            <label>Glyph</label>
                            <select class="ui fluid dropdown" v-model="selected">
                                <option v-for="glyph in glyphNames">{{glyph}}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label>Spacing</label>
                            <select class="ui fluid dropdown" v-model="spacing">
                                <option v-for="n in 61" :value="n-11">{{n-11}}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label>Inactive Color (Hex)</label>
                            <input class="ui input" type="text" v-model="inactiveColor">
                        </div>
                        <div class="field">
                            <label>Active Color (Hex)</label>
                            <input class="ui input" type="text" v-model="activeColor">
                        </div>
                        <div class="field">
                            <label>Increment (0.01 - 1)</label>
                            <input class="ui input" type="text" @input="setIncrement" :value="increment">
                        </div>
                    </div>
                </form>
                <div class="ui segment center aligned">
                    <component :is="fa" :glyph="glyphPath" :spacing="spacing" :inactive-color="inactiveColor" :active-color="activeColor" :inline="true" :fixed-points="2" :increment="increment"></component>
                </div>

                <div class="ui segment">
                    <!-- HTML generated using hilite.me -->
                    <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;fa</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff">:glyph=</span><span style="color: #aa5500">&quot;{{selected}}&quot;</span>  
           <span style="color: #1e90ff">:spacing=</span><span style="color: #aa5500">&quot;{{spacing}}&quot;</span>  
           <span style="color: #1e90ff">:inactive-</span><span style="color: #1e90ff">color=</span><span style="color: #aa5500">&quot;{{inactiveColor}}&quot;</span> 
           <span style="color: #1e90ff">:active-color=</span><span style="color: #aa5500">&quot;{{activeColor}}&quot;</span>
           <span style="color: #1e90ff">:increment=</span><span style="color: #aa5500">&quot;{{increment}}&quot;</span>
           <span style="color: #1e90ff">:fixed-points=</span><span style="color: #aa5500">&quot;2&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
<span style="color: #1e90ff; ">&lt;/fa-rating&gt;</span>
</pre></div>

                </div>

                <div class="ui warning message">This Demo <b>does not</b> feature all possible options. Please see below for a list of all the props.</div>

    <h1 class="ui header">Setup</h1>
    <div class="ui divider"></div>
    The fa-rating component can either be included via NPM (recommended) or CDN.

    <h2 class="ui header">NPM</h2>
    <p>Once vue-rate-it has been installed you need to import it into your component along with the icon you want to use. You will then need to register the icon in your view instance to use on the comopnent:</p>

    <div class="ui segment">
        <!-- HTML generated using hilite.me -->
        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #0000aa">import</span> {FaRating} from <span style="color: #aa5500">&#39;vue-rate-it&#39;</span>;
<span style="color: #0000aa">import</span> ThumbsUp from <span style="color: #aa5500">&#39;vue-rate-it/glyphs/thumbs-up&#39;</span>;

<span style="color: #0000aa">export</span> <span style="color: #0000aa">default</span>{
  components:{
    FaRating
  },
  data(){
    return{
      thumbsUp: ThumbsUp // declare the icon
    } 
  } 
}
</pre></div>



    </div>

Then you can use it like:

    <div class="ui segment">
        <!-- HTML generated using hilite.me -->
        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;fa</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff">:glyph=</span><span style="color: #aa5500">&quot;thumbsUp&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff; ">&lt;/fa-rating&gt;</span>
</pre></div>
    </div>

    <div class="ui info message" style="font-size:0.9em;">
        <div class="header">Registering Glyphs</div>
        <p><i class="info circle icon"></i> Font awesome glyphs can be registered using the path 'vue-rate-it/glyphs/{glyph}'. The glyph file names are the same are the font-awesome glyph names excluding the preceeding 'fa'. so to import the start font awesome icon ('fa-star') you would use: <span style="font-family:'courier new'">import Star from 'vue-rate-it/glyphs/star'</span>.</p>
    </div>

    <h2 class="ui header">CDN</h2>
    <p>You may also include the fa-rating component via unpkg by adding the following to your page:</p>

    <div class="ui segment">
        <!-- HTML generated using hilite.me -->
        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;link</span> <span style="color: #1e90ff">rel=</span><span style="color: #aa5500">&quot;stylesheet&quot;</span> <span style="color: #1e90ff">href=</span><span style="color: #aa5500">&quot;https://unpkg.com/vue-rate-it/dist/font-awesome-rating.min.js&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
</pre></div>
    </div>

    <p>It is automatically registered so there is no need to register it yourself. You can access the glyphs by doing <span style="font-family:'courier new'">VueRateit.Glyphs['glyph-name']</span>, where glyph name is the name of the glyph minus the preceeding 'fa': </p>

    <div class="ui segment">
        <!-- HTML generated using hilite.me -->
        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">
<span style="color: #0000aa">new</span> <span style="color: #0000aa">Vue</span>({
  el: '#app',
  created(){
    // register the icon
    this.thumbsUp = VueRateIt.Glyphs['thumbs-up']
  },
  data(){
    return{
      thumbsUp: '' // declare the icon
    } 
  } 
});

</pre></div>
</div>

    <div class="ui error message" style="font-size:0.9em;">
        <div class="header">CDN file size</div>
        <p><i class="info warning circle icon"></i> The CDN for this component is intended for demonstrative purposes only and includes an entire port of font-awesome glyphs, which makes it over 700kB in size! For that reason it is strongly recommended that you do not use the CDN for this component.</p>
    </div>

    <h1 class="ui header">Documentation</h1>
    <div class="ui divider"></div>

    <h2 class="ui header">Props</h2>

    <p>The fa rating component includes the following props:</p>
    <table class="ui celled table">
        <thead>
            <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>glyph</td>
                <td>String</td>
                <td>The name of the font awesome glyph (<b>Requred</b>). This prop accepts the glyph name both with and without the "fa-" prepended, so "thumbs-up" and "fa-thumbs-up" are both acceptable values.</td>
                <td>null</td>
            </tr>
            <tr>
                <td>increment</td>
                <td>Number</td>
                <td>The rating increment. For example pass 0.5 for half glyphs or 0.01 for fluid glyphs. Expects a number between 0.01 - 1.</td>
                <td>1</td>
            </tr>
            <tr>
                <td>rating</td>
                <td>Number</td>
                <td>
                    <p>The initial rating. This will automatically round to the closest increment, so for the most accurate rating pass 0.01 as increment. </p>
                    <div class="ui warning message" style="font-size:0.9em;">
                        In Vue 2.2 and above you can use <b>v-model</b> instead of "rating" to automatically sync values between the parent and child. </div>
                </td>

                <td>0</td>
            </tr>
            <tr>
                <td>max-rating</td>
                <td>Number</td>
                <td>The maximum rating, this lets vue-rate-it know how many glyphs to display.</td>
                <td>5</td>
            </tr>
            <tr>
                <td>inactive-color</td>
                <td>String</td>
                <td>The color of the non-highlighted portion of a glyph.</td>
                <td>#d8d8d8</td>
            </tr>
            <tr>
                <td>active-color</td>
                <td>String</td>
                <td>The color of the highlighted portion of a glyph.</td>
                <td>#000</td>
            </tr>
            <tr>
                <td>item-size</td>
                <td>Number</td>
                <td>The size of each glyph. This gets passed to the SVG width attribute, so larger numbers are larger glyphs.</td>
                <td>50</td>
            </tr>
            <tr>
                <td>show-rating</td>
                <td>Boolean</td>
                <td>Whether or not to show the rating next to the glyphs.</td>
                <td>true</td>
            </tr>
            <tr>
                <td>read-only</td>
                <td>Boolean</td>
                <td>When set to true, the rating cannot be edited. Use in conjuction with increment to define rounding precision.</td>
                <td>false</td>
            </tr>
            <tr>
                <td>text-class</td>
                <td>String</td>
                <td>A css class name to style the rating text for a specific fa-rating component</td>
                <td>""</td>
            </tr>
            <tr>
                <td>fixed-points</td>
                <td>Number</td>
                <td>Specify the number of decimal points to display for the rating. If left blank the number of decimal points will be variable based by the current rating.</td>
                <td>null</td>
            </tr>
            <tr>
                <td>inline</td>
                <td>Boolean</td>
                <td>Sets the fa-rating to display inline.</td>
                <td>false</td>
            </tr>
            <tr>
                <td>border-color</td>
                <td>String</td>
                <td>Sets the colour of the border for each glyph.</td>
                <td>#999</td>
            </tr>
            <tr>
                <td>border-width</td>
                <td>Number</td>
                <td>Sets the width of the border for each glyph.</td>
                <td>2</td>
            </tr>
            <tr>
                <td>spacing</td>
                <td>Number</td>
                <td>Sets the spacing between each glyph. This should be set as an offset, so minus figures move glyphs closer together and plus figures move them further apart.</td>
                <td>0</td>
            </tr>
             <tr>
                <td>rtl</td>
                <td>Boolean</td>
                <td>Pass true to display fa rating using rtl (right-to-left)</td>
                <td>false</td>
            </tr>
        </tbody>
    </table>

    <h3 class="ui header">Props Example</h3>
    <p>The following is an example of a customised fa-rating component:</p>

    <fa-rating :glyph="thumbsUp" :item-size="30" active-color="#ddfbcc" v-model="rating" :increment="0.5"></fa-rating>

    <div class="ui segment">
        <!-- HTML generated using hilite.me -->
        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;fa</span><span style="color: #1e90ff">-rating</span>   <span style="color: #1e90ff">:glyph=</span><span style="color: #aa5500">&quot;thumbs-up&quot;</span> 
             <span style="color: #1e90ff">:item-size=</span><span style="color: #aa5500">&quot;30&quot;</span> 
             <span style="color: #1e90ff">active-color=</span><span style="color: #aa5500">&quot;#ddfbcc&quot;</span>
             <span style="color: #1e90ff">:increment=</span><span style="color: #aa5500">&quot;0.5&quot;</span> 
             <span style="color: #1e90ff">v-model=</span><span style="color: #aa5500">&quot;rating&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span>
<span style="color: #1e90ff; ">&lt;/fa-rating&gt;</span>
</pre></div>
    </div>

    <div class="ui warning message" style="font-size:0.9em;">
        <div class="header">Using v-bind</div>
        <p>Vue requires that you pass Numbers and Boolean values using v-bind or the colon (:) shorthand as seen above.</p>
    </div>

    <h2 class="ui header">Custom Events</h2>
    <p>vue-rate-it emits the following events:</p>

    <table class="ui celled table">
        <thead>
            <tr>
                <th>Event</th>
                <th>Returns</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>rating-selected</td>
                <td>Number</td>
                <td>Returns the rating that the user has selected.</td>
            </tr>
            <tr>
                <td>current-rating</td>
                <td>Number</td>
                <td>Returns the rating the mouse is currently over.</td>
            </tr>
        </tbody>
    </table>
    <div class="ui warning message" style="font-size:0.9em;">
        In Vue 2.2 and above you can use <b>v-model</b> instead of listening for the 'rating-selected' event to automatically sync values between the parent and child. </div>

    <h3 class="ui header">Custom Events Example</h3>
    <p>The following example shows how to use the "rating-selected" custom event to sync values and is the equivelent to using "v-model" which is only available when using Vue 2.2 and above</p>

    <div class="ui segment">
        <!-- HTML generated using hilite.me -->
        <div style="background: #ffffff; overflow:auto;width:auto;;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #1e90ff; font-weight: bold">&lt;fa</span><span style="color: #1e90ff">-rating</span> <span style="color: #1e90ff;">@</span><span style="color: #1e90ff">rating-selected=</span><span style="color: #aa5500">&quot;rating = $event&quot;</span> <span style="color: #1e90ff">:rating=</span><span style="color: #aa5500">&quot;rating&quot;</span><span style="color: #1e90ff; font-weight: bold">&gt;</span><span style="color: #1e90ff;">&lt;/fa-rating&gt;</span>
</pre></div>
    </div>

    <div class="ui warning message" style="font-size:0.9em;">
        When writing methods to capture custom events, the rating param is automatically passed to the method, so you can simply do:
        <br /><span style="font-family:courier;">&lt;fa-rating @rating-selected="myMethod"&gt;&lt;/fa-rating&gt;</span>
        <br /> If you need to declare methods with multiple paramaters you will need to use $event to pass the rating to the method:
        <br /><span style="font-family:courier;">&lt;fa-rating @rating-selected="myMethod($event, anotherParam)"&gt;&lt;/fa-rating&gt;</span></div>
    </div>
</template>

<script type="text/javascript">
import {FaRating} from '../../../../src/index.js';
import Glyphs from '../../../../glyphs';

export default {
    components: {
        FaRating
    },
    created() {
        this.glyphs = Glyphs
        this.thumbsUp = Glyphs['thumbs-up'];
    },
    methods: {
        setIncrement(event) {
            let val = event.target.value;
            this.increment = (isNaN(val) || val === "") ? this.increment : parseFloat(val);
        }
    },
    computed:{
        glyphPath(){
            return this.glyphs[this.selected];
        },
        glyphNames(){
           return Object.keys(Glyphs).map(item => {
                return item;
            });
        }
    },
    watch: {
        selected() {
            // Not elegant, but otherwise would need to change BaseComponent for docs!
            this.fa = "";
            this.$nextTick(() => {
                this.fa = 'fa-rating';
            })
        }
    },
    data() {
        return {
            fa: 'fa-rating',
            inactiveColor: "#cfcfcf",
            activeColor: "#000",
            increment: 0.5,
            spacing: 0,
            glyphs: [],
            selected: 'thumbs-up',
            rating: 3.5,
            thumbsUp: ''
        }
    }
}
</script>
