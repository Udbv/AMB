/* browser selection */
var ie8 = (jQuery.browser.msie && jQuery.browser.version == '8.0') ? true : false;

/* mobile */
var isMobile = false;
var isiPad = false;
function isMobile_f() {
    var array_mobileIds = new Array('iphone', 'android', 'ipad', 'ipod');
    var uAgent = navigator.userAgent.toLowerCase();
    for (var i=0; i<array_mobileIds.length; i++) {
		if(uAgent.search(array_mobileIds[i]) > -1) {
			isMobile = true;
			if(array_mobileIds[i] == 'ipad') isiPad = true;
		}
    }
}
isMobile_f();

function init_menu() {
	var timer = new Array();
	jQuery('nav.main_menu > ul > li').hover(
		function() {
			clearTimeout(timer[jQuery('nav.main_menu > ul > li').index(this)]);
			jQuery(this).addClass('hover').find('> ul').show();
			
		},
		function() {
			var _this = this;
			timer[jQuery('nav.main_menu > ul > li').index(this)] = setTimeout(function() {
				jQuery(_this).removeClass('hover').find('> ul').hide();
			}, 5);
		}
	);
	
	jQuery('nav.main_menu a').click(function(e) {
		if(jQuery.support.touch) {
			var parent = jQuery(this).parent();
			if(((!parent.hasClass('expanded')) || jQuery(this).attr('href') == '#') && (parent.find('ul').length > 0)) {
				jQuery('nav.main_menu li').removeClass('expanded');
				jQuery(this).parent().toggleClass('expanded');
				e.preventDefault();
			}
		}
	});
	
	build_responsive_menu();
}

function build_responsive_menu() {
	jQuery('header nav.main_menu').append('<div class="main_menu_r"><div class="icon"></div><span>Navigate</span><select><option value="#"></option></select></div>');
	
	jQuery('nav.main_menu li').each(function() {
		var child = jQuery(this);
		
		var lnk = child.find('> a').clone();
		lnk.find('span').remove();
		
		var level = child.parents('ul').length - 1;
		var dash = '';
		for(i = 0; i < level; i++) {
			dash += '-';
		}
		
		var path = lnk.attr('href');
		var text = ' ' + dash +  ' ' + lnk.text();
		var opt = '<option value="' + path + '">' + text + '</option>';
		jQuery('header nav.main_menu select').append(opt);
	});
	
	
	jQuery('header nav.main_menu select').change(function() {
		window.location = jQuery(this).find('option:selected').val();
	});
}

function init_sticky_footer() {
	var page_height = jQuery('.wrapper').height();
	var window_height = jQuery(window).height();
	if(page_height <= window_height) {
		if(jQuery('.wrapper').hasClass('sticky_footer')) {
			jQuery('.wrapper').addClass('need');
			jQuery('#content > .general_content').css('padding-bottom', jQuery('footer').outerHeight() + 'px');
		}
	}
	else {
		jQuery('.wrapper').removeClass('need');
		jQuery('#content > .general_content').css('padding-bottom', '0px');
	}
}

function init_fields() {
	jQuery('.w_def_text').each(function() {
		var text = jQuery(this).attr('title');
		
		if(jQuery(this).val() == '') {
			jQuery(this).val(text);
		}
	});
	
	jQuery('.w_def_text').live('click', function() {
		var text = jQuery(this).attr('title');
		
		if(jQuery(this).val() == text) {
			jQuery(this).val('');
		}
		
		jQuery(this).focus();
	});
	
	jQuery('.w_def_text').live('blur', function() {
		var text = jQuery(this).attr('title');
		
		if(jQuery(this).val() == '') {
			jQuery(this).val(text);
		}
	});
	
	jQuery('.custom_select').each(function() {
		jQuery(this).css('opacity', '0');
		jQuery(this).parent().append('<span />');
		var text = jQuery(this).find('option:selected').html();
		jQuery(this).parent().find('span').html(text);
	});
	
	jQuery('.custom_select').live('change', function() {
		var text = jQuery(this).find('option:selected').html();
		jQuery(this).parent().find('span').html(text);
	});
}

function init_pretty_photo() {
	if(!isMobile || isiPad) {
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
			deeplinking : false,
			keyboard_shortcuts : false,
			slideshow : false,
			counter_separator_label : ' of ',
			gallery_markup : ''
		});
	}
}

function init_message_boxes() {
	jQuery('.general_info_box .close').live('click', function(e) {
		jQuery(this).parent().fadeOut(300);
		e.preventDefault();
	});
}

function init_skills() {
	jQuery('.block_levels .progress div').each(function() {
		var w = jQuery(this).attr('data-level');
		jQuery(this).animate({width : w + '%'}, 500);
	});
}

function init_blog_style_2() {
	jQuery('.block_blog_2').isotope({
		itemSelector : 'article'
	});
	jQuery(window).resize(function() {
		jQuery('.block_blog_2').isotope('reLayout');
	});
}

