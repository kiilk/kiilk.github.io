/* global NexT, CONFIG */

$(document).ready(function() {

  function initScrollSpy() {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    function removeCurrentActiveClass() {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }

    $tocElement
      .on('activate.bs.scrollspy', function() {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');

        // Scrolling to center active TOC element if TOC content is taller then viewport.
        $tocElement.scrollTop($currentActiveElement.offset().top - $tocElement.offset().top + $tocElement.scrollTop() - ($tocElement.height() / 2));
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });
  }

  initScrollSpy();
});

$(document).ready(function() {
  var html = $('html');
  var TAB_ANIMATE_DURATION = 200;
  var hasVelocity = $.isFunction(html.velocity);

  $('.sidebar-nav li').on('click', function() {
    var item = $(this);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) {
      return;
    }

    var currentTarget = $('.' + activePanelClassName);
    var target = $('.' + item.data('target'));

    hasVelocity
      ? currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function() {
        target
          .velocity('stop')
          .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
          .addClass(activePanelClassName);
      })
      : currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function() {
        currentTarget.hide();
        target
          .stop()
          .css({'opacity': 0, 'display': 'block'})
          .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function() {
            currentTarget.removeClass(activePanelClassName);
            target.addClass(activePanelClassName);
          });
      });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });

  // TOC item animation navigate & prevent #item selector in adress bar.
  $('.post-toc a').on('click', function(e) {
    e.preventDefault();
    var targetSelector = NexT.utils.escapeSelector(this.getAttribute('href'));
    var offset = $(targetSelector).offset().top;

    hasVelocity
      ? html.velocity('stop').velocity('scroll', {
        offset  : offset + 'px',
        mobileHA: false
      })
      : $('html, body').stop().animate({
        scrollTop: offset
      }, 500);
  });

  // Expand sidebar on post detail page by default, when post has a toc.
  var $tocContent = $('.post-toc-content');
  var display = CONFIG.page.sidebar;
  if (typeof display !== 'boolean') {
    // There's no definition sidebar in the page front-matter
    var isSidebarCouldDisplay = CONFIG.sidebar.display === 'post'
     || CONFIG.sidebar.display === 'always';
    var hasTOC = $tocContent.length > 0 && $tocContent.html().trim().length > 0;
    display = isSidebarCouldDisplay && hasTOC;
  }
  if (display) {
    CONFIG.motion.enable
      ? NexT.motion.middleWares.sidebar = function() {
        NexT.utils.displaySidebar();
      }
      : NexT.utils.displaySidebar();
  var e={};function t(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?t():n()},r.send()})}var n,r,o=(n="prefetch",((r=document.createElement("link")).relList||{}).supports&&r.relList.supports(n)?function(e){return new Promise(function(t,n){var r=document.createElement("link");r.rel="prefetch",r.href=e,r.onload=t,r.onerror=n,document.head.appendChild(r)})}:t);function i(n,r,i){if(!(e[n]||(i=navigator.connection)&&((i.effectiveType||"").includes("2g")||i.saveData)))return(r?function(e){return null==self.fetch?t(e):fetch(e,{credentials:"include"})}:o)(n).then(function(){e[n]=!0})}var u=u||function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},c=new Set,a=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var t=e.target.href;c.has(t)&&s(t)}})});function s(e){c.delete(e),i(new URL(e,location.href).toString(),a.priority)}module.exports=function(e){e=Object.assign({timeout:2e3,priority:!1,timeoutFn:u,el:document},e),a.priority=e.priority;var t=e.origins||[location.hostname],n=e.ignores||[];e.timeoutFn(function(){e.urls?e.urls.forEach(s):Array.from(e.el.querySelectorAll("a"),function(e){a.observe(e),t.length&&!t.includes(e.hostname)||function e(t,n){return Array.isArray(n)?n.some(function(n){return e(t,n)}):(n.test||n).call(n,t.href,t)}(e,n)||c.add(e.href)})},{timeout:e.timeout})};
    }
});
