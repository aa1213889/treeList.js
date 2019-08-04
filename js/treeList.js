(function ($) {
    $.fn.extend({
        treeList: function (options, data) {
            var _this = $(this);
            var defaults = {
                date: new Date(),
                topWeekShow: true,
                ifSwitch: true,
                hoverDate: true,
                dayClick: function (arg) {

                },

            };
            options = $.extend(defaults, options);

            let LEVELNUM = 2;
            let LEVELMAX = 0;

            createTree();

            function createTree() {
                let treeHtml = `
                <div class="treelist">
                    <div class="treelist_title">
                        <div class="title_search_box">
                            <input class="search_box_input">
                            <div class="search_box_logo"></div>
                        </div>
                    </div>
                    <div class="treelist_content">
                        <div class="content_list">
                         ` + treeRow() + `
                        </div>
                    </div>
                </div>`;
                _this.html(treeHtml);
                orderTree();
            }

            function treeRow() {
                let rowHtml = '';
                data.forEach(element => {
                    (LEVELMAX < element.level) ? (LEVELMAX = element.level) : LEVELMAX;
                    rowHtml += ` 
                        <div class="content_list_row"  data-id='`+ element.id + `' data-parentId='` + element.pid + `' data-level='` + element.level + `'>
                            <div class="row_img_open"></div>
                            <input type="checkbox" class="list_row_check">
                            <label>` + element.data + `</label>
                        </div>`
                });
                return rowHtml;
            }

            function orderTree() {  //递归循环
                $('div[data-level=' + LEVELNUM + ']').each(function (index, element) {
                    let pid = $(this).data().parentid;
                    let level = $(this).data().level;
                    let id = $(this).data().id;
                    let _thisHtml = `<div class="content_list_row" data-id='` + id + `' data-parentId='` + pid + `' data-level='` + level + `'>` + $(this).html() + `</div>`
                    $('div[data-id=' + pid + ']');
                    $(this).remove();
                    $('div[data-id=' + pid + ']').after(_thisHtml);
                });
                if (LEVELNUM == LEVELMAX) return setTreePadding();
                LEVELNUM++;
                orderTree();
            }

            function setTreePadding() {
                $(".content_list_row").each(function (index, element) {
                    let level = $(this).data().level;
                    $(this).css("padding-left", ((level - 1) * 17) + 'px');
                });

            }

            // { id: '0001', pid: '', index: '0001', level: '1', data: '中国' },
            // { id: '0002', pid: '', index: '0002', level: '1', data: '美国' },
            // { id: '0003', pid: '', index: '0003', level: '1', data: '日本' },
            // { id: '00010001', pid: '0001', level: '2', index: '0001.0001', data: '北京' },
            // { id: '00010002', pid: '0001', level: '2', index: '0001.0002', data: '重庆' },
            // { id: '000100020001', pid: '00010002', level: '3', index: '0001.0002.0001', data: '渝中' },
            // return this.each(function () {
            //     var s = "";
            //     var $this = this;
            //     $($this).html("");
            //     $.each(data, function (a, b) {
            //         s = "<h4 class='h_" + a + "'>" + b.name + "</h4>";
            //         s += "<ul class='u_" + a + "'>";
            //         $.each(b.sub, function (c, d) {
            //             s += "<li>" + d.name + "</li>";
            //         });
            //         s += "</ul>";
            //         $($this).append(s);
            //         $(".h_" + a).click(function () {
            //             $(".u_" + a).toggle();
            //         });
            //     });
            // });
        }
    });
})(jQuery);