<template lang="pug">
	.order-container
		form#orderform(@submit.prevent="validateBeforeSubmit")
			.form-group
				input(type="text" v-model="name" v-validate="'required|alpha_spaces'" v-bind:class="{'input': true, 'is-danger': errors.has('name') }" name="name" placeholder="Name")
			.form-group
				input(v-validate="'required|email'" v-model="email" v-bind:class="{'input': true, 'is-danger': errors.has('email') }" type="email" name="email" placeholder="Email")
			.form-group.big-margin
				input(v-validate="'required|numeric'" v-bind:class="{'input': true, 'is-danger': errors.has('tel') }" v-model="tel" type="tel" name="tel" placeholder="Phone")
			.form-group.big-margin
				textarea(name="descr" v-model="text" id="" placeholder="describe your task")
			.budget
				.text choose budget
				.custom-check
					input(type="radio" value="Менее 500" name="budget" id="small" checked)
					label(for="small") less then $8500.
				.custom-check
					input(type="radio" value="от 500 до 1000" name="budget" id="middle")
					label(for="middle") from $8500 to $17000.
				.custom-check
					input(type="radio" value="больше 1000" name="budget" id="high")
					label(for="high") more than $17000.
			.agree-check
					input(type="checkbox" value="yes" v-model="agreed" v-bind:class="{'input': true, 'is-danger': errors.has('agreed') }" v-validate="'required'" name="agreed" id="agreed")
					label(for="agreed") I #[a(href="http://chipsa.ru/agree.pdf" target="_blank") agree] with processing of my personal data
			.submit
					input(type="submit" value="Send")
		.sucsess
			h2 Thank you! #[br] We get in touch with you later.

</template>

