<template lang="pug">
	.main-container
		transition(name="modal")
			.menu-modal(v-show="menuOpen")
				transition(name="menulist")
					menulist(v-bind:show="menuOpen" v-show="menuOpen")
		transition(name="modal")
			.menu-modal(v-show="orderOpen")
				order
		header
			a.logo.abs-vert-center(href="#/")
				img(src="src/assets/svg/ChipsaLogo.svg" alt="")
			.nav-block.abs-vert-center(v-bind:class="{ hide: menuOpen || orderOpen}")
				ul
					li
						a(href="#/contacts") Контакты
					//- li
					//- 	a(href="http://blog.chipsa.ru/", target="_blank") Блог
					li
						a(href="http://blog.chipsa.ru/presentation/CHIPSA_Presentation.pdf", target="_blank") PDF
			a.menu-link.abs-vert-center(href="#" @click="menu" v-bind:class="{ active: menuOpen, orderActive: orderOpen}")
				span
			a(href="http://agima.partners", target="_blank").agima.abs-vert-center
				img(src="src/assets/agima_label.svg")
			a.order-link.abs-vert-center(href="#" @click="order" v-bind:class="{hide:orderOpen}") Отправить заявку
		.page-title.abs-vert-center 
			span {{ title }}
		footer
			img(src="src/assets/svg/chipsa_emblem.svg").abs-vert-center
			.ui-facebook
				div(class="fb-like" data-href="https://www.facebook.com/ChipsaDesign/" data-layout="button_count" data-action="like" data-size="large" data-show-faces="false" data-share="false")
			.ui-language.abs-vert-center
				ul
					li.active
						a(href="") Ru
					li
						a(href="/en/") En
			ul.socials.abs-vert-center
				li(v-for="(social, index) in socials" v-if="social.show")
					a(v-bind:href="social.url", target="_blank", v-bind:data-index="index") {{social.name}}
		
		.ui-view-switcher(v-bind:class="{ hide: menuOpen || orderOpen}")
			a.prev(v-bind:href="back" @click="lineAnimation" @mouseover="dotTop" @mouseleave="dotMiddle")
				img(src="src/assets/svg/up.svg")
			.dot(v-bind:class="dotClass")
			a.next(v-bind:href="next" @click="lineAnimation" @mouseover="dotDown" @mouseleave="dotMiddle")
				img(src="src/assets/svg/down.svg")
		.ui-paginator(v-bind:class="{ hide: menuOpen || orderOpen}")
			.last {{ last }}
			.line(v-bind:class="{ toBottom: update }")
			.current {{ current }}

		.divvideo
			video(src="src/assets/ChipsaBack.mov" autoplay loop muted poster="src/assets/first_frame.jpg")
		v-touch.fillheight(v-on:pan="touch_move" ref="tapper")
			router-view

</template>

