<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		.fullpage
			.background-pic.common
			section
				.small-view.team.animated.offScreen
					.team-header.offScreen
						h2 {{ tab_title }}
						ul.worker-switch
							li(v-bind:class='{ active: main_roster }' @click="switchRoster")
								button Штатные сотрудники
							li(v-bind:class='{ active: !main_roster }' @click="switchRoster")
								button Внештатные сотрудники
						router-link(to="/raiting").back-button.abs-vert-center.menu-link.active
							span
					.team-content.offScreen(v-if="team_data && Object.keys(team_data).length")
						transition(name='fade')
							.team-container(v-show="main_roster" mode="out-in")
								router-link.team-item(v-for="main_member in team_data.main" :key="main_member.link" :data-img="main_member.img" :to="main_member.link")
									.name {{ main_member.name }}
									.rank {{ main_member.rank }}
						transition(name='fade')
							.team-container(v-show="!main_roster" mode="out-in")
								router-link.team-item(v-for="remote_member in team_data.remote" :key="remote_member.link" :to="remote_member.link")
									.name {{ remote_member.name }}
									.rank {{ remote_member.rank }}
</template>

<script>

	import axios from 'axios'
	export default{
		data(){
			return{
				main_roster: true,
				team_data: '',
				tab_title: 'Штатные сотрудники'
			}
		},
		methods:{
			startAnimate(el, done){
				$('.ui-paginator').hide();
				$('.ui-view-switcher').hide();
				setTimeout(() => {
					console.log('element',$(this.$el).find('.team-content'));
					$(this.$el).find('.small-view').toggleClass('onScreen offScreen');
					$(this.$el).find('.team-header').toggleClass('onScreen offScreen');
					$(this.$el).find('.team-content').toggleClass('onScreen offScreen');
					done();
				},700);
			},
			beforeAnimate(){
				$(this.$el).find('.small-view').removeClass('onScreen');
				$(this.$el).find('.team-header').removeClass('onScreen');
				$(this.$el).find('.team-content').removeClass('onScreen');
			},
			leaveAnimate(el, done){
				if (this.$route.meta.parent){
					$('.ui-paginator').show();
					$('.ui-view-switcher').show();
				}
				setTimeout(() => {$(this.$el).find('.small-view').toggleClass('onScreen offScreen');}, 350)
				$(this.$el).find('.team-header').toggleClass('onScreen offScreen');
				$(this.$el).find('.team-content').toggleClass('onScreen offScreen');
				setTimeout(() => {
					done();
				},700);
			},
			switchRoster(el){
				if (el.target.parentElement.className !== 'active'){
					this.main_roster = !this.main_roster;
					this.tab_title = el.target.parentElement.innerText
				}
			},
			loadImages(){
				let bgImg = [];
				for (let i = 0; i < this.team_data.main.length; i++){
					let last = this.team_data.main[i].img.length - 1;
					var src = this.team_data.main[i].img.slice(4, last);
					bgImg[i] = new Image();
					bgImg[i].src = src;
				}
			}
		},
		created(){
			const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
            	then(response => {
                	this.team_data = response.data;
                	this.loadImages();
            	}).catch(error => {
                	console.log(error);
            	});
		},
		mounted(){
			$(document).on('mouseenter', '.team-container:visible .team-item', function(){
				var img = $(this).data("img");
				setTimeout(function(){
					$('.background-pic.common').css('background-image', img);
					$('.background-pic.common').addClass('active');
				}, 300);
			});

			$(document).on('mouseleave', '.team-container:visible .team-item', function(){
				$('.background-pic.common').removeClass('active');
				setTimeout(function(){
					$('.background-pic.common').css('background-image', 'none');
				}, 300);
			});



		}

	}
</script>

