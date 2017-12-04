<template lang="pug">
	.menulist
		.list-container(v-show="show")
			//- v-touch(v-on:pan="move($event)")
			ul(@mousemove="move($event)" v-bind:style="{ marginTop: top + 'px'}")
				li(v-for="(link, index) in links" @click="showWorks" v-bind:data-index="index")
					<a v-bind:href="link.url" v-if="link.name == 'Блог'" target="_blank">{{ link.name }}</a>
					<a v-bind:href="link.url" v-else>{{ link.name }}</a>
		transition(name="works")
			.works-container(v-show="worksIn")
				ul
					li(v-for="(work, index) in works")
						<a v-bind:href="work.url" target="_blank">{{ work.name }}</a>
		.mobile-social
			ul
				li(v-for="social in socials")
					a(v-bind:href="social.url", target="_blank")
						i.fa(v-bind:class="social.icon")
		a(href="http://agima.partners", target="_blank").agima-mobile
			img(src="src/assets/agima_label.svg")



</template>

<script>
	export default{
		name: 'menulist',
		props: ['show'],
		data(){
			return{
				links:[
					{
						name: 'О нас',
						url: '#/raiting'
					},
					{
						name: 'Работы',
						url: '#/works'
					},
					{
						name: 'Команда',
						url: '#/team'
					},
					{
						name: 'Контакты',
						url: '#/contacts'
					}
				],
				works:[
					{
						name: 'Частная лавочка',
						url: 'https://www.behance.net/gallery/56018341/Private-shop-web'
					},
					{
						name: 'TEXX',
						url: 'https://www.behance.net/gallery/55437297/Texx-web'
					},
					{
						name: 'Furnita',
						url: 'https://www.behance.net/gallery/54218875/furnita-web'
					},
					{
						name: 'Баланс',
						url: 'https://www.behance.net/gallery/50503185/Balance-web'
					},
					{
						name: 'Авакс',
						url: 'https://www.behance.net/gallery/54385533/Avaks-logo-web-cgi'
					},
					{
						name: 'MDIS',
						url: 'https://mdis.ru'
					},
					{
						name: 'Бинар',
						url: 'https://www.behance.net/gallery/51493201/Binar-branding-web'
					},
					{
						name: 'СГК',
						url: 'https://www.behance.net/gallery/43335773/Siberian-Generating-Company-web'
					}
				],
				socials:[
					{
						icon: 'fa-facebook',
						url: 'http://facebook.com/chipsadesign'
					},
					{
						icon: 'fa-vk',
						url: 'https://vk.com/chipsadesign'
					},
					{
						icon: 'fa-instagram',
						url: 'https://www.instagram.com/chipsadesign/'
					},
					{
						icon: 'fa-dribbble',
						url: 'https://dribbble.com/chipsadesign'
					},	
					{
						icon: 'fa-behance',
						url: 'https://www.behance.net/chipsadesign'
					}
				],
				container_height: '',
				list_height: '',
				top: '',
				worksIn: false
			}
		},
		methods:{
			move(event){
				if ($(window).height() < $('.list-container ul').height()){
					let y = event.clientY;
					let touch_y;
					let uh = this.list_height;
					let wh = this.container_height;
					let rest_h = uh - wh;
					let percent_y;
					if ($(window).width() < 1030){
						touch_y = event.srcEvent.clientY;
						// touch_y = event.deltaY+220;
						percent_y = (touch_y*100)/wh;
					} else {
						percent_y = (y*100)/wh;
					}

					let top = (((rest_h*percent_y)/100) * -1) + 50;
					this.top = top;

				}
			},
			touch_move(event){
			},
			listAppear(){
				// Пишу на JQ так как не совсем понимаю работу Vue с дом и вообще анимацией в целом
				$(this.$el).find('li').each(function(){
					let self = $(this);
					let delay = 100;
					delay = delay * (self.data('index') + 1);
					setTimeout(function(){
						self.addClass('in');
					}, delay);
				})
			},
			listLeave(){
				$(this.$el).find('li').each(function(){
					$(this).removeClass('in');
				});
			},
			showWorks(event){
				if (event.currentTarget.dataset.index == 1){
					event.preventDefault();
					this.worksIn = !this.worksIn;
					event.currentTarget.classList.toggle('active');
					if($(window).width() < 700){
						$('.list-container').toggleClass('mobile-anim')
					}
				}
			}
		},
		mounted(){
		},
		updated(){
			// стараюсь использовать больше Vanilla JS, чтобы отучить себя от JQ
			setTimeout(() => {
				this.container_height = document.querySelector('.list-container').offsetHeight;
				this.list_height = document.querySelector('.list-container ul').offsetHeight;
			}, 100);

			if (this.show){
				setTimeout(() => { this.listAppear();}, 100);
			} else {
				this.listLeave();
				$('.list-container li').removeClass('active');
				this.worksIn = false;
			}
		}
	}
