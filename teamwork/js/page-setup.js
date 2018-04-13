(function ($) {
    var hamburger = "<svg id='0900171a-5cb9-4dbe-b93f-354d2c867d10' data-name='Capa 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><defs><style>.bf92e5ff-b46b-4da3-9f17-c3ed67aeba98{fill:#888;}</style></defs><title>Hamburger</title><path class='bf92e5ff-b46b-4da3-9f17-c3ed67aeba98' d='M19.3,130.4H492.7a19.3,19.3,0,0,0,0-38.6H19.3a19.3,19.3,0,0,0,0,38.6Z'/><path class='bf92e5ff-b46b-4da3-9f17-c3ed67aeba98' d='M19.3,275.3H492.7a19.3,19.3,0,0,0,0-38.6H19.3a19.3,19.3,0,0,0,0,38.6Z'/><path class='bf92e5ff-b46b-4da3-9f17-c3ed67aeba98' d='M19.3,420.2H492.7a19.3,19.3,0,0,0,0-38.6H19.3a19.3,19.3,0,1,0,0,38.6Z'/></svg>";
    var siteTitle = "Teamwork Steps";

    var $menuButton = $("<button>")
        .addClass("menu-button")
        .html(hamburger);
    //	var menuButton = "<button class='menu-button'>" + hamburger + "</button>";

    var $siteTitle = $("<span>")
        .addClass("site-title")
        .text(siteTitle);

    //	var $logo = $("<img>")
    //		.addClass("bcit-logo")
    //		.attr("src","../img/bcit-logo.svg");

    var $logo = $("<div>")
        .addClass("bcit-logo");

    var $branding = $("<div>")
        .addClass("branding")
        .prepend($menuButton.clone(), $logo.clone(), $siteTitle);


    //$(".wrapper").prepend("<button class='menu-button'>Menu</button><span class='brand'>Course Production User Guide</span>");
    $(".wrapper").prepend($branding);

    // TODO: Consider moving some of these transforms into get-partials.js

    // Adds MS Word flair
    $(".word").each(function () {
        $(this).html("<div class='backing'><div class='ruler'></div><div class='paper'>" + $(this).html() + "</div></div>");
    });

    // Allows preview content to render like the styleguide
    $(".preview").addClass("container");

    // Appends navigation to preview elements
    //	$(".preview").after("<nav class='panel-control'><button title='Markout' data-target='.word'>#markout</button><button title='HTML' data-target='.html'>&lt;/html&gt;</button></nav>");
    $(".preview").before("<button class='preview-button' title='preview' data-target='.preview'>PREVIEW</button>");
    $(".word").before("<button class='word-button' title='Markout' data-target='.word'>WORD</button>");
    $(".html").before("<button class='html-button' title='HTML' data-target='.html'>HTML</button>");
    //	$(".usage").before("<button class='usage-button' title='usage' data-target='.usage'>USAGE</button>");

    $(".html,.word,.usage").hide();
    $(".preview-button").addClass("open");

    $(".usage").after("<div class='border-bottom'>");


    $(".html,.word,.usage").on("button-pressed", function () {
        $(this).slideToggle(250);
    });

    $(".element > button").on("click", function () {
        $(this).toggleClass("open");
        var target = $(this).data("target");
        $(this).parents("section").find(target).trigger("button-pressed");
    });

    // On load scrolling
    $(window).on("load", function () {
        var hash = window.location.hash;
        if (hash.length > 1) {
            var id = hash.substring(1).split("%20").join(" ");
            $(window).scrollTop(0);
            $(window).trigger("scrollTo", id);
        }
    });

    // Scrolling event handler
    $(window).on("scrollTo", function (e, id) {
        //$(".menu").trigger("close");
        $("html,body").stop().animate({
            scrollTop: getOffset(id) - 50
        }, 500);

        function getOffset(id) {
            var $target = $("[id='" + id + "']");
            if ($target.length === 1) {
                return $target.offset().top - 10;
            }
            return 0;
        }
    });

    // Trigger scrolling
    $("a[href*='#']").on("click", function () {
        var href = $(this).attr("href");
        var pathname = href.split("#").shift();
        var id = href.split("#").pop();

        if (window.location.pathname.indexOf(pathname) !== -1) {
            $(window).trigger("scrollTo", id);
        }
    });

    // Move menu highlighting on scroll
    $(window).on("scroll", function () {
        // TODO: Debounce function to reduce processing cost
        var pos = $(window).scrollTop();
        $(".wrapper *[id]").each(function () {
            if ($(this).offset().top >= pos - 300) {
                $(".menu .current").removeClass("current");
                var id = "#" + $(this).attr("id");
                $(".menu [href*='" + id + "']").addClass("current").parents("ul").show();
                return false;
            }
        });
    });


    $(window).on("scroll", function () {
        //if($(window).scrollTop() > $(".element").eq(0).offset().top - 100) {
        if ($(window).scrollTop() > 100) {
            $(".nav-bar").addClass("showing");
        } else {
            $(".nav-bar").removeClass("showing");
        }
    });

    // DISABLED: PRESENTING A SINGLE ELEMENT AT A TIME
    //	var $pageNav = $("<nav class='page-nav'>");
    //	var targetCount = 0;
    //	$(".element").each(function () {
    //		var $header = $(this).find("header");
    //		var $blurb = $(this).find(".blurb");
    //		var $button = $("<div class='button'>");
    //		var targetID = "target" + targetCount++;
    //		$button.data("target", targetID);
    //		$(this).attr("id", targetID);
    //		$button.append("<p><strong>" + $header.text() + "</strong></p>");
    //		$button.append("<p>" + $blurb.text() + "</p>");
    //		$pageNav.append($button);
    //	});
    //	$(".wrapper").prepend($pageNav);
    //	$(".page-nav .button").on("click", function () {
    //		$(".element").stop();
    //		var target = $(this).data("target");
    //		$(".element:visible").fadeOut(200, function () {
    //			$("#" + target).fadeIn();
    //		});
    //	});


    // Old collapsing menu
    //	$(".menu .collapse").each(function () {
    //		//$(this).children("ul").hide();
    //	});
    //
    //	//	$(".menu a").on("click", function () {
    //	//		$(".menu").trigger("close");
    //	//	});
    //
    //	$(".menu .collapse").click(function (e) {
    ////		if ($(this).hasClass("collapse")) {
    ////			e.preventDefault();
    ////			$(this).children("ul").slideDown();
    ////			$(this).removeClass("collapse");
    ////		} else {
    ////
    ////		}
    //	});

    $(".menu").on("adjust-size", function () {
        $(this).css("height", $(window).height());
    });

    $(".menu").on("toggle", function () {
        $(this).find(".scrolling").scrollTop(0);
        $("body").toggleClass("menu-open");
    });

    $(".menu").on("close", function () {
        $("body").removeClass("menu-open");
    });

    $(".menu").on("open", function () {
        $("body").addClass("menu-open");
    });

    $("#close-menu").on("click", function () {
        $(".menu").trigger("close");
    });

    var breakPoint = 1100;
    var windX = 0;
    $(document).ready(function () {
        //$(window).trigger("resize");
    });
    $(window).on("load resize", function () {
        $(".menu").trigger("adjust-size");
        var windowWidth = parseInt($(window).width());
        if (windowWidth != windX) {
            if (windowWidth > breakPoint) {
                $(".menu").trigger("open");
            } else {
                $(".menu").trigger("close");
            }
            windX = windowWidth;
        }
    });

    var $navBar = $("<nav>")
        .addClass("nav-bar")
        .append($menuButton.clone(true, true));
    $("body").prepend($navBar);

    $(".menu-button").on("click", function (e) {
        $(".menu").trigger("adjust-size");
        $(".menu").trigger("toggle");
        e.stopPropagation();
        return false;
    });

    $(".wrapper").on("click", function () {
        var windowWidth = $(window).width();
        if (windowWidth < breakPoint) {
            $(".menu").trigger("close");
        }
    });
    // Change all
    //	$("article > nav > button").on("click", function () {
    //		var $sections = $("article").find(".word,.usage,.html");
    //		var $buttons = $("article > nav").find("button");
    //		$buttons.removeClass("active");
    //		var target = $(this).data("target");
    //		var $targetButtons = $buttons.filter(function () {
    //			if ($(this).data("target") === target) {
    //				return true;
    //			}
    //			return false;
    //		});
    //		$targetButtons.addClass("active");
    //		$sections.hide();
    //		$("article").find(target).slideDown();
    //	});
}(jQuery));