<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		.fullpage(v-if="member_data && Object.keys(member_data).length")
			.background-pic.offScreen(:style="{backgroundImage: member_data.img}")
				.overlay
			section
				.small-view.team.animated.offScreen
					router-link(to="/team").back-button.abs-vert-center.menu-link.active
						span
					.member-info
						.half
							.personal
								.name {{member_data.name}}
								.rank {{member_data.rank}}
							.quote {{member_data.descr}}
							.member-awards
								.award(v-for="award in member_data.awards")
									img(:src="award.img")
									span {{award.award_text}}
						.half
							ul.skills
								li(v-for="skill in member_data.skills") {{skill}}
							a.email(:href="setEmail") {{member_data.email}}
</template>

<script>

	import axios from 'axios'

	export default{
		data(){
			return{
				member_data: '',
				email_link: ''
			}
		},
		computed:{
			setEmail(){
				this.email_link = "mailto:"+this.member_data.email;
				return this.email_link
			}
		},
		methods:{
			startAnimate(el, done){
				$('.ui-paginator').hide();
				$('.ui-view-switcher').hide();
				setTimeout(() => {
					$(this.$el).find('.small-view').toggleClass('onScreen offScreen');
					$(this.$el).find('.background-pic').toggleClass('onScreen offScreen');
					done();
				}, 125);
			},
			beforeAnimate(){
				$(this.$el).find('.small-view').removeClass('onScreen');
				$(this.$el).find('.background-pic').removeClass('onScreen');
			},
			leaveAnimate(el, done){
				$('.ui-paginator').show();
				$('.ui-view-switcher').show();

				setTimeout(() => {$(this.$el).find('.small-view').toggleClass('onScreen offScreen');}, 350)
				$(this.$el).find('.background-pic').toggleClass('onScreen offScreen');

				setTimeout(() => {
					done();
				}, 700);
			},
		},

		created(){
			const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
            	then(response => {
                	this.member_data = response.data;
                	console.log(this.member_data);
            	}).catch(error => {
                	console.log(error);
            	});
		}

	}
</script>

<style lang="scss" scoped>
	.back-button{
		position: absolute;
		right: -5%;
		top: 6.5%;
		left: auto;
		opacity: 1;
		transition: all .35s;
		transform: translate(0px, 0px);
		transform-origin: center;
		&:hover{
			transform: rotate(90deg) translate(0px, 0px);
		}
	}
	.fullpage{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #000;
	}
	section{
		position: relative;
		z-index: 1;
		height: 100%;
		width: 100%;
		background-color: transparent;
	}
	.background-pic{
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 1;
		transition: all .99s cubic-bezier(0.215, 0.61, 0.355, 1);
		background-position: center 0;
		background-size: cover;
		.overlay{
			width: 100%;
			height: 100%;
			top: 0px;
			left: 0px;
			background-color: rgba(0,0,0,.55);
			display: none;
		}
		&.offScreen{
			transform: scale(1);
		}
		&.onScreen{
			transform: scale(1.11);
		}
	}
	.ui-paginator{
		display: none!important;
	}
	.small-view{
		background-color: transparent;
		transition: all .55s cubic-bezier(0.215, 0.61, 0.355, 1);
		&.onScreen{
			opacity: 1;
		}
		&.offScreen{
			height: 0;
		}
	}
	.member-info{
		width: 84%;
		height: 84%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		.half{
			width: 25%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #fff;
			&:last-child{
				width: 20%;
			}
			.personal{
				.name{
					font-size: 2.6vw;
					font-weight: 200;
					margin-bottom: 40px;
				}
				.rank{
					font-size: 18px;
					opacity: 0.35;
				}
			}
			.quote{
				width: 80%;
				line-height: 150%;
			}
			.award{
				margin-bottom: 30px;
				&:last-child{
					margin-bottom: 0px;
				}
				img{
					display: inline-block;
					width: 10%;
					margin-right: 5%;
					vertical-align: middle;
				}
				span{
					font-size: 14px;
					color: #fff;
					opacity: 0.45;
					width: 55%;
					display: inline-block;
					vertical-align: middle;
				}
			}
			.skills{
				padding: 0px;
				list-style: none;
				li{
					margin-bottom: 12px;
					font-size: 16px;
				}
			}
			.email{
				font-size: 18px;
				color: #fff;
				opacity: 0.45;
				position: static;
				transform: translateX(0px);
			}
		}
	}
	
	.member-info .half .skills{
		margin: 0px;
	}

	@media (max-width: 1367px){
		.member-info .half .skills{
			font-size: 16px;
		}
		.member-info .half .quote {
			font-size: 14px;
		}
	}

	@media (max-width: 1025px){
		.member-info{
			width: 95%;
		}
		.member-info .half .email{
			opacity: 1;
		}
		.member-info .half .award span{
			opacity: 0.75;
		}
		.member-info .half .personal .name{
			margin-bottom: 25px;
		}
		.background-pic{
		    background-position: 40% 0;
		}
		.background-pic.onScreen{
			transform: scale(1.05);
		}
		.member-info .half .award span{
			width: 66%;
			vertical-align: top;
		}
		.background-pic .overlay{
			background-color: rgba(0,0,0,.25);	
			display: block;
		}
		.member-info .half .award img{
			vertical-align: top;
		}
	}

	@media (max-width: 768px){
		.member-awards{
			display: none;
		}
		.member-info{
			flex-flow: column;
			justify-content: space-around;
		}
		.member-info .half{
			width: 50%;
			height: 40%;
			margin-bottom: 20%;
		}
		.member-info .half:last-child{
			margin-bottom: 0px;
			width: 50%;
		}
		.member-info{
			height: 100%;
		}
		.member-info .half .personal .name{
			font-size: 5.6vw;
		}
		.member-info .half .skills{
			font-size: 20px;
		}

		.member-info .half .quote {
			font-size: 14px;
 		}
		.member-info .half .email{
			font-size: 20px;
		}
		.background-pic .overlay{
			background-color: rgba(0,0,0,.35);	
		}

	}

	@media (max-width: 700px){
		.background-pic.onScreen{
			transition: scale(1) 1s linear;
		}
		
		.background-pic{
			background-position: 30% 0;
		}
		.member-info .half .personal{
			margin-bottom: 25px;
		}
		.member-info .half .personal .name{
			font-size: 8vw;
			margin-bottom: 10px;
		}
		.member-info .half .personal .rank{
			font-size: 15px;
		}
		.member-info .half{
			width: 75%;
			height: 46%;
			margin-bottom: 0px;
		}
		.member-info .half:last-child{
			margin-bottom: 0px;
			width: 50%;
			height: 30%;
		}
		.member-info .half .quote{
			font-size: 14px;
			line-height: 150%;
			width: 90%;
		}
		.member-info .half .skills li{
			font-size: 14px;
			margin-bottom: 5px;
		}
		.back-button{
			z-index: 2;
		}
	}

</style>