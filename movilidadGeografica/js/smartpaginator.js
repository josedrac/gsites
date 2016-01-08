(function ($) {
    $.fn.extend({
        smartpaginator: function (options) {
            var settings = $.extend({
                totalrecords: 0,
                recordsperpage: 0,
                length: 10,
                theme: 'black',
                initval: 1,
                datacontainer: '', //data container id
                dataelement: '', //children elements to be filtered e.g. tr or div
                onchange: null,
            }, options);
            return this.each(function () {
                var currentPage = 0;
                var startPage = 0;
                var totalpages = parseInt(settings.totalrecords / settings.recordsperpage);
                if (settings.totalrecords % settings.recordsperpage > 0) totalpages++;
                var initialized = false;
                var container = $(this).addClass('pager').addClass(settings.theme);
                container.find('ul').remove();
                container.find('div').remove();
                container.find('span').remove();
                var dataContainer;
                var dataElements;
                if (settings.datacontainer != '') {
                    dataContainer = $('#' + settings.datacontainer);
                    dataElements = $('' + settings.dataelement + '', dataContainer);
                }
                var list = $('<ul/>');
                var btnPrev = $('<div/>').append('https://raw.githubusercontent.com/sopraux/gsites/master/movilidadGeografica/img/anterior.png').click(function () { if ($(this).hasClass('disabled')) return false; currentPage = parseInt(list.find('li a.active').text()) - 1; navigate(--currentPage); }).addClass('btn');
                var btnNext = $('<div/>').append('https://raw.githubusercontent.com/sopraux/gsites/master/movilidadGeografica/img/siguiente.png').click(function () { if ($(this).hasClass('disabled')) return false; currentPage = parseInt(list.find('li a.active').text()); navigate(currentPage); }).addClass('btn');
                container.append(btnPrev).append(list).append(btnNext).append($('<div/>'));
                buildNavigation(startPage);
                if (settings.initval == 0) settings.initval = 1;
                currentPage = settings.initval - 1;
                navigate(currentPage);
                initialized = true;
                function buildNavigation(startPage) {
                    list.find('li').remove();
                    if (settings.totalrecords <= settings.recordsperpage) return;
                    for (var i = startPage; i < startPage + settings.length; i++) {
                        if (i == totalpages) break;
                        list.append($('<li/>')
                                    .append($('<a>').attr('id', (i + 1)).addClass(settings.theme).addClass('normal')
                                    .attr('href', 'javascript:void(0)')
                                    .text(i + 1))
                                    .click(function () {
                                        currentPage = startPage + $(this).closest('li').prevAll().length;
                                        navigate(currentPage);
                                    }));
                    }
                    list.find('li a').addClass(settings.theme).removeClass('active');
                    list.find('li:eq(0) a').addClass(settings.theme).addClass('active');
                    //set width of paginator
                    var sW = list.find('li:eq(0) a').outerWidth() + (parseInt(list.find('li:eq(0)').css('margin-left')) * 2);
                    var width = sW * list.find('li').length;
                    list.css({ width: width });
                    showRequiredButtons(startPage);
                }
                function navigate(topage) {
                    //make sure the page in between min and max page count
                    var index = topage;
                    var mid = settings.length / 2;
                    if (settings.length % 2 > 0) mid = (settings.length + 1) / 2;
                    var startIndex = 0;
                    if (topage >= 0 && topage < totalpages) {
                        if (topage >= mid) {
                            if (totalpages - topage > mid)
                                startIndex = topage - (mid - 1);
                            else if (totalpages > settings.length)
                                startIndex = totalpages - settings.length;
                        }
                        buildNavigation(startIndex);
                        list.find('li a').removeClass('active');
                        list.find('li a[id="' + (index + 1) + '"]').addClass('active');
                        var recordStartIndex = currentPage * settings.recordsperpage;
                        var recordsEndIndex = recordStartIndex + settings.recordsperpage;
                        if (recordsEndIndex > settings.totalrecords)
                            recordsEndIndex = settings.totalrecords % recordsEndIndex;
                        if (initialized) {
                            if (settings.onchange != null) {
                                settings.onchange((currentPage + 1), recordStartIndex, recordsEndIndex);
                            }
                        }
                        if (dataContainer != null) {
                            if (dataContainer.length > 0) {
                                //hide all elements first
                                dataElements.css('display', 'none');
                                //display elements that need to be displayed
                                if ($(dataElements[0]).find('th').length > 0) { //if there is a header, keep it visible always
                                    $(dataElements[0]).css('display', '');
                                    recordStartIndex++;
                                    recordsEndIndex++;
                                }
                                for (var i = recordStartIndex; i < recordsEndIndex; i++)
                                    $(dataElements[i]).css('display', '');
                            }
                        }

                        showRequiredButtons();
                    }
                }
                function showRequiredButtons() {
                    if (totalpages > settings.length) {
                        if (currentPage > 0) {
                            btnPrev.css('visibility', '');
                        }
                        else {
                            btnPrev.css('visibility', 'hidden');
                        }

                        if (currentPage == totalpages - 1) {
                            btnNext.css('visibility', 'hidden');
                        }
                        else {
                            btnNext.css('visibility', '');
                        }
                    }
                    else {
                        if (!settings.controlsalways) {
                            btnPrev.css('visibility', 'hidden');
                            btnNext.css('visibility', 'hidden');

                        }
                        else {
                            btnPrev.css('visibility', '').addClass('disabled');
                            btnNext.css('visibility', '').addClass('disabled');
                        }
                    }
                }
                function isTextSelected(el) {
                    var startPos = el.get(0).selectionStart;
                    var endPos = el.get(0).selectionEnd;
                    var doc = document.selection;
                    if (doc && doc.createRange().text.length != 0) {
                        return true;
                    } else if (!doc && el.val().substring(startPos, endPos).length != 0) {
                        return true;
                    }
                    return false;
                }
            });
        }
    });
})(jQuery);
