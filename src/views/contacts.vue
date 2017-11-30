<template lang="pug">
	transition(v-on:enter="startAnimate" v-on:before-enter="beforeAnimate" v-on:leave="leaveAnimate" appear mode="out-in")
		section.contacts
			.contacts-background(v-bind:style="{backgroundImage: map_picture}")
			.contact-content
				.map.prerender#moscow-map
				.map.prerender#kras-map
				.contacts-map.offScreen
					ul
						li(v-bind:class='{ active: !moscow }' @click="switchCity")
							button Офис в Красноярске
						li(v-bind:class='{ active: moscow }' @click="switchCity")
							button Контакты в Москве
					a.email(href="mailto:info@chipsa.ru") info@chipsa.ru
				.contacts-info.offScreen
					transition(name='fade' mode="out-in")
						.contacts-block(v-show="moscow")
							p.adress.address-moscow Готовы приехать на встречу в столицу, если это необходимо
							.phone-call
								p Время для звонка: #[br] с 9:00 — 16:00
								a(href="tel:8—499—323—34—34") 8—499—323—34—34
					transition(name='fade' mode="out-in")
						.contacts-block(v-show="!moscow")
							a.show-map(@click="showMap") Показать на карте
							p.adress 653453, Россия, Красноярск #[br] Партизана Железняка, 9г
							.phone-call
								p Время для звонка: #[br] с 9:00 — 16:00
								a(href="tel:8—499—323—34—34") 8—391—249—66—58

</template>

<script>
	
	export default{
		name: 'contacts',
		data(){
			return{
				moscow: false,
				style:[
				    {
				        "featureType": "all",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "saturation": 36
				            },
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 40
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 16
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels.icon",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 20
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 29
				            },
				            {
				                "weight": 1.2
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 20
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 21
				            }
				        ]
				    },
				    {
				        "featureType": "landscape.man_made",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 32
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 17
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 29
				            },
				            {
				                "weight": 0.2
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 29
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 16
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 29
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 17
				            }
				        ]
				    }
				],
				maps:['url(src/assets/map1.jpg)', 'url(src/assets/map2.jpg)'],
				map_picture: 'url(src/assets/map2.jpg)'
			}
		},
		methods:{
			switchCity(el){
				if (el.target.parentElement.className !== 'active'){
					this.moscow = !this.moscow;
					if (this.moscow){
						this.map_picture = this.maps[0];
					} else {
						this.map_picture = this.maps[1];
					}
				}
			},
			showMap(e){
				e.preventDefault();
				console.log(e);
				if (this.moscow){
					if ($('#moscow-map').hasClass('active')){
						$('.map').removeClass('active');
						e.target.text = 'Показать на кате';
					} else {
						$('.map').removeClass('active');
						$('#moscow-map').addClass('active');
						e.target.text = 'Скрыть карту';
					}
				} else {
					if ($('#kras-map').hasClass('active')){
						$('.map').removeClass('active');
						e.target.text = 'Показать на кате';
					} else {
						$('.map').removeClass('active');
						$('#kras-map').addClass('active');
						e.target.text = 'Скрыть карту';
					}
				}
			},
			startAnimate(el, done){
				setTimeout(() => {
					$(this.$el).find('.contacts-map').toggleClass('onScreen offScreen');
					$(this.$el).find('.contacts-info').toggleClass('onScreen offScreen');
					done();
				}, 800);
			},
			beforeAnimate(){
				$(this.$el).find('.contacts-map').removeClass('onScreen');
				$(this.$el).find('.contacts-info').removeClass('onScreen');
			},
			leaveAnimate(el, done){
				$(this.$el).find('.contacts-map').toggleClass('onScreen offScreen');
				$(this.$el).find('.contacts-info').toggleClass('onScreen offScreen');
				setTimeout(() => {
					done();
				},700);
			},
			loadImages(){
				let bgImg = new Image();
				for (let i = 1; i < this.maps.length+1; i++){
					bgImg.src = 'src/assets/map'+i+'.jpg';
				}
			}
		},
		mounted(){
			let mscMap;
			let krskMap;
			let image = 'src/assets/marker.svg';
			let self = this
			/*function initMscMap() {
				mscMap = new google.maps.Map(document.getElementById('moscow-map'), {
					center: {lat: 55.75677, lng: 37.56261799999993},
					zoom: 16,
					styles: self.style,
				 	disableDefaultUI: true,
				 	zoomControl: true,
    				stylecrollwheel: false
				});

				let beachMarker = new google.maps.Marker({
					position: {lat: 55.75677, lng: 37.56261799999993},
					map: mscMap,
					icon: image
		        });
			}*/
			function initKrskMap() {
				krskMap = new google.maps.Map(document.getElementById('kras-map'), {
					center: {lat: 56.03064699999999, lng: 92.92150199999992},
					zoom: 16,
					styles: self.style,
					disableDefaultUI: true,
					zoomControl: true,
    				stylecrollwheel: false
				});

				let beachMarker = new google.maps.Marker({
					position: {lat: 56.03064699999999, lng: 92.92150199999992},
					map: krskMap,
					icon: image
		        });
			}

			initKrskMap();
			/*initMscMap();*/
			
			setTimeout(function(){
				$('.map').removeClass('prerender');
			}, 100)

		}
	}

