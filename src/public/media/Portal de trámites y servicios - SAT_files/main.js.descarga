$(document).ready(init);
$(window).resize(resize);

var acdata = [ // Autocompletar
		"Adriana",
		"Alessandra",
		"Behati",
		"Candice",
		"Doutzen",
		"Erin",
		"Gisele",
		"Laetitia",
		"Lily",
		"Lindsay",
		"Marisa",
		"Miranda",
		];

var modulos = [[],['Módulo D.F. 1','Módulo D.F. 2','Módulo D.F. 3'], // Módulos
				['Módulo COAH 1','Módulo COAH 2','Módulo COAH 3'],
				['Módulo SON 1','Módulo SON 2','Módulo SON 3']];

var URLAdvancedSearch = ''; // Url de la página de búsqueda avanzada


function init()
{
//document.querySelector('div.ab_containb').id = 'topNavID';
//var myElement = document.getElementById('topNavID');
//var mc = new Hammer(topNavID);
  // $(".owl-carousel").owlCarousel();
	setupCollapsible();	
	
	setupScrollButtons();
	
	setupTabClicks();
	
	setupSubmenu();
	
	langHandler();
	
	$('#top_search, #mob_search_input').autocomplete({source:acdata,open:function(event,ui)
		{
            //$(".ui-autocomplete").prepend('<li class="ui-menu-item advanced_search_autoc green" onclick="window.location=\'' + URLAdvancedSearch + '\';">' + lt_busquedaavanzada  + ' ></li>');
        }});
	
	$('#dd_menu').selectmenu({change:mobileMenu}).selectmenu( "menuWidget" ).addClass( "overf" );

	
	$('#ur_estado').selectmenu({change:sb_mod_esHandler,placeholder:'Estado'});
	$('#ur_modulo').selectmenu({placeholder:'Módulo'});
	
	//$('#mob_menu_select').selectmenu({change:mobileMenu});
	$('#mob_menu_select').selectmenu({change:mobileMenu}).selectmenu( "menuWidget" ).addClass( "overf" );
	
	sidebarmt();
	
	cgallerySetup();
	
	$('#footer .links span').click(footerLinksMobile);
	
	$('#mob_icons').html($('#icons').html());
/*
	$('.tooltip').on('touchstart',function(e)
	{
		if($(this).children('span').css('visibility') != 'visible')
		{
			$(this).siblings().children('span').css('visibility','hidden');

			if ($(this).siblings().children('span').last().children().length > 0 ) {
			$(this).siblings().children('span').last().css('visibility','visible');
			}

			e.preventDefault();

			$(this).children('span').css('visibility','visible');
			$(this).children('span').css('width','80px');
			$(this).children('span').css('opacity','0.9');
			$(this).children('span').css('top','28px');
			$(this).children('span').css('right','-11px');
			$(this).children('span').css('font-size','12px');
			$(this).children('span').css('letter-spacing','normal');
			$(this).children('span').css('z-index','99999999 !important');
			$(this).children('span').css('position','absolute');
		$(this).children('span').css('height','16px');		}
	});
	*/
	$('.home-tabs-button').click(function(){setTimeout(homeSlidesHeightFix,50);});

	$(".filter_link").click(function(e){ 
		e.stopPropagation(); 
		setFilterAndGoTo(this);
		return false;
	});
	
	mobileLang();
	
	$('#mob_icons').html($('#icons').html());
	
	$('style').remove();
	
	paginationCrop();

	/* ----------- oculta menu en escritorio y movil ----------- */
	$("#menu-top-buzon").click(function(){						
		$("#action_bar2,#top_bar,#icons,.btInicio,#menu-top-buzon").hide();
		$("#menu-top-buzon-none").show();
		$("#logo_bar").addClass("menu-hide");

		$("#action_bar2,#mob_head,#menu-top-buzon2").hide();
		$("#menu-top-buzon-none2").show();

	if ( $( "#refill" ).length ) {
    	var h = window.innerHeight;
	var y= h-document.getElementById("refill").offsetTop;
	if (y>0)
  	document.getElementById("refill").style.height=y+'px';
	else
  	document.getElementById("refill").style.height='0px';
	}


	});	

	$("#menu-top-buzon-none").click(function(){						
		$("#action_bar2,#top_bar,#icons,.btInicio,#menu-top-buzon").show();
		$("#menu-top-buzon-none").hide();
		$("#logo_bar").removeClass("menu-hide");

		$("#action_bar2,#mob_head,#menu-top-buzon2").show();
		$("#menu-top-buzon-none2").hide();
	});	

	$("#menu-top-buzon2").click(function(){						
		$("#action_bar2,#mob_head,#menu-top-buzon2").hide();
		$("#menu-top-buzon-none2").show();

		$("#action_bar2,#top_bar,#icons,.btInicio,#menu-top-buzon").hide();
		$("#menu-top-buzon-none").show();
		$("#logo_bar").addClass("menu-hide");
	});
	$("#menu-top-buzon-none2").click(function(){						
		$("#action_bar2,#mob_head,#menu-top-buzon2").show();
		$("#menu-top-buzon-none2").hide();

		$("#action_bar2,#top_bar,#icons,.btInicio,#menu-top-buzon").show();
		$("#menu-top-buzon-none").hide();
		$("#logo_bar").removeClass("menu-hide");
	});


	if ( $( "#refill" ).length ) {
    	var h = window.innerHeight;
	var y= h-document.getElementById("refill").offsetTop;
	if (y>0)
  	document.getElementById("refill").style.height=y+'px';
	else
  	document.getElementById("refill").style.height='0px';
	}

}

