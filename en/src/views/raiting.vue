<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		section.raiting-view
			.col.off
				.name.off Ranked<br>by Tagline #[span since 2009]
				router-link.name.off(to="/team") Team	
			.col.off
				.content.off
					.line
					.place-number 2
					.place-text place
					.location in Krasnoyarsk
			.col.off
				.content.off
					.line
					.place-number 20
					.place-text place
					.location in Siberia
			.col.off
				.content.off
					.line
					.place-number 51
					.place-text place
					.location in Russia
</template>

<script>
	export default{
		name: 'raiting-view',
		data(){
			return{

			}
		},
		methods:{
			startAnimate(el, done){
				setTimeout(() => {
					$(this.$el).find('.col').each(function(){
						let self = $(this);
						let delay = 100;
						delay = delay * (self.index() + 1);
						setTimeout(function(){
							self.toggleClass('in off');
						}, delay);
					});
					$(this.$el).find('.content').toggleClass('in off');
					$(this.$el).find('.name').toggleClass('in off');
					done();
				}, 700)
			},
			beforeAnimate(){
				$(this.$el).find('.col').removeClass('in')
				$(this.$el).find('.content').removeClass('in');
				$(this.$el).find('.name').removeClass('in');
			},
			leaveAnimate(el, done){
				setTimeout(() => {
					$(this.$el).find('.col').each(function(){
						let self = $(this);
						let delay = 50;
						delay = delay * (self.index() + 1);
						setTimeout(function(){
							self.toggleClass('in off');
						}, delay);
					});
				}, 350)
				$(this.$el).find('.content').toggleClass('in off');
				$(this.$el).find('.name').toggleClass('in off');
				setTimeout(() => {
					done();
				},800);
			}
		}
	}
</script>

<style lang="scss">
	
	.raiting-view{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 82%;
		height: 76%;
		transition: all .55s cubic-bezier(0.215, 0.61, 0.355, 1);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.col{
			width: 25%;
			height: 0%;
			position: absolute;
			bottom: 0px;
			transition: all .35s;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			&:nth-child(1){
				left: 0%;
			}
			&:nth-child(2){
				left: 25%;
			}
			&:nth-child(3){
				left: 50%;
			}
			&:nth-child(4){
				left: 75%;
			}
			&.in{
				height: 100%;
				top: 0px;
				bottom: auto;
			}
			&.off{
				height: 0%;
				top: auto;
				bottom: 0px
			}
			.content{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-100%,-50%);
				display: flex;
				height: 65%;
				justify-content: space-between;
				flex-direction: column;
				align-items: center;
				opacity: 0;
				transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
				&.in{
					opacity: 1;
					transform: translate(-50%,-50%);
					transition: all .35s .82s cubic-bezier(0.215, 0.61, 0.355, 1);
				}
				&.off{
					opacity: 0;
					transform: translate(-100%,-50%);
					transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
				}
				.line{
					width: 70px;
					height: 2px;
					background-color: #fff;
					margin-bottom: 10%;
					display: inline-block;
				}
				.place-number{
					font-size: 160px;
					color: #fff;
					display: inline-block;
					font-weight: 400;
					margin-bottom: 5%;
				}
				.place-text{
					font-size: 20px;
					color: rgba(#fff, 0.5);
					transform: rotate(-90deg);
				}
				.location{
					margin-top: 10%;
					font-size: 18px;
					color: #fff;
				}
			}
			&:first-child{
				background-color: #000;
				.name{
					position: absolute;
					top: 15%;
					left: 21%;
					color: #fff;
					font-size: 26px;
					line-height: 150%;
					opacity: 0;
					transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
					span{
						display: block;
						margin-top: 40px;
					    text-decoration: none;
   						line-height: 150%;
    					font-size: 15px;
    					opacity: 0.35;
					}
					&:nth-child(2){
						bottom: 16.5%;
						top: auto;
						font-size: 18px;
						text-decoration: none;
					}
					&.in{
						opacity: 1;
						left: 32%;
						transition: all .35s .55s cubic-bezier(0.215, 0.61, 0.355, 1);

					}
					&.off{
						opacity: 0;
						left: 21%;
						transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
					}
				}
			}
			&:nth-child(2){
				background-color: rgba(#000, 0.6);
			}
			&:nth-child(3){
				background-color: rgba(#000, 0.5);
			}
			&:nth-child(4){
				background-color: rgba(#000, 0.4);
			}
		}
	}

	@media (max-width: 1025px){

		.raiting-view .col:first-child .name.in{
			left: 33%;
		}
		.raiting-view .col:first-child .name{
			font-size: 22px;
		}
		.raiting-view .col .content .place-number{
			font-size: 120px;
		}
		.raiting-view .col .content{
			width: 60%;
		}

	}

	@media (max-width: 769px){
		.raiting-view .col:first-child .name.in{
			left: 10%;
		}
		.raiting-view .col{
			width: 100%;
			&:nth-child(1){
				left: 0%;
			}
			&:nth-child(2){
				left: 0%;
				top: 25%;
			}
			&:nth-child(3){
				left: 0%;
				top: 50%;
			}
			&:nth-child(4){
				left: 0%;
				top: 75%;
			}
			&.in{
				height: 25%;
			}
		}
		.raiting-view .col .content{
			height: 100%;
			flex-direction: row;
			width: 80%;
			&.in{
				opacity: 1;
				transform: translate(-50%,-50%);
				transition: all .35s .82s;
			}
			&.off{
				opacity: 0;
				transform: translate(-70%,-50%);
				transition: all .35s;
			}
		}
		.raiting-view .col .content .line{
			margin-bottom: 0px;
		}
		.raiting-view .col .content .location{
			margin-top: 0px;
			width: 23%;
			text-align: right;
		}
		.raiting-view .col .content .place-number{
			line-height: 100%;
			margin-bottom: 0px;
			width: 20%;
		}
		 .raiting-view .col:first-child .name:nth-child(2){
	    	left: auto!important;
	    	bottom: auto!important;
	    	right: 10%;
	    	top: 40%!important;
	    	font-size: 15px;
	    }
	    .raiting-view .col:first-child .name {
	    	top: 20%;
 	    }
 	    .raiting-view .col:first-child .name span{
 			display: none;
  	    }
	}

	@media (max-width: 469px){
		.raiting-view .col:first-child .name.in{
			left: 10%;
		}
		.raiting-view .col .content .line{
			display: none!important;
		}
		.raiting-view .col .content .place-number{
			font-size: 70px;
		}
		.raiting-view .col .content .place-text{
			font-size: 16px;
		}
		.raiting-view .col .content .place-number{
			width: 30%;
		}
		.raiting-view .col .content .location{
			width: 37%;
			text-align: right;
			font-size: 14px;
		}
		.raiting-view .col:first-child .name{
			font-size: 19px;
			top: 27%;
			line-height: 132%;
		}
		.raiting-view .col:first-child .name:nth-child(2){
			top: 30%!important;
		}
		.raiting-view .col:first-child .name span{
			margin-top: 10px;
			display: none;
		}
	}
</style>