</script>

<style lang="scss">

	.map{
		position: absolute;
		width: 54%;
		height: 0%;
		top: 0px;
		left: 0px;
		transition: height .15s cubic-bezier(0.215, 0.61, 0.355, 1), opacity .15s .3s cubic-bezier(0.215, 0.61, 0.355, 1);
		z-index: 2;
		&.active{
			height: 100%;
		}
		&.prerender{
			height: 100%;
			opacity: 0;
		}
	}

	.contacts-background{
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		transition: all .45s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	.contact-content{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 82%;
		height: 76%;
		display: flex;
		background-color: rgba(#000, 0.5);
		padding: 5% 6%;
		.contacts-map{
			display: flex;
			width: 60%;
			flex-direction: column;
			justify-content: space-between;
			height: 0%;
			opacity: 0;
			transition: all .55s cubic-bezier(0.215, 0.61, 0.355, 1);
			&.onScreen{
				height: 100%;
				opacity: 1;
			}
			&.offScreen{
				height: 0%;
				opacity: 0;
			}
			.email{
				color: #fff;
				font-size: 5.5vw;
				line-height: 100%;
				font-weight: 400;
				text-decoration: none;
				transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
				&:hover{
					color: #fecc03;
				}
				&:before{
					content: none;
				}
			}
			ul{
				margin: 0px;
				padding: 0px;
				list-style: none;
				li{
					&.active, &:hover{
						opacity: 1;
					}
					opacity: 0.5;
					transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
					float: left;
					margin-right: 10%;
					&:last-child{
						margin-right: 0px;
					}
					button{
						cursor: pointer;
						background-color: transparent;
						border: none;
						color: #fff;
						font-size: 20px;
						font-weight: 400;
						font-family: Northem;
						&:focus{
							outline: none;
							border: none;
						}
					}
				}
			} 
		}
		.contacts-info{
			display: flex;
			width: 40%;
			height: 100%;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			height: 0%;
			opacity: 0;
			transition: all .35s cubic-bezier(0.215, 0.61, 0.355, 1);
			&.onScreen{
				height: 100%;
				opacity: 1;
			}
			&.offScreen{
				height: 0%;
				opacity: 0;
			}
			.contacts-block{
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: absolute;
			}
			.show-map{
				color: #fff;
				font-size: 20px;
				font-weight: 400;
				cursor: pointer;
			}
			.adress{
				font-size: 18px;
				color: #fff;
				line-height: 180%;
			}
			.address-moscow {
				margin-top: -2px;
			}
			.phone-call{
				p{
					color: #fff;
					font-size: 18px;
					line-height: 155%;
					margin-bottom: 30px;
				}
				a{
					font-size: 34px;
					text-decoration: none;
					color: #fff;
					text-transform: uppercase;
					font-weight: 800;
					&:before{
						content: none;
					}
				}
			}
		}
	}
	
	@media (max-width: 1025px){
		.contact-content .contacts-info .phone-call a{
			font-size: 32px;
		}
		footer .socials li a{
			font-size: 14px;
		}
		footer .socials li{
			margin-right: 20px;
		}
	}

	@media (max-width: 769px){
		.contact-content{
			flex-direction: row;
			flex-wrap: wrap;
		}
		.contact-content .contacts-map, .contact-content .contacts-info{
			width: 100%;
			&.onScreen{
				height: 50%;
			}
		}
		.map{
			width: 100%;
			&.active{
				height: 50%;
			}
		}
		.contact-content .contacts-info .show-map{
			margin-top: 20px;
		}
		.contact-content .contacts-map .email{
		    font-size: 11.5vw;
		}
		footer .socials li{
			margin-right: 8px;
		}
	}

	@media (max-width: 469px){
		.contact-content .contacts-info .phone-call a{
			font-size: 23px;
		}
		.contact-content .contacts-info{
			width: 100%;
			&.onScreen{
				height: 60%;
			}
		}
		.map{
			width: 100%;
			&.active{
				height: 45%;
			}
			&.prerender{
				height: 45%;
			}
		}
		.contact-content .contacts-map{
			&.onScreen{
				height: 40%;
			}
		}
		.contact-content .contacts-map ul li button{
			padding: 0px;
			padding-bottom: 5px;
			font-size: 17px;
		}
		.contact-content .contacts-info .adress{
			font-size: 14px;
		}
		.contact-content .contacts-info .phone-call p{
			font-size: 14px;
			margin-bottom: 15px;
		}
		.contact-content .contacts-info .phone-call a{
			font-size: 20px;
		    margin-bottom: 13px;
    		display: inline-block;
		}
		.contact-content .contacts-info .show-map{
			margin-top: 37px;
			font-size: 18px;
		}
		.contact-content .contacts-info.onScreen {
		    height: 60%;
		}
	}

</style>