$(window).load(function()
{
	$('.htb_active').click();
	
	homeSlidesHeightFix();
});

function paginationCrop()
{
	$('.pagination ul').each(function(j,f)
	{
		var pagination_tl = $(this).children('li').length;
		
		if(pagination_tl >= 8)
		{
			$(this).children('li').each(function(i,e)
			{
				if(i > 3 && i < (pagination_tl - 4))
				{
					$(this).hide();
					
					if(i == 4){$('<li>...</li>').insertAfter(this);}
				}
			});
		}
	});
}

function homeSlidesHeightFix()
{
	$('#ht-1').height($('#home-tabs-container').height());
	
	var htc_c = $('#ht-1').is(':visible') ? 10:32;
	var htc_h = $(window).width() <= 480 ? (($('.home-tabs-button').length * 48) + htc_c) + 'px':'0px';
	
	$('#home-tabs-container').css('padding-top',htc_h);
	
	$('#home-tabs-container').height($('#ht-1').is(':visible') && $(window).width() <= 480 ? proportionImg() + 25:$(window).width() <= 480 ? 260:300);
	
	//if(typeof(setSlider) == 'function'){setSlider();}
}

function proportionImg()
{
	var img = new Image;
	img.src = $('#ht-1').css('background-image').replace(/url\(|\)$/ig,"");
	
	var imgW = img.width;
	var imgH = img.height;
	
	var newW, newH;
	
	if(imgW > imgH)
	{
		newW = $('#ht-1').width();
		newH = imgH / imgW * newW;
	}
	else
	{
		newH = $('#ht-1').height();
		newW = imgW / imgH * newH;
	}
	
	return newH;
}

function mobileLang()
{
//	var b_a = '';
//	b_a += '<div style="width:50px;height:50px;position:absolute;right:0;top:0;cursor:pointer;"onclick="mobileLangToggle();">';
//	b_a += '</div>';

//	$('#mob_page_title').css('position','relative').append(b_a);

//	var mob_lang_list_atts = 'width:98%;margin:0;padding:0 0 5px 2%;list-style-type:none;background-color:#ccc;position:absolute;top:50px;left:0;z-index:999999;display:none;';
//	$('#mob_page_title').append('<ul style="' + mob_lang_list_atts + '">' + $('#lang ul').html() + '</ul>');
}

