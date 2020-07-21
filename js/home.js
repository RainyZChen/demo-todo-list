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

// 1.监听选中按钮
$(document).on('click','.check-but', function () {
	$(this).attr('src', './img/checkbox_2.png');
	$(this).attr('class', 'done-but');
	$(this).parents('li').children('.list-text')
		.addClass('line-through')
		.addClass('gloomy-font')
})
$(document).on('click','.done-but', function () {
	$(this).attr('src', './img/checkbox.png');
	$(this).attr('class', 'check-but');
	$(this).parents('li').children('.list-text')
		.removeClass('line-through')
		.removeClass('gloomy-font')
})
$(document).on('click','.open-but', function () {
	$(this).attr('src','./img/close.png')
	$(this).attr('class','close-but')
})
$(document).on('click','.close-but', function () {
	$(this).attr('src','./img/open.png')
	$(this).attr('class','open-but')
})
// 2. 监听删除按钮
$(document).on('click', '.delete-but',function () {
	if ($(this).parents('ul').children('li').length < 2) {
		$(this).parents('li').remove();
		$('.list-bottom').css('display','none')
		$('.no-todo').css('display','block')
	} else {
		$(this).parents('li').remove();
	}
})
// 3.监听'添加'按钮
$(document).on('click', '.add .add-text div', function () {
	let textStr = $(this).parents('.add-text').children('input').val()
	if (!textStr) {
		alert('待办事项不能为空')
		return
	}
	$('.list-bottom').css('display','block')
	$('.no-todo').css('display','none')

	let liTemplate = `<li><div class="list-text">${textStr}</div><div class="list-img"><img class="check-but" src="./img/checkbox.png" alt="勾选框"><img class="delete-but" src="./img/delete.png" alt="删除"></div></li>`;
	$('ul').append($(liTemplate))
})

