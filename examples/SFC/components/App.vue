<template>
	<div>
		<fa-rating :glyph="star"></fa-rating>
	</div>
</template>

<script type="text/javascript">
import VueRateIt from '../src/index.js'
import Star from '../glyphs/star'

export default{
  components:{
  	'fa-rating': VueRateIt.FaRating
  },
  created(){
  	this.star = Star;
  },
  data(){
  	return{
  		star: ''
  	}
  }
}

</script>