function mobileLangToggle()
{
	$('#mob_page_title ul').slideToggle();
}

function resize()
{
  $( "#myElement" ).css("margin-left" ,0);
	sidebarmt();
	
	mobileMenuFix();
	
	homeSlidesHeightFix();


	var nli=$("ul.topnav").children("li").size();
	if (nli <7)
	{
		$('ul.topnav').css('width', '100%');
		$('ul.topnav li').addClass( "aju" );
	}
	else
	{
		$('ul.topnav li').removeClass( "aju" );
	}


 	if ( $( "#moda:visible" ).length ) {      
      $('#moda').dialog("destroy");   
        $('#moda').dialog({		         
	   modal: true,
	   width: 'auto',
	   buttons: [
	        {
	            text: "Aceptar",
	            class: 'buttonx',
	            click: function() {$( this ).dialog( "close" );}
	        }
	    ],
  	open: function(){	    
	    	$('body').css('position','fixed');	      
	    },
	    close: function(){	    
	    	$('body').css('position','relative');
	    }
	   });
         $('.ui-dialog-titlebar').hide(); 	
	}

	if ( $( "#mods:visible" ).length ) {  
        var rut = $("#mods").data('ruta');
        $('#mods').dialog("destroy");
  	  $('#mods').dialog({
	   modal: true,
	   width: 'auto',
	   buttons: [
	        {
	            text: "Aceptar",
	            class: 'buttonx',
	            click: function() {window.location=rut;  }
	        },
	        {
	            text: "Cancelar",
	            class: 'buttonx',
	            click: function() {$( this ).dialog( "close" );}
	        }
	    ],
  	   open: function(){	    
	    	$('body').css('position','fixed');	      
	    },
	    close: function(){	    
	    	$('body').css('position','relative');
	    }

	  });
         $('.ui-dialog-titlebar').hide(); 
	}


	if ( $( "#modm:visible" ).length ) {  
        var rut = $("#modm").data('ruta');
        $('#modm').dialog("destroy");
  	  $('#modm').dialog({
		modal: true,
		 width: 'auto',
		 resizable: false,
		 minHeight: 130,
		 maxHeight: 300,		   
		buttons: [
	        {
	            text: "Ver alertas",
	            class: 'buttonx',
	            click: function() {window.location=rut;  }
	        },
	        {
	            text: "Cancelar",
	            class: 'buttonx',
	            click: function() {$( this ).dialog( "close" );}
	        }
	    ],
  	  open: function(){	    
	    	$('body').css('position','fixed');	      
	    },
	    close: function(){	    
	    	$('body').css('position','relative');
	    }

	  });
         $('.ui-dialog-titlebar').hide(); 
	}




	if ( $( "#refill" ).length ) {
    	var h = window.innerHeight;
	var y= h-document.getElementById("refill").offsetTop;
	if (y>0)
  	document.getElementById("refill").style.height=y+'px';
	else
  	document.getElementById("refill").style.height='0px';
	}


}

function sidebarmt()
{
	$('#content #main').css('min-height',($('#sidebar').height() - $('#header').height()) + 'px');
}

function mobileMenu(e,d)
{
	var url = d.item.value;
	var cat_id = d.item.element[0].id;
	setFilterAndGoToMobile(cat_id,url);

}