<script>
	export default{
		name: 'orderform',
		data(){
			return{
				email: '',
				name: '',
				tel: '',
				text: '',
				budget: '',
				agreed: ''
			}
		},
		methods:{
			validateBeforeSubmit() {
				this.$validator.validateAll().then(result => {
					if (result) {
						var data = $('#orderform').serializeArray();
						$.ajax({
							url: '/send.php',
							method:'post',
							data: data,
							success: function(data){
								yaCounter36856355.reachGoal('piska');
								$('.order-container form').fadeOut(300, function(){
									$('.sucsess').fadeIn(300);
								})
							},
							error: function(data){
								console.log(data);
							}
						})
						//success
						return;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.sucsess{
		display: none;
		h2{
			color: #fff;
			font-size: 4vw;
		}
	}
	.order-container{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 75%;
		.form-group{
			width: 350px;
			margin-bottom: 38px;
			&.big-margin{
				margin-bottom: 80px;
			}
			input, textarea{
				width: 100%;
				background-color: transparent;
				outline: none;
				border: none;
				color: #fff;
				padding-bottom: 20px;
				border-bottom: 1px solid #fff;
				line-height: 100%;
				font-family: Northem;
				font-weight: 400;
				&.is-danger{
					border-bottom-color: #f00;
				}
			}
			textarea {
				padding-bottom: 0;
				height: 44px;
 			}
		}
		.budget{
			border-bottom: 1px solid #fff;
			padding-bottom: 20px;
			margin-bottom: 10%;
			display: block;
			.text{
				color: #fff;
				width: 350px;
				display: inline-block;
				opacity: 0.5;
				font-weight: 400;
				margin-right: 10%;
			}
			.custom-check{
				display: inline-block;
				margin-right: 10%;
				&:last-child{
					margin-right: 0px;
				}
				[type="radio"]:not(:checked),
				[type="radio"]:checked {
				  position: absolute;
				  left: -9999px;
				}
				[type="radio"]:not(:checked) + label,
				[type="radio"]:checked + label{
					position: relative;
					cursor: pointer;
					color: #fff;
				}
				[type="radio"]:not(:checked) + label:after,
				[type="radio"]:checked + label:after {
					content: '';
					position: absolute;
					opacity: 0;
					bottom: -20px;
					left: 0px;
					width: 100%;
					height: 4px;
					background-color: #fecc03;
					transition: all .35s;
				}
				[type="radio"]:checked + label:after {
					opacity: 1;
				}
			}
		}
		.submit{
			display: inline-block;
			vertical-align: middle;
			&:hover {
 				input[type="submit"]{
 					color: #fecc03;
 				}
 				&::before {
 					background-color: #fecc03;
 				}
 			}
		}
		input[type="submit"]{
			padding: 0px;
			background-color: transparent;
			border: none;
			color: #fff;
			cursor: pointer;
			outline: none;
			font-family: Northem;
		}
		.agree-check{
			margin-left: 30px;
 			margin-bottom: 20px;
			vertical-align: middle;
			&:last-child{
				margin-right: 0px;
			}
			[type="checkbox"]:not(:checked),
			[type="checkbox"]:checked {
			  position: absolute;
			  left: -9999px;
			}
			.is-danger[type="checkbox"]:not(:checked) + label,
			.is-danger[type="checkbox"]:checked + label{
				color: #f00;
				a{
					color: #f00;
				}
			}
			[type="checkbox"]:not(:checked) + label,
			[type="checkbox"]:checked + label{
				position: relative;
				cursor: pointer;
				color: #fff;
				a{
					color: #fff;
					&:hover{
						text-decoration: none;
					}
					&:before{
						content: none;
					}
				}
			}
			.is-danger[type="checkbox"]:not(:checked) + label:after,
			.is-danger[type="checkbox"]:checked + label:after {
				border-color: #f00;
			}
			[type="checkbox"]:not(:checked) + label:after,
			[type="checkbox"]:checked + label:after {
				content: '';
				position: absolute;
				opacity: 1;
				top: 3px;
				left: -30px;
				width: 14px;
				height: 14px;
				border: 1px solid #fff;
				background-color: transparent;
				transition: all .35s;
			}
			[type="checkbox"]:not(:checked) + label:before,
			[type="checkbox"]:checked + label:before {
				content: '\2713';
				position: absolute;
				opacity: 0;
				top: 0px;
				left: -26px;
				width: 14px;
				height: 14px;
				background-color: transparent;
				transition: all .35s;
			}
			[type="checkbox"]:checked + label:before {
				opacity: 1;
			}
		}
	}

		
	@media (max-width: 1480px) {
		.order-container .budget .custom-check{
			margin-right: 6%;
		}
	}

	@media (max-width: 1367px){
		.order-container .form-group{
			margin-bottom: 20px;
		}
		.order-container .form-group.big-margin{
			margin-bottom: 40px;
		}
		.order-container .budget .custom-check{
			margin-right: 6%;
		}
		.order-container .budget{
			margin-bottom: 5%;
		}
	}

	@media (max-width: 1305px) {
 		.order-container .budget .custom-check {
 			margin-right: 4%;
 		}
 	}
 
	@media (max-width: 1280px) {
		.order-container .budget .custom-check {
 			margin-right: 2%;
 		}
 		.order-container .budget .text{
	        margin-right: 0%;
		}
	}

 	@media (max-width: 1180px) {
 		.order-container .budget .text{
 	        margin-right: 0%;
 		}
 		.order-container .budget .custom-check {
 			margin-right: 1%;
 		}
 	}

	@media (max-width: 1025px){
		.order-container{
			top: 46%;
		}
		.order-container .budget .text{
		    width: 315px;
	        margin-right: 0%;
		}
		.order-container .budget .custom-check {
			margin-right: 5%;
		}
		.order-container .form-group input, .order-container .form-group textarea{
			border-radius: 0px;
			border-top: none;
		}
		.order-container .budget{
			padding-bottom: 0px;
			border-bottom: none;
			margin-bottom: 30px;
		}
		.order-container .budget .text{
			display: block;
			margin-bottom: 20px;
		}
		.order-container .budget .custom-check [type="radio"]:not(:checked) + label:after, .order-container .budget .custom-check [type="radio"]:checked + label:after{
			bottom: -8px;
		}
		.order-container .budget .custom-check {
 			margin-bottom: 15px;
 		}
		.order-container .agree-check{
			margin-left: 30px;
			margin-top: 20px;
			display: block;
		}
		.order-container .agree-check [type="checkbox"]:not(:checked) + label, .order-container .agree-check [type="checkbox"]:checked + label{
			font-size: 14px;
		}
		.order-container .agree-check [type="checkbox"]:not(:checked) + label:before, .order-container .agree-check [type="checkbox"]:checked + label:before{
			top: 0px;
		}
		.order-container .agree-check [type="checkbox"]:not(:checked) + label:after, .order-container .agree-check [type="checkbox"]:checked + label:after{
			top: 1px;
		}
	}

	@media (max-width: 469px){
		.order-container .form-group{
			width: 100%;
		}
		.order-container{ 
			width: 80%;
		}
		.order-container .budget .custom-check{
			display: block;
			margin-bottom: 15px;
		}
		.order-container .budget .custom-check [type="radio"]:not(:checked) + label:after, .order-container .budget .custom-check [type="radio"]:checked + label:after{
			bottom: -5px;
		}
		.order-container .budget{
			padding-bottom: 0px;
			border-bottom: none;
			margin-bottom: 20px;
		}
		.order-container .budget .text{
			margin-bottom: 10px;
		}
		.order-container .form-group.big-margin{
			margin-bottom: 30px;
		}
		.order-container input[type="submit"]{
			padding: 0px;
		}
		.order-container .form-group textarea{
			padding-bottom: 12px;
		}
		.order-container .form-group input, .order-container .form-group textarea{
			border-radius: 0px;
		}
		.order-container .form-group input, .order-container .form-group textarea{
			padding-bottom: 3px;
		}
		.order-container .form-group textarea{
			height: 24px;
		}
		.order-container .form-group.big-margin{
		    margin-bottom: 15px;
		}
		.order-container .budget .custom-check [type=radio]:checked+label:after, .order-container .budget .custom-check [type=radio]:not(:checked)+label:after{
			height: 2px;
		}
		.order-container .budget .custom-check [type=radio]:checked+label, .order-container .budget .custom-check [type=radio]:not(:checked)+label{
			font-size: 16px;
		}
		.order-container .form-group input, .order-container .form-group textarea{
			font-size: 17px;
		}
		.order-container .budget .custom-check [type=radio]:checked+label:after, .order-container .budget .custom-check [type=radio]:not(:checked)+label:after{
			bottom: -2px;
		}
		.order-container .budget .custom-check{
			margin-bottom: 10px;
		}
		.order-container .agree-check [type="checkbox"]:not(:checked) + label, .order-container .agree-check [type="checkbox"]:checked + label{
			font-size: 12px;
			line-height: 110%;
			display: inline-block;
		}
		.order-container .agree-check [type="checkbox"]:not(:checked) + label:before, .order-container .agree-check [type="checkbox"]:checked + label:before{
			left: -27px;
			top: 3px;
			font-size: 16px;
		}
	}

	@media (max-width: 321px){
		.order-container .budget .custom-check{
			margin-bottom: 5px;
		}
		.order-container .budget{
			margin-bottom: 10px;
		}
	}

</style>