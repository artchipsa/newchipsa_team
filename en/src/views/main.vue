<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		section
			transition(name="modal")
				.modal-video(v-show="reelOpen")
					a(href="#" class="close-reel menu-link abs-vert-center active")
						span
					div#player
						iframe.ytplayer(id="ytplayer" type="text/html" width="100%" height="100%"
						src="https://www.youtube.com/embed/TehxguHmXsY?enablejsapi=1"
						frameborder="0" allowfullscreen)
			.small-view.animated.offScreen
				h1.offScreen We'll show you<br>in a new light
				p.offScreen We create websites with stuning animations and awesome graphics (photo, video, illustrations, 3D)
				a.desktop-showreel(href="#").offScreen Showreel
				a.mobile-showreel(href="https://www.youtube.com/watch?v=TehxguHmXsY", target="_blank").offScreen Showreel
</template>

<script>
	export default{
		name: 'small-view',
		data(){
			return{
				reelOpen: false,
				player: ''
			}
		},
		methods:{
			startAnimate(el, done){
				setTimeout(() => {
					$(this.$el).find('.small-view').toggleClass('onScreen offScreen');
					$(this.$el).find('h1').toggleClass('onScreen offScreen');
					$(this.$el).find('p').toggleClass('onScreen offScreen');
					$(this.$el).find('a').toggleClass('onScreen offScreen');
					done();
				}, 700);
			},
			beforeAnimate(){
				$(this.$el).find('.small-view').removeClass('onScreen');
				$(this.$el).find('h1').removeClass('onScreen');
				$(this.$el).find('p').removeClass('onScreen');
				$(this.$el).find('a').removeClass('onScreen');
			},
			leaveAnimate(el, done){
				setTimeout(() => {$(this.$el).find('.small-view').toggleClass('onScreen offScreen');}, 350)
				$(this.$el).find('h1').toggleClass('onScreen offScreen');
				$(this.$el).find('p').toggleClass('onScreen offScreen');
				$(this.$el).find('a').toggleClass('onScreen offScreen');
				setTimeout(() => {
					done();
				},700);
			},
			showvideo(e){
				e.preventDefault();
				this.reelOpen = !this.reelOpen;
				// if (this.reelOpen){
				// 	playVideo();
				// } else {
				// 	stopVideo();
				// }
			}
		},
		created(){
		},
		mounted(){
			var self = this;
			var yt_int, yt_players={},
		    	initYT = function() {
			        $(".ytplayer").each(function() {
			            yt_players[this.id] = new YT.Player(this.id);
			        });
			    };

			$.getScript("//www.youtube.com/player_api", function() {
			    yt_int = setInterval(function(){
			        if(typeof YT === "object"){
			            initYT();
			            clearInterval(yt_int);
			        }
			    },500);
			});

			$('.desktop-showreel').on('click', function(){
				console.log(1);
				self.reelOpen = !self.reelOpen;
				yt_players['ytplayer'].playVideo();
			});

			$('.close-reel').on('click', function(){
				self.reelOpen = !self.reelOpen;
				yt_players['ytplayer'].stopVideo();
			});
		}
	}
</script>

<style lang="scss">
	
	.desktop-showreel{
		display: block;
	}
	.mobile-showreel{
		display: none;
	}
	
	#player{
		height: 100%;
	}
	.modal-video{
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 4;
		width: 100vw;
		height: 100vh;
		background-color: #000;
	}
	.modal-video .menu-link{
		top: 6%;
	}
	
	.modal-enter-active, .modal-leave-active{
		transition: all .25s ease-in-out;
	}
	.modal-enter, .modal-leave-to{
		transform: translate3d(0,-100%,0);
	}

	.small-view{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 82%;
		height: 0%;
		opacity: 0;
		background-color: rgba(#000, 0.5);
		transition: all .55s;
		&.onScreen{
			height: 76%;
			opacity: 1;
		}
		&.offScreen{
			height: 0%;
		}
		h1 {
			position: absolute;
			top: 10%;
			left: 8%;
			margin: 0px;
			color: #fff;
			font-weight: 400;
			font-size: 52px;
			font-weight: 200;
			transform: translateX(-25px);
			opacity: 0;
			transition: all .45s;
			&.onScreen{
				transform: translateX(0px);
				opacity: 1;
				transition: all .45s .55s;
			}
		}
		p{
			position: absolute;
			bottom: 10%;
			left: 58%;
			margin: 0px;
			color: #fff;
			font-size: 18px;
			line-height: 175%;
			font-weight: 400;
			width: 270px;
			transform: translateX(-25px);
			opacity: 0;
			transition: all .45s;
			&.onScreen{
				transform: translateX(0px);
				opacity: 1;
				transition: all .45s .55s;
			}
		}
		a{
			position: absolute;
			bottom: 10%;
			left: 8%;
			font-size: 20px;
			color: #fff;
			text-decoration: none;
			cursor: pointer;
			transform: translateX(-25px);
			opacity: 0;
			transition: all .45s;
			&.onScreen{
				transform: translateX(0px);
				opacity: 1;
				transition: all .45s .55s;
			}
		}
	}

	@media (max-width: 1025px){
		.main-container{
			height: 100%;
		}
		header .nav-block ul li{
			margin-right: 30px;
		}
		.small-view p{
			bottom: 9%;
		}
	}
	
	@media (max-width: 769px){
		.small-view p {
			width: 220px;
			left: 55%;
		}
	}

	@media (max-width: 700px){
		.small-view h1{
	        top: 4%;
	        left: 10%;
	        font-size: 8vw;
	    }
	    .small-view p{
	        bottom: 6%;
	        left: 8%;
	        line-height: 141%;
   	 		font-size: 4.7vw;
   	 		width: 85%;
	    }
	    .small-view a {
	    	bottom: 50%;
	    }
	   	.desktop-showreel{
			display: none;
		}
		.mobile-showreel{
			display: block;
		}
	}

</style>