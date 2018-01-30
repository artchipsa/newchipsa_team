<template lang="pug">
	transition(name="fade")
		.preloader(v-show="loadedOnce")
			.img-block
				img(src="src/assets/svg/chipsa_emblem.svg")
				.overlay-block
	
</template>

<script>

export default{
	name: 'preloader',
	data() {
		return{
			loadedOnce: true
		}
	},
	methods:{
		logoAnimation: function(){
			var self = this;
			$(this.$el).find('.overlay-block').animate({'width': '0%'}, 1000, function(){
				self.loadedOnce = false;
			});
		}
	},
	mounted() {
		this.logoAnimation();
	}
}

</script>

<style lang="scss">
	
	.preloader{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		background-color: #000;
		z-index: 15;
		.img-block{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			.overlay-block{
				background-color: #000;
				position: absolute;
				right: 0px;
				top:0px;
				width: 100%;
				height: 100%;
			}
		}
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to{
	  opacity: 0;
	}
</style>