<style lang="scss" scoped>

	.back-button{
		position: absolute;
		right: -15%;
		top: 12.4%;
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
		position: absolute;
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
		opacity: 0;
		background-position: center 0;
		background-size: cover;
		transition: all .3s cubic-bezier(0.215, 0.61, 0.355, 1);
		&.active{
			opacity: 0.55;
		}
	}
	.small-view{
		background-color: transparent;
	}
	.team{
		width: 70%;
		padding: 0px 5px;
		.team-header{
			display: flex;
			align-items: flex-end;
			position: relative;
			margin-top: 5%;
			transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
			.back-button{
				top: auto;
				bottom: 0px;
			}
			&.offScreen{
				opacity: 0;
			}
			&.onScreen{
				opacity: 1;
			}
			h2{
				width: 50%;
				color: #fff;
				font-size: 2.6vw;
				font-weight: 200;
				margin: 0px;
				line-height: 100%;
			}
			.worker-switch{
				width: 50%;
				text-align: right;
				margin: 0px;
				padding: 0px;
				li{
					display: inline-block;
					margin-right: 40px;
					&:last-child{
						margin-right: 0px;
					}
					&.active{
						button{
							opacity: 1;
						}
					}
					button{
						background-color: transparent;
						color: #fff;
						border: none;
						opacity: 0.7;
						transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
					    font-size: 18px;
    					font-weight: 200;
    					cursor: pointer;
    					outline: none;
    					&:hover{
    						opacity: 1;
    					}
					}
				}
			}
		}
		.team-content{
			margin-top: 8%;
			// transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
			&.offScreen{
				opacity: 0;
			}
			&.onScreen{
				opacity: 1;
			}
			.team-container{
				display: flex;
				flex-flow: row wrap;
				position: absolute;
				width: 100%;
			}
			.team-item{
				position: static;
				opacity: 1;
			    transform: translateX(0px);
				width: 25%;
				color: #fff;
				margin-bottom: 6%;
				&:hover{
					&:before{
					    left: -14px;
					}
				}
				&:before{
				    top: 10%;
    				left: -30px;
				}
				.name{
					width: 35%;
					font-weight: 800;
					margin-bottom: 20px;
				}
				.rank{
					width: 35%;
					font-size: 16px;
					opacity: 0.35;
				}
			}
		}
	}

	@media (max-width: 1367px){
		.team .team-content{
			margin-top: 40px;
		}
		.team .team-header{
			margin-top: 2%;
		}
		.team .team-header h2{
			font-size: 3vw;
		}
		.team .team-content .team-item .name {
		    width: 45%;
		    font-size: 18px;
		    font-weight: 800;
		    margin-bottom: 14px;
		}
		.team .team-content .team-item{
			margin-bottom: 4%;
		}
		.team .team-header .worker-switch li{
			margin-right: 20px;
		}
	}

	@media (max-width: 1025px){
		.team .team-header h2{
			font-size: 3.7vw;
			width: 60%;
		}
		.team .team-header .worker-switch{
			width: 40%;
		}
		.team .team-header .worker-switch li button{
			font-size: 16px;
		}
		.team .team-header .worker-switch li{
			margin-right: 0px;
		}
		.team .team-header .worker-switch li:last-child{
			margin-right: 0px;
		}
		.team .team-content{
			margin-top: 50px;
		}
		.team .team-content .team-item{
			margin-bottom: 6%;
		}
	}

	@media (max-width: 888px){
		.team .team-header h2{
			width: 50%;
			font-size: 4vw;
		}
		.team .team-header .worker-switch{
			width: 50%;
		}
		.team .team-content .team-item{
			width: 33%;
			margin-bottom: 10%;
		}
		.team .team-content .team-item .rank{
			width: 70%;
		}

	}

	@media (max-width: 469px){

		.team .team-header{
			flex-flow: row wrap;
			margin-top: 0px;
		}
		.back-button{
			right: 1%;
			z-index: 2;
		}
		.team .team-header .worker-switch li button{
			padding: 0px;
		}
		.team .team-header .worker-switch li{
			width: 55%;
			text-align: left;
			margin-bottom: 5px;
		}
		.team .team-header h2{
			width: 100%;
			margin-bottom: 20px;
			font-size: 8vw;
		}
		.team .team-header .worker-switch{
			width: 100%;
			text-align: left;
			padding: 0px;
		}
		.team{
			width: 95%;
		}
		.team .team-content{
			margin-top: 30px;
			height: 55vh;
    		overflow-y: scroll;
		 	-webkit-overflow-scrolling: auto;
		}
		.team .team-header .worker-switch li button{
			text-align: left;
		}
		.team .team-content .team-item{
			margin-bottom: 20px;
		}
		.team .team-content .team-item .name{
			width: 95%;
			font-size: 16px;
			margin-bottom: 10px;
		}
		.team .team-content .team-item .rank{
			width: 90%;
			font-size: 14px;
		}
		.team .team-header .back-button{
			bottom: 8px;
		}
		.team .team-content.onScreen{
			position: relative;
		}
		/* .team .team-content .team-container{
			position: static;
		} */
	}
	@media (max-width: 321px){
		.team .team-header .worker-switch li{
			margin-right: 10px;
		}
		.team .team-content .team-item{
			margin-bottom: 4%;
		}
		.team .team-header h2{
			margin-bottom: 15px;
		}
		.team .team-content{
			margin-top: 15px;
		}
	}

</style>