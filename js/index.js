$(function() {
	//红桃：H  黑桃：S  梅花：C  方块：D
	
	$('.left,.right,.resent,.jifen').css('display','none')
	$('.begin').on('click',function(){
	    setpoker(makepoker());
	    $('.game,.begin,.heigh').css('display','none')
	    $('.left,.right,.resent,.jifen').css('display','block')
	})
	
    $('.resent').on('click',function(){
    	$('.poker').remove();
    	$('.begin').trigger('click');
    })

	var dict = {
		1: 'A',
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		10: 'T',
		11: 'J',
		12: 'Q',
		13: 'K'
	};

	function makepoker() {
		var poker = [];
		var colors = ['s', 'h', 'c', 'd']
		var table = {};
		while(poker.length != 52) {
			var index = Math.floor(Math.random() * 4)
			var c = colors[index]

			var n = Math.ceil(Math.random() * 13);
			var pok = {
					color: c,
					number: n
				}
				//			console.log(pok)
			if(!table[n + c]) {
				poker.push(pok);
				table[n + c] = true;
			}
		}
		return poker
	}

	function setpoker(poker) {
		var index = 0;
		for(var i = 0, pok; i < 7; i++) {
			for(var j = 0; j < i + 1; j++) {
				pok = poker[index]
				index += 1
				$('<div>')
					.attr('id', i + '_' + j)
					.attr('data-number', pok.number)
					.addClass('poker')
					.css({
						backgroundImage: 'url(./img/' + dict[pok.number] + pok.color + '.png)'
					})
					.appendTo('.changjing')
					.delay(index * 30)
					.animate({
						top: i * 40,
						left: (6 - i) * 65 + j * 130,
						opacity:1
					})
			}
		}
		for(; index < poker.length; i++) {
			pok = poker[index]
			index += 1
			$('<div>')
				.attr('data-number', pok.number)
				.addClass('poker next')
				.css({
					backgroundImage: 'url(./img/' + dict[pok.number] + pok.color + '.png)'
				})
				.appendTo('.changjing')
				.delay(index * 30)
				.animate({
					top: 432,
					left: 200,
					opacity:1
				})
		}
	}

//	setpoker(makepoker())

	var zindex = 0;

	$('.changjing .left').on('click', (function() {
		return function() {
			$('.next').last()
				.css('z-index', zindex++)
				.animate({
					left: 580
				}).
			queue(function() {
				$(this).removeClass('next')
					.dequeue()
					.addClass('return');
			})
		}

	}()))
	$('.changjing .right').on('click', (function() {
		var number = 0;
		return function(i) {
			if($('.next').length) {
				alert('左面还有牌')
				return;
			}
			number++;
			if(number > 3) {
				alert('三次机会已经用完了')
				return
			}
			$('.return').each(function(i, v) {
				$(this).css('z-index', 0)
					.delay(i * 50)
					.animate({
						left: 200
					})
					.queue(function() {
						$(this).removeClass('return')
							.addClass('next')
							.dequeue()
					})
			})

		}
	}()))

	function getnumber(el) {
		return parseInt($(el).attr('data-number'))
	}

	function isCanClick(el) {
		var x = parseInt($(el).attr('id').split('_')[0]);
		var y = parseInt($(el).attr('id').split('_')[1]);
		if($('#' + (x + 1) + '_' + y).length || $('#' + (x + 1) + '_' + (y + 1)).length) {
			return false;
		} else {
			return true;
		}
	}

	var prev
	var intergal=0;
	$('.changjing').on('click', '.poker', function() {
			if($(this).attr('id') && !isCanClick(this)) {
				return;
			}
			$(this).stop();
			$(this).animate({'margin-top':-20})

			var number = getnumber(this)
			if(number === 13) {
				intergal+=10;
				$('.jifen').text('积分:'+intergal);
				console.log(intergal);
				$(this).animate({
						top: 0,
						left: 700
					})
					.queue(function() {
						$(this).detach().dequeue();
					})
			}

			console.log(getnumber(this))
			if(prev) {
				if(getnumber(prev) + getnumber(this) === 13) {
					intergal+=10;
					$('.jifen').text('积分：'+intergal);
					console.log(intergal);
					$(prev).add($(this)).animate({
							top: 0,
							left: 700
						})
						.queue(function() {
							$(this).detach().dequeue()
						})
				}else{
					$(this).animate({'margin-top':0});
					$(prev).delay(400).animate({'margin-top':0})
				}
				prev=null
			} else {
				prev = this
			}
		
	

})
	})