</script>

<style lang="scss">
	.menu-modal{
		z-index: 2;
	}
	.mobile-social{
		display: none;
	}
	.menulist{
		position: absolute;
		width: 70%;
		left: 50%;
		transform: translateX(-50%);
	}
	.list-container{
		height: 100vh;
		width: 60%;
		overflow: hidden;
		-webkit-transition: all .75s;
		-o-transition: all .75s;
		transition: all .75s;
		&.mobile-anim{
		    transform: translateX(-18%);
		} 
		ul{
			list-style: none;
			padding: 22% 0px;
			li{
				margin-bottom: 195px;
				opacity: 0;
				transform: translateX(-10%);
				transition: all .35s ease-in-out;
				&.in{
					opacity: 1;
					transform: translateX(0%);
				}
				&.active{
					a{
						opacity: 1;
					}
				}
				a{
					color: #fff;
					// font-size: 180px;
					font-size: 8.55vw;
					font-weight: 200;
					text-decoration: none;
					opacity: 0.5;
					transition: all .35s;
					&:hover, &.active{
						opacity: 1;
					}

				}
			}
		}
	}
	.works-enter-active, .works-leave-active {
	  transition: all .35s; 
	}
	.works-enter, .works-leave-to  {
	  opacity: 0;
	  transform: translate3d(0,-100%,0);
	}
	.works-container{
		position: absolute;
		width: auto;
		top: 40%;
		left: 70%;
		transform: translateY(-50%);
		ul{
			margin: 0px;
			padding: 0px;
			li{
				margin-bottom: 20px;
				a{
					color: #fff;
					font-size: 22px;
					text-decoration: none;
				}
			}
		}
	}
	.agima-mobile{
		display: none;
	}
	@media (max-width: 1025px){
		.list-container ul li{
			margin-bottom: 100px;
		}
		.list-container ul li a{
			line-height: 100%;
			font-size: 105px;
		}
		.list-container{
			overflow-y: scroll;
		}
	}
	
	@media (max-width: 769px){
		.list-container ul li a{
			font-size: 75px;
		}
		.list-container ul{
			padding: 45% 0px;
		}
		
	}

	@media (max-width: 469px){
		.agima-mobile{
			display: block;
			position: absolute;
			bottom: 3%;
			right: 3%;
			img{
				width: 100px;
			}
		}
		.menulist{
			width: 100%;
			left: auto;
			transform: none;
			padding: 0px 8%;
		}
		.list-container{
			width: 100%;
			height: 100%;
		}
		.list-container ul li a{
		    font-size: 50px;
		    line-height: 90%;
		}
		.list-container ul li{
			margin-bottom: 38px;
		}
		.mobile-social{
			display: block;
		    position: absolute;
		    bottom: 15%;
		    left: 50%;
		    -webkit-transform: translateX(-50%);
		    -ms-transform: translateX(-50%);
		    -o-transform: translateX(-50%);
		    transform: translateX(-50%);
		    ul{
		    	padding: 0px;
		    	margin: 0px;
		    	list-style: none;
		    	li{
		    		float:left;
		    		margin-right: 20px;
		    		&:last-child{
		    			margin-right: 0px;
		    		}
		    		a{
		    			color: #fff;
		    		}
		    	}
		    }
		}
		.list-container ul{
			padding: 35% 0px;
		}
		.menulist{
			height: 100%;
		}
		.mobile-social {
		    bottom: 14%;
		}
		.works-container {
			margin-top: 30px;
			margin-bottom: 30px;
			overflow-y: auto;
			height: 65%;
		}
	}
	
	@media (max-width: 321px){
		.mobile-social ul li{
			margin-right: 18px;
		}
		.mobile-social {
		    bottom: 12%;
		}
		.list-container.mobile-anim{
			transform: translateX(-20%);
		}
		.list-container ul li {
		    margin-bottom: 30px;
		}
		.works-container{
			left: 65%;
		}
		.list-container ul li a{
			font-size: 52px;
		}
		.list-container ul{
			margin: 0px;
		}
	}

</style>