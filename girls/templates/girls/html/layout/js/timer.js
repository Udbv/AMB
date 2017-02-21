function get_the_timeout(){
	var today = new Date();
	var _diff = target_date - today;
	var time_diff_seconds = _diff / 1000;
	var time_diff_minutes = time_diff_seconds / 60;
	var time_diff_hours   = time_diff_minutes / 60;
	var D = {};
	D.days  = Math.floor((time_diff_hours / 24));
	var d24 = D.days * 24;
	D.hours = Math.floor(time_diff_hours - d24);
	D.minutes = Math.floor(time_diff_minutes - ((D.hours + d24) * 60));
	D.seconds = Math.floor((time_diff_seconds - (D.hours + d24) * 3600) - (D.minutes * 60));
	for(p in D){
		var the_value = D[p];
		if(the_value >= 0 && the_value < 10) {
			D[p] = '0' + the_value;
		}
		if(p == 'days' && the_value < 100) {
			D[p] = '0' + D[p];
		}
		
	}
	return D;
}

jQuery(function () {
	if(target_date){
		var day_h = jQuery('#day_h');
		var day_d = jQuery('#day_d');
		var day = jQuery('#day');
		
		var hour_d = jQuery('#hour_d');
		var hour = jQuery('#hour');
		
		var minute_d = jQuery('#minute_d');
		var minute = jQuery('#minute');
		
		var second_d = jQuery('#second_d');
		var second = jQuery('#second');
		
		var t = setInterval(function(){
			var num_value = 0;
			var t2;
			
			var D = get_the_timeout();
			var day_h_value = parseInt(D.days.toString().substr(0, 1));
			var day_d_value = parseInt(D.days.toString().substr(1, 1));
			var day_value = parseInt(D.days.toString().substr(2, 1));
			
			var hour_d_value = parseInt(D.hours.toString().substr(0, 1));
			var hour_value = parseInt(D.hours.toString().substr(1, 1));
			
			var minute_d_value = parseInt(D.minutes.toString().substr(0, 1));
			var minute_value = parseInt(D.minutes.toString().substr(1, 1));
			
			var second_d_value = parseInt(D.seconds.toString().substr(0, 1));
			var second_value = parseInt(D.seconds.toString().substr(1, 1));
			
			day_h.find('.prev .text').text(day_h_value);
			day_d.find('.prev .text').text(day_d_value);
			day.find('.prev .text').text(day_value);
			
			num_value = (day_h_value == 0) ? 9 : day_h_value - 1;
			day_h.find('.current .text').text(num_value);
			num_value = (day_d_value == 0) ? 9 : day_d_value - 1;
			day_d.find('.current .text').text(num_value);
			num_value = (day_value == 0) ? 9 : day_value - 1;
			day.find('.current .text').text(num_value);
			
			hour_d.find('.prev .text').text(hour_d_value);
			hour.find('.prev .text').text(hour_value);
			
			num_value = (hour_d_value == 0) ? 2 : hour_d_value - 1;
			hour_d.find('.current .text').text(num_value);
			num_value = (hour_value == 0) ? 9 : hour_value - 1;
			hour.find('.current .text').text(num_value);
			
			minute_d.find('.prev .text').text(minute_d_value);
			minute.find('.prev .text').text(minute_value);
			
			num_value = (minute_d_value == 0) ? 5 : minute_d_value - 1;
			minute_d.find('.current .text').text(num_value);
			num_value = (minute_value == 0) ? 9 : minute_value - 1;
			minute.find('.current .text').text(num_value);
			
			second_d.find('.prev .text').text(second_d_value);
			second.find('.prev .text').text(second_value);
			
			num_value = (second_d_value == 0) ? 5 : second_d_value - 1;
			second_d.find('.current .text').text(num_value);
			num_value = (second_value == 0) ? 9 : second_value - 1;
			second.find('.current .text').text(num_value);
			
			jQuery('.block_countdown .num_wrapper').removeClass('start_animate');
			
			t2 = setTimeout(function() {
				second.find('.num_wrapper').addClass('start_animate');
				if(second_value == 0) second_d.find('.num_wrapper').addClass('start_animate');
				
				if(second_d_value == 0 && second_d.find('.num_wrapper').hasClass('start_animate')) minute.find('.num_wrapper').addClass('start_animate');
				if(minute_value == 0 && minute.find('.num_wrapper').hasClass('start_animate')) minute_d.find('.num_wrapper').addClass('start_animate');
				
				if(minute_d_value == 0 && minute_d.find('.num_wrapper').hasClass('start_animate')) hour.find('.num_wrapper').addClass('start_animate');
				if(hour_value == 0 && hour.find('.num_wrapper').hasClass('start_animate')) hour_d.find('.num_wrapper').addClass('start_animate');
				
				if(hour_d_value == 0 && hour_d.find('.num_wrapper').hasClass('start_animate')) day.find('.num_wrapper').addClass('start_animate');
				if(day_value == 0 && day.find('.num_wrapper').hasClass('start_animate')) day_d.find('.num_wrapper').addClass('start_animate');
				if(day_d_value == 0 && day_d.find('.num_wrapper').hasClass('start_animate')) day_h.find('.num_wrapper').addClass('start_animate');
			}, 400);
			
			
			
		} , 1000);
	}
	
});