<script>
	import menulist from './menulist.vue';
	import order from './order.vue';

	export default{
		data(){
			return{
				menuOpen: false,
				orderOpen: false,
				showreelOpen: false,
				title: 'Главная',
				socials:[
					{
						name: 'behance',
						url: 'https://www.behance.net/chipsadesign',
						show: true
					},
					{
						name: 'dribbble',
						url: 'https://dribbble.com/chipsadesign',
						show: true
					},
					{
						name: 'facebook',
						url: 'http://facebook.com/chipsadesign',
						show: false
					},
					{
						name: 'vkontakte',
						url: 'https://vk.com/chipsadesign',
						show: false
					},
					{
						name: 'instagram',
						url: 'https://www.instagram.com/chipsadesign/',
						show: false
					}
				],
				views:[
					{
						url: '#/',
						title: 'Главная'
					},
					{
						url: '#/raiting',
						title: 'Рейтинг'
					},
					{
						url: '#/works',
						title: 'Лучшие работы'
					},
					{
						url: '#/contacts',
						title: 'Контакты'
					}
				],
				titles:[
					{
						title: 'Главная'
					},
					{
						title: 'Рейтинг'
					},
					{
						title: 'Лучшие работы'
					},
					{
						title: 'Контакты'
					}
				],
				dotClass:{
					top: false,
					middle: true,
					bottom: false
				},
				next: '',
				back: '',
				current: '',
				last: '',
				update: false,
				scroll: true,
				lastAnimationTouch: 0
			}
		},
		methods: {
			menu(e){
				e.preventDefault();
				if(this.orderOpen){
					this.orderOpen = !this.orderOpen;
					this.scroll = !this.scroll;
					$('.page-title span').text(this.title);
				} else {
					this.menuOpen = !this.menuOpen;
					this.scroll = !this.scroll;
					let prevTitle = this.title;
					if (this.menuOpen){
						$('.page-title span').text('Меню');
					} else {
						$('.page-title span').text(this.title);
						$('.list-container').removeClass('mobile-anim')
					}
				}
			}, 
			order(e){
				e.preventDefault();
				this.orderOpen = !this.orderOpen;
				this.scroll = !this.scroll;
				$('.page-title span').text('Заявка');

			},
			dotTop(){
				this.dotClass.top = true;
				this.dotClass.middle = false;
				this.dotClass.bottom = false;
			},
			dotDown(){
				this.dotClass.top = false;
				this.dotClass.middle = false;
				this.dotClass.bottom = true;
			},
			dotMiddle(){
				this.dotClass.top = false;
				this.dotClass.middle = true;
				this.dotClass.bottom = false;
			},
			locationSetup(){
				if (this.$route.meta.parent){
					let current = window.location.hash;
					let index; 
					if (current != '#/404'){				
						for(let i = 0; i < this.views.length; i++){
							if (this.views[i].url == current){
								index = i;
							}
						}

						this.current = '0'+(index+1);
						this.last = '0'+this.views.length;
						// this.title = this.views[index].title;


						if (index == 0){
							// this.back = this.views[this.views.length - 1].url;
							this.next = this.views[index + 1].url;
							$('.prev').fadeOut(300);
							$('.next').fadeIn(300);
						} else if(index == this.views.length - 1){
							this.back = this.views[index - 1].url;
							// this.next = this.views[0].url;
							$('.next').fadeOut(300);
							$('.prev').fadeIn(300);
						} else {
							this.back = this.views[index - 1].url;
							this.next = this.views[index + 1].url;
							if ($(window).width() < 700){
								$('.next').fadeIn(300, function(){
									$('.prev').fadeOut(300);
								});
							} else {
								$('.prev').fadeIn(300);
								$('.next').fadeIn(300);
							}
						}
					}
				}
			},
			disablePan(){
				if (!this.$route.meta.parent){
					this.$refs.tapper.disable('pan');
				} else {
					this.$refs.tapper.enable('pan');
				}
			},
			lineAnimation(){
				this.update = true;
				setTimeout(() => {$('.page-title span').text(this.$route.meta.title);}, 100);
				setTimeout(() => {this.update = false}, 700);
			},
			video(){

				$(function () {
			        let outerDiv = $('.divvideo');
			        let videoTag = outerDiv.find('video');
			        $(window).resize(resize);
			        resize();
			        function resize() {
			            let width = outerDiv.width();
			            let height = outerDiv.height();
			            let aspectW = 16;
			            let aspectH = 9;
			            let scaleX = width / aspectW;
			            let scaleY = height / aspectH;
			            let scale = Math.max(scaleX, scaleY);
			            let w = Math.ceil(aspectW * scale);
			            let h = Math.ceil(aspectH * scale);
			            let x = 0;
			            let y = 0;
			            if (w > width) x = -(w - width) * 0.5;
			            if (h > height) y = -(h - height) * 0.5;
			            videoTag.css({
			                width: w,
			                height: h,
			                top: y,
			                left: x
			            });
			        }
			    });

			},
			touch_move(event){
				let self = this;
				if ($(window).width() < 1030 && self.$route.meta.parent){
					if (event.additionalEvent == 'panup' || event.additionalEvent == 'pandown'){
						let deltaOfInterest = event.deltaY,
							timeNow = new Date().getTime(),
							quietPeriod = 500;
						console.log(event);

						if(timeNow - self.lastAnimationTouch < quietPeriod + 1000) {
							event.preventDefault();
						    return;
						}

					   setTimeout(function(){
							if (deltaOfInterest < 0) {
								if ($('.next').css('display') == 'block'){
						      		self.lineAnimation();
								}
						      	location.href = $('.next').attr('href');
						   	} else {
						      	if ($('.prev').css('display') == 'block'){
						      		self.lineAnimation();
								}
						      	location.href = $('.prev').attr('href');
						   	}
					   }, 0)
					   
					   self.lastAnimationTouch = timeNow;	
					}
				} else {
					console.log('This is not touch element')
				}
			},
			esc_close(){
				if (this.menuOpen){
					this.scroll = !this.scroll;
					this.menuOpen = false;
				}

				if (this.orderOpen){
					this.scroll = !this.scroll;
					this.orderOpen = false;
				}
			},
			showAgima(){
				if (this.$route.fullPath == '/contacts' && $(window).width() > 500){
					$('.agima').fadeIn();
					if (this.menuOpen || this.orderOpen) {
						$('.agima').fadeOut();
					}
				} else {
					$('.agima').fadeOut();
				}
			},
			showSocials(){
				if (this.$route.fullPath == '/contacts'){
					for (let i = 0; i < this.socials.length; i++){
						this.socials[i].show = true;
					}
				} else {
					for (let i = 0; i < this.socials.length; i++){
						if (i == 0 || i == 1){
							this.socials[i].show = true;
						} else {
							this.socials[i].show = false;
						}
					}
				}
			}

		},
		mounted(){
			this.locationSetup();
			this.video();
			let self = this;
			let lastAnimation = 0;

			$('.list-container a').click(function(){
				if ($(this).parent().data('index') !== 1){
					self.menuOpen = false;
					self.scroll = true;
				}
			});

			$(document).bind('mousewheel DOMMouseScroll', function(event) {
				let delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
				event.preventDefault();
				if (self.scroll && self.$route.meta.parent){
					init_scroll(event, delta);
				}
			});
			
			function init_scroll(event, delta) {
				let deltaOfInterest = delta,
					timeNow = new Date().getTime(),
					quietPeriod = 500;
				if(timeNow - lastAnimation < quietPeriod + 1000) {
					event.preventDefault();
				    return;
				}
			   setTimeout(function(){
					if (deltaOfInterest < 0) {
						if ($('.next').css('display') == 'block'){
				      		self.lineAnimation();
						}
				      	location.href = $('.next').attr('href');
				   	} else {
				      	if ($('.prev').css('display') == 'block'){
				      		self.lineAnimation();
						}
				      	location.href = $('.prev').attr('href');
				   	}
			   }, 200)
			   
			   lastAnimation = timeNow;
			}
	
			document.addEventListener('keyup', function(e){
				if (e.keyCode === 27){
					self.esc_close();
				}
			});		

		},
		updated(){
			this.locationSetup();
			this.showSocials();
			this.showAgima();
			this.disablePan();
		},
		components:{
			menulist,
			order
		}
	}

