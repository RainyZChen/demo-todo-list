/**
 * 1.图片监听点击事件
 *
 * 2.添加按钮的div添加点击事件
 *
 * 3.点击单选框会针对文字画横线，再次点击会恢复正常文字
 *
 * 4.点击删除如表会删除该行
 *
 * 5.删除li完毕的时候会默认样式 "没有待办事项！！！"
 *
 * 6. ①输入框不能为空 ②点击添加按钮会在list里面增加一个li
 *
 */
const liArr = []
const order = ()=>{
	$.each([...$('ul li')], function (i, value) {
		$(value).attr('order', i);
		liArr.push($(value))
	})
}

// 1. 点击未选中按钮
order()
$(document).on('click','.check-but', function () {
	$(this).attr('src', './img/checkbox_2.png');
	$(this).attr('class', 'done-but');
	let li = $(this).parents('li');
	li.children('.list-text')
		.addClass('line-through')
		.addClass('gloomy-font')
	li.addClass('done')
	const arr = []
	if (isOpened()) {
		arr.push(li);
		li.remove();
	}
	$.each(arr, function (i, value) {
		$('ul').append(value);
	});

})
// 点击选中按钮
$(document).on('click','.done-but', function () {
	$(this).attr('src', './img/checkbox.png');
	$(this).attr('class', 'check-but');
	let li = $(this).parents('li');
	li.children('.list-text')
		.removeClass('line-through')
		.removeClass('gloomy-font')
	li.removeClass('done')
	if (isOpened()) {
		$('ul li').remove('li')
		$.each(liArr, function (i, value) {
			$('ul').append(value)
		})
	}
})
// 点击当前关闭按钮
$(document).on('click','.close-but', function () {
	$(this).attr('src','./img/open.png')
	$(this).attr('class','open-but')
	// 1.如果有class为done的li那么就添加到最后一个li
	const arr = []
	$.each([...$('ul li')], function (i, value) {
		if ($(value).hasClass('done')){
			arr.push($(value))
			$(value).remove();
		}
	})
	$.each(arr, function (i, value) {
		$('ul').append(value);
	})
})
// 点击当前打开按钮
$(document).on('click','.open-but', function () {
	$(this).attr('src','./img/close.png')
	$(this).attr('class','close-but')
	$('ul li').remove('li')
	$.each(liArr, function (i, value) {
		$('ul').append(value)
	})
})
// 2. 监听删除按钮
$(document).on('click', '.delete-but',function () {
	// 删除内存中li
	if ($(this).parents('ul').children('li').length < 2) {
		$(this).parents('li').remove();
		removeFromLiArr($(this).parents('li'))
		$('.list-bottom').css('display','none')
		$('.no-todo').css('display','block')
	} else {
		$(this).parents('li').remove();
		removeFromLiArr($(this).parents('li'))
	}
})
// 3.监听'添加'按钮
$(document).on('click', '.add .add-text div', function () {
	// 1.校验
	let textStr = $(this).parents('.add-text').children('input').val()
	if (!textStr) {
		alert('待办事项不能为空')
		return
	}
	// 2.给li编号
	let orderNum = 0;
	if (liArr.length!==0) {
		orderNum = Number.parseInt(liArr[liArr.length-1].attr('order'))+1;
	}
	$('.list-bottom').css('display','block')
	$('.no-todo').css('display','none')
	// 3.设置模板
	let liTemplate = `<li order="${orderNum}"><div class="list-text">${textStr}</div><div class="list-img"><img class="check-but" src="./img/checkbox.png" alt="勾选框"><img class="delete-but" src="./img/delete.png" alt="删除"></div></li>`;
	let $temp = $(liTemplate);
	if (isOpened()) {
		appendNew($temp)
		return;
	}
	$('ul').append($temp);
	liArr.push($temp)
})

let isOpened = ()=>{
	return $('.list .list-bottom img').hasClass('open-but')
};

function removeFromLiArr(li){
	console.log(liArr)
	$.each(liArr, function (i, value) {
		console.log(value.attr('order'))
		console.log(li.attr('order'))
		if (value.attr('order') === li.attr('order')) {
			liArr.splice(i, 1);
		}
	})
}
function appendNew(li) {
	// 找出class为done的li的第一个index
	let index = 0;
	const indexArr = []
	$.each([...$('li')],function (i, value) {
		if ($(value).hasClass('done')) {
			indexArr.push(i)
		}
	})
	index = indexArr[0]
	// index和后面的元素的order都+1
	for (let i = 0; i < liArr.length; i++) {
		if (i >= index) {
			liArr[i].attr('order', Number.parseInt(liArr[i].attr('order')) + 1);
		}
	}
	li.attr('order', index)
	liArr.push(li)
	// 重新刷新lu
	$('ul li').remove('li')
	liArr.sort(compare('order'))
	$.each(liArr, function (i, value) {
		$('ul').append(value)
	})

	function compare(property){
		return function(a,b){
			let value1 = Number.parseInt(a.attr(property));
			let value2 = Number.parseInt(b.attr(property));
			return value1 - value2;
		}
	}

}