function init_blog_style_3() {
	jQuery('.block_blog_3').isotope({
		itemSelector : 'article'
	});
	jQuery(window).resize(function() {
		jQuery('.block_blog_3').isotope('reLayout');
	});
}

function init_button_more() {
	jQuery('#view_more_button').bind('click', function(e) {
		var target = jQuery(this).attr('data-target');
		var container = jQuery(target);
		
		var content = jQuery('article' ,container).clone(); //instead of this do ajax request and get new elements, this line only for demo
		
		if(jQuery(target).hasClass('isotope')) {
			jQuery(target).isotope('insert', content);
		}
		else {
			jQuery(target).append(content);
		}
		
		init_pretty_photo();
		e.preventDefault();
	});
}

function init_popup() {
	jQuery('.open_popup').click(function(e) {
		var target = jQuery(this).attr('href');
		jQuery('#overlay').show();
		jQuery(target).show(500);
		
		e.preventDefault();
	});
	
	jQuery('#overlay').click(function(e) {
		jQuery('.block_popup').hide(500, function() {
			jQuery('#overlay').hide();
		});
		
		e.preventDefault();
	});
}

function init_animated_caption() {
	jQuery('.w_animated_caption > div').each(function(num) {
		var animation_style = jQuery(this).attr('data-animation');
		jQuery(this).show().addClass('animate' + num).addClass(animation_style);
	});
}

function init_filter() {
	var jQuerycontainer = jQuery('#filtered_container');
	
	jQuerycontainer.isotope();
	
	jQuery('#filter a').live('click', function(e) {
		var selector = jQuery(this).attr('href');
		if(selector == 'all') selector = '*'
		else selector = '.' + selector;
		
		jQuerycontainer.isotope({
			filter : selector
		});
		
		jQuery('#filter li').removeClass('active');
		jQuery(this).parent().addClass('active');
		
		e.preventDefault();
	});
	
	jQuery(window).resize(function() {
		jQuerycontainer.isotope('reLayout');
	});
}

function add_leading_zero(num) {
	var result = (num < 10) ? '0' + num.toString() : num;
	
	return result;
}

function init_slider_grid(source) {
	var container = jQuery(source);
	var content_width = 0;
	var content_height = 0;
	jQuery('.pics li', container).each(function() {
		content_width += parseInt(jQuery(this).outerWidth());
	});
	content_width += parseInt(jQuery('.pics', container).css('padding-left'));
	
	jQuery('.content', container).css('width', content_width + 'px').addClass('overview');
	content_height = jQuery('.content', container).height();
	
	jQuery('.content', container).wrap('<div class="viewport" style="height:' + content_height + 'px" />');
	container.append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="icon"></div></div></div></div>');
	var slider = container.tinyscrollbar({
		axis : 'x',
		scroll : false
	});
	
	jQuery(window).resize(function() {
		var content_width = 0;
		var content_height = 0;
		jQuery('.pics li', container).each(function() {
			content_width += jQuery(this).outerWidth();
		});
		content_width += parseInt(jQuery('.pics', container).css('padding-left'));
		
		jQuery('.content', container).css('width', content_width + 'px');
		content_height = jQuery('.content', container).height();
		content_height = jQuery('.viewport', container).css('height', content_height + 'px');
		
		container.tinyscrollbar_update('relative');
	});
}

function init_project_popup() {
	function show_project(source) {
		jQuery('.current_project').removeClass('current_project');
		
		var sroll_point = jQuery(window).scrollTop();
		var w_height = jQuery(window).height();
		var project = source.addClass('current_project').find('.block_project').clone();
		
		project.find('.flexslider').attr('id', 'slider_projects');
		
		jQuery('body').append('<div class="block_popup_project"><a href="#" class="close">Close</a></div>');
		jQuery('body').append('<div id="overlay_project"></div>');
		jQuery('#overlay_project').append('<div class="block_projects_nav"><a href="#" id="project_prev">Previous</a><a href="#" id="project_back">Back</a><a href="#" id="project_next">Next</a></div>');
		
		if(source.prev().length < 1) jQuery('#project_prev').hide();
		if(source.next().length < 1) jQuery('#project_next').hide();
		
		var p_height = jQuery('.block_popup_project').height();
		var position = ((w_height > p_height) && p_height > 0) ? (w_height - p_height) / 2 + sroll_point : sroll_point;
		
		jQuery('.block_popup_project').css('top', position + 'px').append(project);
		
		jQuery('#slider_projects').flexslider({
			animation : 'slide',
			controlNav : false,
			directionNav : true,
			animationLoop : true,
			slideshow : false,
			useCSS : true
		});
	}
	
	jQuery("a[data-rel^='popupProject']").live('click', function(e) {
		var project = jQuery(this).parent().parent().parent();
		show_project(project);
		
		e.preventDefault();
	});
	
	jQuery('#project_prev').live('click', function(e) {
		var project = jQuery('.current_project').prev();
		jQuery('.block_popup_project').remove();
		jQuery('#overlay_project').remove();
		
		show_project(project);
		
		e.preventDefault();
	});
	
	jQuery('#project_next').live('click', function(e) {
		var project = jQuery('.current_project').next();
		jQuery('.block_popup_project').remove();
		jQuery('#overlay_project').remove();
		
		show_project(project);
		
		e.preventDefault();
	});
	
	jQuery('.block_popup_project .close, #project_back').live('click', function(e) {
		jQuery('.block_popup_project').remove();
		jQuery('#overlay_project').remove();
		
		e.preventDefault();
	});
	
}