function mobileMenuFix()
{
 $('#mob_menu_select').selectmenu("destroy").selectmenu();
 $('#mob_menu_select').selectmenu({change:mobileMenu}).selectmenu( "menuWidget" ).addClass( "overf" );
 $('#dd_menu').selectmenu("destroy").selectmenu();
 $('#dd_menu').selectmenu({change:mobileMenu}).selectmenu( "menuWidget" ).addClass( "overf" );
 $('#select_foldername').selectmenu("destroy").selectmenu();
 $('#sortby_inline').selectmenu("destroy").selectmenu(); 
  try {  
       $('#idx').selectmenu("destroy").selectmenu();	
  } catch(err) {}
 try {  
 $('#categorySelect').selectmenu("destroy").selectmenu();
 } catch(err) {} 
 try {  
 $('#subcategorySelect').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#sortby').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#total').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#typevent').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#number').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#typeid').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#ui-id-73').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#dd_menu_busqueda').selectmenu("destroy").selectmenu();
 } catch(err) {}
 try {  
 $('#dd_menu_busqueda').selectmenu({change:mobileMenu2});
 } catch(err) {}
 if(typeof changeCategoryFn=== 'function') { 
         $('#categorySelect').selectmenu({change:changeCategoryFn});
 } 
 //$("div.ab_containb").css({"margin-left":"-300px"});
 //$("div.ab_containb").addClass("rezised-menu");
  							 
 $(document).ready(changerezise);
 


 	
}

function changerezise() { 
			$('#dd_menu').selectmenu({change:mobileMenu}).selectmenu( "menuWidget" ).addClass( "overf" );	
                     $('#mob_menu_select').selectmenu({change:mobileMenu}).selectmenu( "menuWidget" ).addClass( "overf" );
}