</script>

<style lang="scss">
	a, .submit{
		position: relative;
		cursor: pointer!important;
		&:before{
			content:'';
			position: absolute;
			opacity: 0;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background-color: #fff;
			top: 50%;
			left: -30px;
			-webkit-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-o-transform: translateY(-50%);
			transform: translateY(-50%);
			-webkit-transition: all .35s;
			-o-transition: all .35s;
			transition: all .35s;
		}
		&:hover{
			&:before{
				left: -14px;
				opacity: 1;
			}
		}
	}
	.landscape{
		display: none;
	}
	.ui-facebook{
		display: none;
	}	

	.main-container{
		position: relative;
		width: 100vw;
		height: 100vh;
	}
	html{
		// хз насчет этого решения, надо потестить 
	 	position: fixed;
	 	width: 100%;
	  	height: 100%;
	  	overflow: hidden;
	    -webkit-text-size-adjust: none
	}
	body{
		height: 100%;
		overflow: hidden;
		font-size: 18px;
		font-family: Northem;
	}

	#app{
		position: relative;
		width: 100vw;
		height: 100vh;
		background-position: center;
		background-size: cover;
	}
	.abs-vert-center{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	header{
		position: absolute;
		top: 0px;
		width: 100%;
		height: 12%;
		z-index: 2;
		padding: 0% 4%;
		.logo{
			width: 80px;
			&:before{
				content: none;
			}
		}
		.nav-block{
			left: 15.5%;
			&.hide{
				display: none;
			}
			ul{
				list-style: none;
				padding: 0px;
				margin: 0px;
				display: flex;
				li{
					margin-right: 50px;
					&:last-child{
						margin-right: 0px;
					} 
					a{
						color: #fff;
						text-decoration: none;
						display: inline-block;
					}
				}
			}
		}
	}
	.menu-link{		
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 26px;
		height: 26px;
		&:before{
			content: none;
		}
		&:hover{
			span{
				width: 13px!important;
				&:after{
					width: 20px;
				},
				&:before{
					width: 26px;
				}
			}
		}
		&.active, &.orderActive{
			span{
				background-color: transparent;
				&:after{
					width: 26px;
					bottom: 0px;
				    transform: rotate(135deg);
					transition: all .25s ease;
					
				}
				&:before{
					width: 26px;
					top: 0px;
				    transform: rotate(-135deg);
					transition: all .25s ease;

				}
			}
		}
		span{
			width: 26px;
			height: 2px;
			background-color: #fff;	
			display: inline-block;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 0px;
			transition: width .25s ease, backgroundColor .15s;
			&:after, &:before{
				content: '';
				position: absolute;
				width: 16px;
				height: 2px;
				right: 0px;
				background-color: #fff;
			}
			&:after{
				bottom: -8px;
				transition: all .25s ease;
				// transition: width .25s ease .35s, bottom .25s ease .25s, transform .25s ease;
			}
			&:before{
				top: -8px;
				transition: all .25s ease;
				// transition: width .25s ease .35s, top .25s ease .25s, transform .25s ease;
			}
		}
	}
	header{
		.order-link{
			position: absolute;
			right: 4%;
			color: #fff;
			text-decoration: none;
			&.hide{
				display: none;
			}
		}
	}
	.divvideo{
	    position: absolute;
	    left: 0px;
	    top: 0px;
	    right: 0px;
	    bottom: 0px;
	    display: block;
	    overflow-x: hidden;
	    overflow-y: hidden;
	    width: 100%;
	    height: 100%;
	}
	.menu-modal{
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1;
		width: 100vw;
		height: 100vh;
		background-color: #000;
	}
	.modal-enter-active, .modal-leave-active{
		transition: all 1s ease-in-out;
	}
	.modal-enter, .modal-leave-to{
		transform: translate3d(0,-100%,0);
	}

	.page-title{
		position: fixed;
		left: 4%;
		color: #fff;
		z-index: 2;
		width: 20px;
		height: 20px;
		white-space: nowrap;
		span {
			display: block;
			transform: rotate(-90deg);
		}
	}
	footer{
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 12%;
		z-index: 2;
		padding: 0% 4%;
		.socials{
			padding-left: 0px;
			list-style: none;
			left: 57%;
			margin: 0px;
			li{
				display: inline-block;
				margin-right: 50px;
				&:last-child{
					margin-right: 0px;
				}
				a{
					color: #fff;
					text-decoration: none;
				}
			}
		}
	}
	.ui-language{
	    left: 15.5%;
	    ul{
	    	padding: 0px;
	    	list-style: none;
	    	li{
	    		display: inline-block;
	    		margin-right: 5px;
	    		&.active{
	    			opacity: 1;
	    		}
	    		opacity: 0.65;
	    		transition: all .35s;
	    		&:hover{
	    			opacity: 1;
	    		}
	    		&:last-child{
	    			a{
	    				&:after{
	    					content: none;
	    				}
	    			}
    			}
	    		a{
	    			color: #fff;
	    			text-decoration: none;
	    			// font-size: 22px;
    			    line-height: 100%;
	    			&:before{
						content: none;
	    			}
	    			&:after{
	    				content: '/';
	    				margin-left: 5px;
	    			}
	    		}
	    	}
	    }
	}
	.ui-view-switcher{
		position: absolute;
		bottom: 4%;
		right: 3.5%;
		width: 16px;
		height: 86px;
		z-index: 4;
		&.hide{
			display: none;
		}
		.dot{
			width: 5px;
			height: 5px;
			background-color: #fff;
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 50%;
			transition: all .55s;
			&.top{
				top: 20%;
			}
			&.bottom{
				top: 70%;
			}
			&.middle{
				top: 45%;
			}
		}
		a{
			position: absolute;
			&:before{
				content: none;
			}
			&:first-child{
				top: 0px;
			}
			&:last-child{
				bottom: 0px;
			}
		}
	}
	.ui-paginator{
		position: absolute;
	    left: 95%;
    	top: 65%;
   	 	transform: translateY(0%) rotate(-90deg);
    	transform-origin: 0% 0%;
		color: #fff;
		display: flex;
		align-items: center;
		z-index: 2;
		&.hide{
			display: none;
		}
		.current{
			font-size: 32px;
			display: inline-block;
			vertical-align: middle;
		}
		.last{
			font-size: 24px;
			display: inline-block;
			vertical-align: middle;
		}
		.line{
			display: inline-block;
			vertical-align: middle;
			position: relative;
			width: 200px;
			height: 2px;
			margin: 0px 20px;
			&.toBottom{
				&:before{
					width: 0%;
				}
				&:after{
					width: 100%;
					transition: all .35s .35s;
				}
			}
			&:before{
				content: '';
				width: 100%;
				position: absolute;
				height: 2px;
				left: 0px;
				background-color: #fff;
				transition: all .35s;
			}
			&:after{
				content: '';
				width: 0%;
				position: absolute;
				height: 2px;
				right: 0px;
				background-color: #fff;
				transition: all .35s;
			}
		}
	}
	.ui-facebook{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 18%;
	}
	.fb_iframe_widget{
		// opacity: 0;
		z-index: 2;
	}

	.agima{
		left: 57%;
		top: 52%;
		img{
			width: 120px;
		}
	}

	.fillheight{
		height: 100%;
		touch-action: auto!important;
	    -webkit-user-drag: auto!important;
	    user-select: auto!important;
	    -webkit-overflow-scrolling:touch;
	}

	@media (max-width: 1025px){
		footer, header{
			padding: 4%;
		}
		.divvideo{
			display: none;
		}
		html{
			height: 100%;
		}
		#app{
			width: 100%;
			height: 100%;
		}
		.main-container{
			width: 100%;
			height: 100%;
			min-height: 100%;
		}
		.ui-paginator{
			left: 94%;
			top: 68%;
		}
	}
	
	@media (max-width: 769px){
		.ui-paginator{
			left: 93%;
			top: 64%;
		}
		header .nav-block ul li{
			margin-right: 20px!important;
		}
		header .nav-block{
			left: 18%;
		}
		.order-container .budget .text{
			width: 167px;
		}
		.order-container .budget .custom-check{
			margin-right: 3%;
		}
		footer .socials, .agima{
			left: 55%;
		}
		footer .socials li a{
			font-size: 12px;
		}
		footer .socials li{
			margin-right: 14px;
		}
	}

	@media (max-width: 700px){
		html{
			height: 100%;
		}
		#app{
			width: 100%;
			height: 100%;
		}
		.main-container{
			width: 100%;
			height: 100%;
			min-height: 100%;
		}
		header .nav-block{
			display: none;
		}
		footer, header {
		    padding: 9% 4%;
		}
		header .logo {
			width: 55px;
		}
		header .order-link{
			font-size: 12px;
		}
		header .menu-link{
		   	left: 50%;	
    		top: 50%;
    		transform: translate(-50%, -50%);
		}
		footer .socials, .agima{
			display: none;
		}
		.page-title{
			display: none;
		}
		footer img{
			width: 40px;
		}
		.ui-view-switcher .dot{
			display: none;
		}
		.ui-view-switcher{
			position: absolute;
			left: 50%;
		    height: 13px;
			-webkit-transform: translateX(-50%);
			-ms-transform: translateX(-50%);
			-o-transform: translateX(-50%);
			transform: translateX(-50%);

		}
		.ui-view-switcher a:first-child{
			top: 4%;
			left: 50%;
			transform: translateX(-50%);
		}
		.ui-view-switcher a:last-child{
			bottom: 4%;
			left: 50%;
			transform: translateX(-50%);
		}
		.ui-paginator{
			transform: none;
			top: auto;
			bottom: 3%;
			right: 4%;
			left: auto;
		}
		.ui-paginator .last{
			display: none;
		}
		.ui-paginator .line{
			width: 50px;
		}
		.ui-paginator .current{
			font-size: 26px;
		}
		.small-view h1{
		    top: 4%;
   		 	left: 10%;
	 	    font-size: 38px;
		}
		.small-view p{
		    bottom: 2%;
    		left: 0%;
    		line-height: 150%;
		}
		.raiting-view .col:first-child .name.in{
			left: 10%;
		}
		.raiting-view .col .content .line{
			display: none!important;
		}
		.raiting-view .col .content .place-number{
			font-size: 80px;
		}
		.item .info-half ul li{
			font-size: 12px;
		}
		.item .info-half .year{
			top: 6%;
			right: 4%;
		}
		.owl-controls .owl-navs .owl-nav{
			font-size: 14px;
		}
		.item .color-half h2{
			font-size: 32px;
		}
		.contact-content .contacts-info .phone-call a{
			font-size: 23px;
		}
		.order-container .form-group.big-margin{
			margin-bottom: 20px;
		}
		.menu-modal{
			height: 100%;
		}
		.ui-language{
			display: block;
			left: 17.5%;
		}
		.ui-language ul li a{
			font-size: 15px;
		}
	}
	@media (max-width: 321px){
		.ui-language{
			left: 20.5%;
		}
	}
		
	@media only screen
      and (min-device-width: 321px)
      and (max-device-width: 736px)
      and (min-aspect-ratio: 13/9)
      and (orientation: landscape) {
      	.main-container{
			display: none;
		}
		.landscape{
			z-index: 2;
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: #fff;
			font-size: 4vw;
			width: 80%;
			padding: 40px 0px;
			text-align: center;
			background-color: rgba(#000, 0.5);
		}
      }

</style>