function init_pricing_table() {
	jQuery('.block_pricing_table_2').each(function() {
		var table = $(this);
		table.find('.column.category .cell').each(function() {
			var name = '<span class="alt_text">' + $(this).html() + '</span> ';
			var num = $('.column.category .cell').index(this);
			
			table.find('.column:not(.category)').each(function() {
				$(this).find('.cell').eq(num).prepend(name);
			});
		});
	});
}

function init_map(address, description, point) {
	var address_position;
	var latlng = new google.maps.LatLng(0, 0);
	var myOptions = {
		zoom: 16,
		center: latlng,
		scrollwheel: true,
		scaleControl: false,
		disableDefaultUI: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), myOptions);
	var custom_map = new google.maps.Geocoder();
	custom_map.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			address_position = results[0].geometry.location;
			map.setCenter(address_position);
			var marker = new google.maps.Marker({
				map: map,
				icon: point,
				position: map.getCenter()
			});
			var contentString = description;
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		}
		else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
	
	jQuery(window).resize(function() {
		map.setCenter(address_position);
	});
}

function init_button_up() {
	jQuery('body').append('<div class="block_button_up"><a href="#" id="button_up">Up</a></div>');
	jQuery('#button_up').click(function(e) {
		$.scrollTo(0, 500);
		
		e.preventDefault();
	});
	if(jQuery(window).scrollTop() > 0) {
		jQuery('#button_up').addClass('visible');
	}
	jQuery(window).scroll(function() {
		if(jQuery(window).scrollTop() > 0) {
			jQuery('#button_up').addClass('visible');
		}
		else {
			jQuery('#button_up').removeClass('visible');
		}
	});
}

function init_home_scroller(target, width_1, width_2, width_3, width_4, width_5) {
	var timer;
	var element_width;
	/* content width */
	var resolution_1 = 1480;
	var resolution_2 = 980;
	var resolution_3 = 760;
	var resolution_4 = 420;
	var resolution_5 = 300;
	var wrapper_width = jQuery('#content .inner').width();
	
	function set_element_width() {
		if(wrapper_width >= resolution_5) element_width = width_5;
		if(wrapper_width >= resolution_4) element_width = width_4;
		if(wrapper_width >= resolution_3) element_width = width_3;
		if(wrapper_width >= resolution_2) element_width = width_2;
		if(wrapper_width >= resolution_1) element_width = width_1;
	}
	set_element_width();
	
	function init_plugin() {
		var timer;
		jQuery(target).parent().addClass('not_loaded');
		jQuery(target).smoothDivScroll({
			hotSpotScrolling : false,
			easingAfterHotSpotScrolling : false,
			moveOnClick : element_width,
			manualContinuousScrolling : true,
			touchScrolling : true,
			setupComplete : function() {
				jQuery(target).parent().removeClass('not_loaded');
			},
			windowResized : function(e, scroller) {
				jQuery(target).smoothDivScroll('recalculateScrollableArea');
				clearTimeout(timer);
				timer = setTimeout(function() {scroller.opts.moveOnClick = element_width;}, 100);
			}
		});
	}
	init_plugin();
	
	jQuery(window).resize(function() {
		wrapper_width = jQuery('#content .inner').width();
		set_element_width();
	});
}

function init_validation(target) {
	function validate(target) {
		var valid = true;
		jQuery(target).find('.req').each(function() {
			if(jQuery(this).val() == '') {
				valid = false;
				jQuery(this).parent().addClass('errored');
			}
			else {
				jQuery(this).parent().removeClass('errored');
			}
		});
		return valid;
	}
	
	jQuery('form.w_validation').live('submit', function(e) {
		var valid = validate(this);
		if(!valid) e.preventDefault();
	});
	
	if(target) {return validate(target);}
}

jQuery(document).ready(function() {
	init_sticky_footer();
	init_fields();
	init_pricing_table();
	
	init_message_boxes();
	init_button_more();
	init_popup();
	
	jQuery('.general_tooltip').tooltip({
		position : 'top right',
		offset : [-10, -30],
		effect: 'fade'
	});
	
	if(jQuery.support.touch) {
		jQuery('body').addClass('touch_device');
	}
});

jQuery(window).resize(function() {
	init_sticky_footer();
});

jQuery(window).load(function() {
	init_skills();
	init_animated_caption();
	init_filter();
	init_validation();
	init_sticky_footer();
	init_project_popup();
	init_blog_style_2();
	init_blog_style_3();
	init_button_up();
	
	jQuery('.general_not_loaded').removeClass('general_not_loaded');
});

jQuery(function() {
	init_menu();
	init_pretty_photo();
	init_sticky_footer();
});