String.prototype.splice = function(idx,rem,s)
{
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function setupCollapsible()
{
	$('.collapsible .c').each(function(i,e)
	{
		if($(this).hasClass('collapsed'))
		{
			$(this).hide();
			$(this).siblings('h4').removeClass('ctmn').addClass('ctpl');
		}
		else
		{
			$(this).siblings('h4').removeClass('ctpl').addClass('ctmn');
		}
	});	


	$('.collapsible .c2').each(function(i,e)
	{
		if($(this).hasClass('collapsed'))
		{
			$(this).hide();
			$(this).siblings('h4').removeClass('ctmn').addClass('ctpl');
		}
		else
		{
			$(this).siblings('h4').removeClass('ctpl').addClass('ctmn');
		}
	});	




	$('.collapsible h4').click(collapsibleHandler);


}

function collapsibleHandler(e)
{
	var c;
	if ( $( ".c" ).length ) {
 
	    c = $(this).siblings('.c'); 
	  if($(c).is(':visible'))
	  {
		$(c).slideUp();
		$(this).removeClass('ctmn').addClass('ctpl');
	  }
	  else
	  {
		$(c).slideDown();
		$(this).removeClass('ctpl').addClass('ctmn');
	  }	

	}
	if ( $( ".c2" ).length  && $(this).siblings('.c2').length){
	   c = $(this).siblings('.c2'); 
	  if($(c).is(':visible'))
	  {
		$(c).slideUp();
		$(this).removeClass('ctmn').addClass('ctpl');
	  }
	  else
	  {
		$(c).slideDown();
		$(this).removeClass('ctpl').addClass('ctmn');
	  }	


	}	
		
}




function setupScrollButtons()
{
	$('.ab_scroll').mousedown(scrollHandlerMenu).mouseup(scrollStopMenu).mouseleave(scrollStopMenu);
	
	$('.ab_scroll').on('touchstart',scrollHandlerMenu).on('touchend',scrollStopMenu).on('touchmove',scrollStopMenu);
	$('.ab_scroll2').mousedown(scrollHandlerMenu2).mouseup(scrollStopMenu2).mouseleave(scrollStopMenu2);
	
	$('.ab_scroll2').on('touchstart',scrollHandlerMenu2).on('touchend',scrollStopMenu2).on('touchmove',scrollStopMenu2);
}

function scrollHandlerMenu(e)
{
	//var s = $('#action_bar .pw, #home_action_bar .pw');
	var s = $(e.target).siblings('.pw');
	
	var n = $(e.target).attr('id') == 'ab_sl' ? (s).scrollLeft() - 30:(s).scrollLeft() + 30;
	
	//$(s).scrollLeft(n);
	$(s).animate({scrollLeft:n},{easing:'linear',duration:200,complete:function(){scrollHandlerMenu(e);}});
}

function scrollStopMenu(e)
{
	var s = $(this).siblings('.pw');

	$(s).stop();
}


function scrollHandlerMenu2(e)
{	
	var s = $(e.target).siblings('.topnav');
	
	var n = $(e.target).attr('id') == 'ab_sl' ? (s).scrollLeft() - 30:(s).scrollLeft() + 30;	
	$(s).animate({scrollLeft:n},{easing:'linear',duration:200,complete:function(){scrollHandlerMenu(e);}});
}

function scrollStopMenu2(e)
{
	var s = $(this).siblings('.topnav');
	$(s).stop();
}









function setupTabClicks()
{
	$('.tab_button').click(function()
	{
		$('.tab_button').removeClass('active');
		
		$(this).addClass('active');
		
		$('.tab').hide();
		
		var activeTab = $(this).attr('data-tab');
		
		$(activeTab).show();
	});
	
//	$('.tab_button').first().click();
	$('.tab_button').each(function(i, obj) {		
	    $('.tab_button').removeClass('active');
		 
	    if ( $(this).text() != "" ) {		    	    	    	 	    			
		$(this).addClass('active');		
		$('.tab').hide();		
		var activeTab = $(this).attr('data-tab');		
		$(activeTab).show();
		 return false;	    	
	    }
	  
	});

}

function setupSubmenu()
{
	$('#menu li').mouseover(function()
	{
		$('#submenu ul, #submenu').hide();
		
		$('#menu li').removeClass('menu_active_tmp');
		
		if(!!$(this).attr('data-submenu'))
		{
			var e = '#' + $(this).attr('data-submenu');
			
			$('#submenu, ' + e).show();
			
			$(this).addClass('menu_active_tmp');
		}
	});
	
	$('#submenu').mouseleave(function()
	{
		$('#submenu ul, #submenu').hide();
		
		$('#menu li').removeClass('menu_active_tmp');
	});
}

function langHandler()
{
	$('#lang .trigger').mouseover(function()
	{
		$('#lang ul').slideDown();
	});
	
	$('#lang').mouseleave(function()
	{
		$('#lang ul').slideUp();
	});
}

function sb_mod_esHandler(e,d)
{
	$('#ur_modulo').selectmenu('disable'); 
	$('#ur_modulo').html('');
	modulos[d.item.value].forEach(function(e){$('#ur_modulo').append($("<option></option>").attr("value",e).text(e));});
	$('#ur_modulo').selectmenu('destroy').selectmenu();
	$('#ur_modulo').selectmenu('enable'); 
}

$.widget( 'app.selectmenu', $.ui.selectmenu,{
    _drawButton: function()
    {
        this._super();
        
        var selected = this.element
                .find( '[selected]' )
                .length,
            placeholder = this.options.placeholder;
        
        if ( !selected && placeholder ) {
            this.buttonText.text( placeholder );    
        }
    }
});

// Pagination

function setPagination()
{
	var phtml = '<ul><li onclick="setPage(\'prev\')">&larr;</li>';
	
	$('.page').hide().each(function(i,e)
	{
		var page  = i + 1;
		
		phtml += '<li onclick="setPage(' + page + ');">' + page + '</li>';
	});
	
	phtml += '<li onclick="setPage(\'next\')">&rarr;</li></ul>';
	
	$('.pagination').append(phtml);
}

function setPage(n)
{
	// Set page div
	
	if(n == 'next'){n = currentPage() + 1;}
	if(n == 'prev'){n = currentPage() - 1;}
	
	if($('#page-' + n).length > 0)
	{
		$('.page').hide();
		
		$('#page-' + n).show();
		
		// Set pagination div
		
		$('.pagination ul li').removeClass('pagination_active').each(function(i,e)
		{
			if($(e).text() == n){$(e).addClass('pagination_active');}
		});
	}
}

function currentPage()
{
	var result = 0;
	
	$('.pagination ul li').each(function(i,e)
	{
		if($(e).hasClass('pagination_active')){result = parseInt($(e).text());}
	});
	
	return result;
}


function cgallerySetup()
{
	$('.c_gallery .scroll').click(cgalleryscrollHandlerMenu);
	
	$('.thumbs_container img').click(cgalleryHandler);
}

function cgalleryscrollHandlerMenu(e)
{
	var s = $('.c_gallery .thumbs');
	
	var n = $(this).is('.slide_left') ? (s).scrollLeft() - 50:(s).scrollLeft() + 50;
	
	$(s).scrollLeft(n);
}

function cgalleryHandler(e)
{
	$('.c_gallery_main').attr('src',$(this).attr('rel'));
	$('.c_gallery_description').html($(this).attr('title'));
}

function setModal(o)
{
	$('#modal').hide();

	$('#modal').height($(document).height());
$('#modal').width($(document).width());

	$('#modal .title').html(o.title);
	
	$('#modal .modal_data').html(o.data);
	
	$('#modal .modal_action').html(o.action_label).click(typeof(o.action) != 'undefined' ? o.action:null);
	
	$('#modal .modal_cancel').click(typeof(o.cancel) != 'undefined' ? o.cancel:null);
	
	$('#modal .bottom_note').html(o.bottom_note);
	
	$('#modal').fadeIn();
	
	if(typeof(o.callback) != 'undefined'){o.callback();}
}

function unsetModal()
{
	$('#modal').fadeOut();
}

function footerLinksMobile(e)
{
	var element = $(this);
	
	if(!$(element).children('p').is(':visible'))
	{
		$('#footer .links p').slideUp();
		
		$('#footer .links p').promise().done(function()
		{
			$(element).children('p').finish().slideDown();
		});
	}
	else
	{
		$(element).children('p').slideUp();
	}
}

function fixNc()
{
	var elementHeights = $('.nc').map(function(){return $(this).height();}).get();
	var maxHeight = Math.max.apply(null, elementHeights);
	//$('.nc').height(maxHeight);
}

function setModalCustom(modal_selector_text, modal_data)
{
	$(modal_selector_text).hide();
	
	$(modal_selector_text).height($(document).height());
	
	$(modal_selector_text + ' .title').html(modal_data.title);
	
	$(modal_selector_text + ' .modal_data').html(modal_data.data);
	
	$(modal_selector_text + ' .modal_action').html(modal_data.action_label).click(typeof(modal_data.action) != 'undefined' ? modal_data.action:null);
	
	$(modal_selector_text + ' .modal_cancel').click(typeof(modal_data.cancel) != 'undefined' ? modal_data.cancel:null);
	
	$(modal_selector_text + ' .bottom_note').html(modal_data.bottom_note);
	
	$(modal_selector_text).fadeIn();
	
	if(typeof(modal_data.callback) != 'undefined'){modal_data.callback();}
}

function unsetModalCorreo()
{
	$('#modal_correo').fadeOut();
 
 var myElem = document.getElementById('myElement');         

if (myElem) {
  var barra= parseInt($( "#myElement" ).css("width"));  
  if (barra<=480){
   try {  
       var iframetoloadTopPosition = jQuery('#sidebar').offset().top;
       if (iframetoloadTopPosition>0 )
            jQuery('html, body').animate({scrollTop: iframetoloadTopPosition}, 800);	
      } catch(err) {}
   }
}    
}

function unsetModalFav()
{
 var myElem = document.getElementById('myElement');         
    
    if (myElem) {
      var barra= parseInt($( "#myElement" ).css("width"));  
      if (barra<=480){
       try {  
           var iframetoloadTopPosition = jQuery('#sidebar').offset().top;
           if (iframetoloadTopPosition>0 )
                jQuery('html, body').animate({scrollTop: iframetoloadTopPosition}, 800);	
          } catch(err) {}
       }
    }
	$('#modal_fav').fadeOut();
}

function saveFavorito(){
	//console.info($("#form"));
  try {  
       var iframetoloadTopPosition = jQuery('#sidebar').offset().top;
       if (iframetoloadTopPosition>0 )
            jQuery('html, body').animate({scrollTop: iframetoloadTopPosition}, 800);	
   } catch(err) {}
	$("#form_fav").submit();
}

function enviarCorreo(){
      try {  
       var iframetoloadTopPosition = jQuery('#sidebar').offset().top;
       if (iframetoloadTopPosition>0 )
            jQuery('html, body').animate({scrollTop: iframetoloadTopPosition}, 800);	
      } catch(err) {}
	$("#form_correo").submit();
}

function buscarOficinas(){
	$("#form_find_offices").submit();
}

function riseUpPopUpFaq(id)
{
   $('#popupDataFaq'+id).css('display','');
   var modal_data ={'title':'Preguntas Frecuentes',
			'data': $('#popupDataFaq'+id).html(),
			'action_label':'Aceptar',
			'action':unsetModalFaqs,
			'cancel':unsetModalFaqs,
			'callback':function(){
				$('#popupDataFaq'+id).css('display','none');
				$('.modal_cancel').hide();
				}
		};
	var selector = "#modalFaqs";	
   setModalCustom(selector,modal_data);
    $("html, body").animate({scrollTop:"0px"});
}

function riseUpPopUpFaqInUS(id)
{
   $('#popupDataFaq'+id).css('display','');
   var modal_data ={'title':'Frequently asked questions',
			'data': $('#popupDataFaq'+id).html(),
			'action_label':'OK',
			'action':unsetModalFaqs,
			'cancel':unsetModalFaqs,
			'callback':function(){
				$('#popupDataFaq'+id).css('display','none');
				$('.modal_cancel').hide();
				}
		};
	var selector = "#modalFaqs";	
   setModalCustom(selector,modal_data);
}

function unsetModalFaqs()
{
	$('#modalFaqs').fadeOut();
 
 var myElem = document.getElementById('myElement');         
if (myElem) {
  var barra= parseInt($( "#myElement" ).css("width"));  
  if (barra<=480){
  try {  
       var iframetoloadTopPosition = jQuery('#tresFAQ').offset().top-60;        
       var isVisible = $('#tresFAQ').is(':visible');        
       if (iframetoloadTopPosition>0  && isVisible)           
            jQuery('html, body').animate({scrollTop: iframetoloadTopPosition}, 800);	
      } catch(err) {}
      
      try {
        
       var iframetoloadTopPosition = jQuery('#todoFAQ').offset().top-60;        
       var isVisible = $('#todoFAQ').is(':visible');           
       if (iframetoloadTopPosition>0 && isVisible )
            jQuery('html, body').animate({scrollTop: iframetoloadTopPosition}, 800);	
      } catch(err) {}
        try {  
       var iframetoloadTopPosition = jQuery('#resultadosfaq').offset().top-60;
       
       var  isVisible = $('#resultadosfaq').is(':visible');               
       if (iframetoloadTopPosition>0  &&isVisible )
            jQuery('html, body').animate({scrollTop: iframetoloadTopPosition}, 800);	
      } catch(err) {}
   }
}
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function setFilterAndGoToMobile(filter, url){
	eraseCookie("satfilter");
	createCookie("satfilter", filter, 365);
	window.location = url;
}

function setFilterAndGoTo(context){
	var url = $(context).attr("href");
	var filter = $(context).attr("id").split("setfilter_")[1];

	eraseCookie("satfilter");
	createCookie("satfilter", filter, 365);
	window.location = url;
}

